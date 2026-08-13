import { Link } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import Avatar from "../common/Avatar";
import { formatDuration, formatViews, formatTimeAgo } from "../../utils";

function HistoryVideoCard({ _id, thumbnail, duration, title, owner, views, createdAt, onActionClick }) {
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

                    <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 text-xs font-medium text-white">
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

                    <p className="text-sm text-foreground">
                        {owner.username}
                    </p>

                    <p className="text-sm text-foreground">
                        {formatViews(views)} views • {formatTimeAgo(createdAt)}
                    </p>
                </div>

                <button
                    onClick={onActionClick}
                    className="rounded-full p-2 text-foreground transition-colors hover:bg-background hover:text-foreground"
                >
                    <MoreVertical size={18} className="cursor-pointer" />
                </button>
            </div>
        </div>
    );
}

export default HistoryVideoCard;