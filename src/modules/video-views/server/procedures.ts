import { db } from "@/db";
import { videoViews } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export const videoViewsRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ videoId: z.uuid() }))
        .mutation(async ({ ctx, input }) => {
            const { videoId } = input;
            const { id: userId } = ctx.user;

            const [existingVideoView] = await db
                .select()
                .from(videoViews)
                .where(and(
                    eq(videoViews.videoId, videoId),
                    eq(videoViews.userId, userId),
                ))

            //if existingVideoView is true, that means the user has watched this video before. so we just update the updatedAT time
            if (existingVideoView) {
                const [updatedVideoView] = await db
                    .update(videoViews)
                    .set({ updatedAt: new Date() })
                    .where(and(
                            eq(videoViews.videoId, videoId),
                            eq(videoViews.userId, userId),
                    ))
                    .returning();
    
                return updatedVideoView;
            }

            const [createdVideoView] = await db
                .insert(videoViews)
                .values({ userId, videoId })
                .returning();

            return createdVideoView;
        }),
});
