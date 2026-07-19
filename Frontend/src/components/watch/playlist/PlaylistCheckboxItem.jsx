function PlaylistCheckboxItem({
    name,
    totalVideos,
    hasVideo,
    onToggle,
    isPending,
}) {
    return (
        <button
            type="button"
            onClick={onToggle}
            disabled={isPending}
            className="flex w-full items-center justify-between rounded-xl p-3 transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-50"
        >
            <div className="text-left">
                <p className="font-medium text-foreground">
                    {name}
                </p>

                <p className="text-sm text-muted">
                    {totalVideos} videos
                </p>
            </div>

            <input
                type="checkbox"
                checked={hasVideo}
                readOnly
                className="h-5 w-5 accent-primary"
            />
        </button>
    );
}

export default PlaylistCheckboxItem;