"use client"

import MuxPlayer from "@mux/mux-player-react";
import { THUMBNAIL_FALLBACK } from "../../constants";

interface VideoPlayerProps {
    playbackId?: string | null | undefined;
    thumbnailUrl?: string | null | undefined;
    autoPlay?: boolean;
    onPlay?: () => void;
}

export const VideoPlayerSkeleton = () => {
    return (
        <div className="aspect-video bg-black rounded-xl" />
    );
}

export const VideoPlayer = ({
    playbackId,
    thumbnailUrl,
    autoPlay,
    onPlay,
}: VideoPlayerProps) => {
    //if (!playbackId) return null;

    return (
        <MuxPlayer
            playbackId={playbackId || ""}
            poster={thumbnailUrl || THUMBNAIL_FALLBACK}
            playerInitTime={0}
            autoPlay={autoPlay}
            thumbnailTime={0}
            className="size-full object-contain"
            accentColor="#FF2056"
            onPlay={onPlay}
            //added this styling to fix thumbnail filling video issue, Mux poster has its own styling
            style={{
                '--media-object-fit': 'cover',
                '--poster-object-fit': 'cover'
            } as React.CSSProperties}
        />
    );
}