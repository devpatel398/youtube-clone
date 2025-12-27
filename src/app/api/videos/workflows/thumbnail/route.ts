import { db } from "@/db";
import { videos } from "@/db/schema";
import { serve } from "@upstash/workflow/nextjs"
import { eq, and } from "drizzle-orm";
import { UTApi } from "uploadthing/server";

interface InputType {
    userId: string;
    videoId: string;
    prompt: string;
}

export const { POST } = serve(
  async (context) => {
    const utapi = new UTApi;
    const input = context.requestPayload as InputType;
    const { videoId, userId, prompt } = input;

    // get the video first
    const video = await context.run("get-video", async () => {
        const [existingVideo] = await db
            .select()
            .from(videos)
            .where(and(
                eq(videos.id, videoId),
                eq(videos.userId, userId),
            ))

        if (!existingVideo) {
            throw new Error("Not found");
        }

        return existingVideo;
    });

    // using cloudfare's workersai api for image (because its free) instead of openAI
    const model = "@cf/stabilityai/stable-diffusion-xl-base-1.0"

    const apiURL = `https://api.cloudflare.com/client/v4/accounts/${process.env.WORKERSAI_ACCOUNT_ID}/ai/run/${model}`;

    const body = await fetch(apiURL, {
        headers: {
            Authorization: `Bearer ${process.env.WORKERSAI_API_KEY}`,
        },
        method: "POST",
        body: JSON.stringify({
            prompt: prompt,
            height: 1080,
            width: 1920,
        })
    });

    const tempThumbnailUrl = body.url;

    /* const { body } = await context.call<{ data: { url: string }[] }>("generate-thumbnail", {
        url: `https://api.cloudflare.com/client/v4/accounts/${process.env.WORKERSAI_ACCOUNT_ID}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
        method: "POST",
        headers: {
            authorization: `Bearer ${process.env.WORKERSAI_API_KEY}`,
            "content-type": "image/jpg",
        },
        body:{
            prompt: prompt,
            height: 1080,
            width: 1920,
        }
    }); */


    if (!tempThumbnailUrl) {
        throw new Error("Bad rquest at generate");
    }

    await context.run("cleanup-thumbnail", async () => {
        if (video.thumbnailKey) {
            await utapi.deleteFiles(video.thumbnailKey);
            await db
                .update(videos)
                .set({ thumbnailKey: null, thumbnailUrl: null})
                .where(and(
                    eq(videos.id, videoId),
                    eq(videos.userId, userId),
                ));
        }
    });

    const uploadedThumbnail = await context.run("upload-thumbnail", async () => {
        const { data } = await utapi.uploadFilesFromUrl(tempThumbnailUrl);

        if (!data) {
            throw new Error("Bad request on uplaod");
        }

        return data;
    });

    await context.run("update-video", async () => {
      await db
        .update(videos)
        .set({
            thumbnailKey: uploadedThumbnail.key,
            thumbnailUrl: uploadedThumbnail.url,
        })
        .where(and(
            eq(videos.id, video.id),
            eq(videos.userId, video.userId),
        ))
    })
  }
)