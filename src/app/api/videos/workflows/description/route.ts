import { db } from "@/db";
import { videos } from "@/db/schema";
import { serve } from "@upstash/workflow/nextjs"
import { eq, and } from "drizzle-orm";
import { GoogleGenAI } from "@google/genai";

interface InputType {
    userId: string;
    videoId: string;
}

const DESCRIPTION_SYSTEM_PROMPT = `  Your task is to summarize the transcript of a video which is give before this Line. Please follow these guidelines:
- Be brief. Condense the content into a summary that captures the key points and main ideas without losing important details.
- Avoid jargon or overly complex language unless necessary for the context.
- Focus on the most critical information, ignoring filler, repetitive statements, or irrelevant tangents.
- ONLY return the summary, no other text, annotations, or comments.
- Aim for a summary that is 3-5 sentences long and no more than 200 characters.`;

export const { POST } = serve(
  async (context) => {
    const input = context.requestPayload as InputType;
    const { videoId, userId } = input;

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

    // get transcript from video to give to ai
    const transcript = await context.run("get-transcript", async () => {
        const trackUrl = `https://stream.mux.com/${video.muxPlaybackId}/text/${video.muxTrackId}.txt`;
        const response = await fetch(trackUrl);
        const text = response.text();

        if (!text) {
            throw new Error("Bad rquest");
        }

        return text;
    });

    // using google gemini api (because its free) instead of openAI
    const ai = new GoogleGenAI({});

    const body = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: transcript + DESCRIPTION_SYSTEM_PROMPT,
    });

    const description = body.text;

    if (!description) {
        throw new Error("Bad rquest");
    }

    await context.run("update-video", async () => {
      await db
        .update(videos)
        .set({
            description: description || video.description,
        })
        .where(and(
            eq(videos.id, video.id),
            eq(videos.userId, video.userId),
        ))
    })
  }
)