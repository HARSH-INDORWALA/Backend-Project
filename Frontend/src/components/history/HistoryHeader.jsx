import Button from "../common/Button";

function HistoryHeader({ totalVideos, onClearHistory }) {
    return (
        <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-3xl font-bold text-foreground">
                    Watch History
                </h1>

                <p className="mt-1 text-muted">
                    {totalVideos} {totalVideos === 1 ? "video" : "videos"} watched
                </p>
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