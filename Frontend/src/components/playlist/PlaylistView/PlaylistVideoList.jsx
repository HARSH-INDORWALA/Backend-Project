import PlaylistVideoRow from "./PlaylistVideoRow";

function PlaylistVideoList({
    videos,
    isOwner,
    onRemoveVideo,
}) {
    return (
        <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
            <div className="overflow-x-auto">
                <div className="min-w-190">
                    {/* Header */}
                    <div className="grid grid-cols-[60px_2fr_120px_140px_56px] items-center border-b border-border px-6 py-5 text-sm font-semibold text-muted">
                        <span>#</span>
                        <span>Title</span>
                        <span>Views</span>
                        <span>Uploaded</span>
                        <span />
                    </div>

                    {/* Rows */}
                    <div>
                        {videos.map((video, index) => (
                            <PlaylistVideoRow
                                key={video._id}
                                video={video}
                                index={index}
                                isOwner={isOwner}
                                onRemove={onRemoveVideo}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaylistVideoList;