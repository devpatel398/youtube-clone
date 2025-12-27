
import { PlaylistHeaderSection } from "../sections/playlist-header-section";
import { VideosSection } from "../sections/videos-section.";

interface VideosViewProp {
    playlistId: string;
}

export const VideosView = ({ playlistId }: VideosViewProp) => {
    return (
        <div className="max-w-screen-md mx-auto mb-10 px-4 pt2.5 flex flex-col gap-y-6">
            <PlaylistHeaderSection playlistId={playlistId} />
            <VideosSection playlistId={playlistId} />
        </div>
    );
};