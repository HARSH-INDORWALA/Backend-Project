import { Bookmark, BookMarked } from "lucide-react";

function PlaylistCheckboxItem({ name, totalVideos, hasVideo, onToggle, isPending }) {
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

            {hasVideo ? (
                <BookMarked
                    size={22}
                    className="text-primary"
                />
            ) : (
                <Bookmark
                    size={22}
                    className="text-muted"
                />
            )}
        </button>
    );
}

export default PlaylistCheckboxItem;