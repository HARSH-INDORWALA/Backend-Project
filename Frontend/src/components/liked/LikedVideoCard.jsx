import { Link } from "react-router-dom";

import Avatar from "../common/Avatar";

import { formatDuration } from "../../utils/formatDuration";
import { formatViews } from "../../utils/formatViews";
import { formatTimeAgo } from "../../utils/formatTimeAgo";

function LikedVideoCard({
    _id,
    thumbnail,
    duration,
    title,
    owner,
    views,
    createdAt,
}) {
    return (
        <div className="group space-y-1">
            <Link
                to={`/watch/${_id}`}
                className="block overflow-hidden rounded-2xl"
            >
                <div className="relative">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-1 text-xs font-medium text-white">
                        {formatDuration(duration)}
                    </span>
                </div>
            </Link>

            <div className="flex items-start gap-2">
                <Avatar
                    src={owner.avatar}
                    alt={owner.fullName}
                    className="h-10 w-10 shrink-0"
                />

                <div className="min-w-0 flex-1">
                    <Link to={`/watch/${_id}`}>
                        <h3 className="line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-primary">
                            {title}
                        </h3>
                    </Link>

                    <p className="text-sm text-muted">
                        {owner.fullName}
                    </p>

                    <p className="text-sm text-muted">
                        {formatViews(views)} views • {formatTimeAgo(createdAt)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LikedVideoCard;