import { Globe, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDuration } from "../../utils/formatDuration";
import { formatViews }  from  "../../utils/formatViews"
import Avatar from "../common/Avatar";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import VideoCardMenu from "./VideoCardMenu";
function VideoCard({ video,showVisibility = false, showStats = false, showMenu = false, onEdit, onDelete }) {
    const {
        _id,
        thumbnail,
        duration,
        title,
        views,
        totalLikes,
        totalComments,
        createdAt,
        owner,
        isPublished
    } = video;

    return (
        <div className="group relative overflow-hidden rounded-2xl bg-surface shadow-sm transition-all duration-300 hover:shadow-md">
            {showMenu && (
                <div className="absolute right-3 bottom-3 z-20">
                    <VideoCardMenu 
                        onEdit={
                            () =>  onEdit?.(video)}
                        onDelete={() => onDelete?.(video)}
                    />
                </div>
            )}
            <Link
            to={`/watch/${_id}`}
            className="
                group
                block
                overflow-hidden
                rounded-2xl
                bg-surface
                shadow-sm
                transition-all
                duration-300
                hover:shadow-md
            "
        >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
                <img
                    src={thumbnail}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-300
                        group-hover:scale-105
                    "
                />

                <span
                    className="
                        absolute
                        bottom-2
                        right-2
                        rounded-md
                        bg-black/80
                        px-2
                        py-1
                        text-xs
                        font-medium
                        text-white
                    "
                >
                    {formatDuration(duration)}
                </span>
            </div>

            {/* Video Info */}
            <div className="flex gap-3 p-2">
                <Avatar
                    src={owner?.avatar}
                    alt={owner?.fullName}
                    size="md"
                />

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-2">
                            <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
                                {title}
                            </h3>

                            {showVisibility && (<div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                    {isPublished ? (
                                        <>
                                            <Globe size={15} />
                                            Public
                                        </>
                                    ) : (
                                        <>
                                            <Lock size={15} />
                                            Private
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <p className="text-sm text-foreground">
                        {owner?.fullName}
                    </p>

                    <p className="text-xs text-foreground">
                        {formatViews(views)} views •{" "}
                        
                        {showStats && (
                            <>
                                {formatViews(totalLikes)} likes •{" "}
                                {formatViews(totalComments)} comments •{" "}
                            </>
                        )}
                        {formatTimeAgo(createdAt)}
                    </p>
                </div>
            </div>
        </Link>
    </div>
    );
}

export default VideoCard;