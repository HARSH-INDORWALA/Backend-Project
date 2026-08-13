import { Button } from "../common";
import { History } from "lucide-react";
function HistoryHeader({ totalVideos, onClearHistory }) {
    return (
        <div className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
                <div>
                    <History size={40} className="text-primary" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        Watch History
                    </h1>

                    <p className=" text-xl mt-1 text-foreground">
                        {totalVideos} {totalVideos === 1 ? "video" : "videos"} watched
                    </p>
                </div>
            </div>

            {totalVideos > 0 && (
                <Button
                    variant="secondary"
                    className="w-fit px-5 py-2"
                    onClick={onClearHistory}
                >
                    Clear History
                </Button>
            )}
        </div>
    );
}

export default HistoryHeader;