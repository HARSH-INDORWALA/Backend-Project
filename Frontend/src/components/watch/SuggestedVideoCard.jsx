import { Link } from "react-router-dom";
import { formatDuration, formatTimeAgo, formatViews } from "../../utils";

function SuggestedVideoCard({ _id, thumbnail, duration, title, owner, views, createdAt }) {
    return (
        <Link
            to={`/watch/${_id}`}
            className="group flex gap-3 rounded-xl p-2 transition-colors hover:bg-background"
        >
            <div className="relative w-44 shrink-0 overflow-hidden rounded-xl">
                <img
                    src={thumbnail}
                    alt={title}
                    className="h-20 w-full rounded-xl object-cover sm:h-24 md:h-28"
                />

                <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
                    {formatDuration(duration)}
                </span>
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 font-medium text-foreground">
                    {title}
                </h3>

                <p className="mt-1 text-sm text-muted">
                    {owner.fullName}
                </p>

                <p className="text-sm text-muted">
                    {formatViews(views)} views • {formatTimeAgo(createdAt)}
                </p>
            </div>
        </Link>
    );
}

export default SuggestedVideoCard;