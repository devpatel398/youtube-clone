
import { HistoryVideosSection } from "../sections/history-video-section";

export const HistoryView = () => {
    return (
        <div className="flex max-w-screen-md mx-auto flex-col gap-y-6 px-4 pt2.5 mb-10">
            <div>
                <h1 className="text-2xl font-bold">History</h1>
                <p className="text-xs text-muted-foreground">
                    Go back through videos you have previously watched
                </p>
            </div>
            <HistoryVideosSection />
        </div>
    );
};