function MyVideosHeader({ totalVideos, sort, onSortChange }) {
    return (
        <div className="space-y-1 pb-4">
            <div className="flex items-center justify-between ">
                <h1 className="text-3xl font-bold text-foreground">
                    My Videos
                </h1>

                <div className="flex items-center gap-2">
                    <label
                        htmlFor="sort"
                        className="text-sm text-foreground"
                    >
                        Sort by
                    </label>

                    <select
                        id="sort"
                        value={sort}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary"
                    >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                        <option value="mostViewed">Most Viewed</option>
                        <option value="mostLiked">Most Liked</option>
                        <option value="mostCommented">Most Commented</option>
                    </select>
                </div>
            </div>

            <p className="text-xl text-foreground">
                {totalVideos} {totalVideos === 1 ? "Video" : "Videos"}
            </p>
        </div>
    );
}

export default MyVideosHeader;