import { Link } from "react-router-dom";

function SuggestedVideoCard({
    id,
    thumbnail,
    duration,
    title,
    channelName,
    views,
}) {
    return (
        <Link
            to={`/watch/${id}`}
            className="group flex gap-3 rounded-xl p-2 transition-colors hover:bg-background"
        >
            <div className="relative w-44 shrink-0 overflow-hidden rounded-xl">
                <img
                    src={thumbnail}
                    alt={title}
                    className="
                        h-20
                        sm:h-24
                        md:h-28
                        w-full
                        rounded-xl
                        object-cover
                    "
                />

                <span
                    className="
                        absolute
                        bottom-2
                        right-2
                        rounded
                        bg-black/80
                        px-1.5
                        py-0.5
                        text-xs
                        font-medium
                        text-white
                    "
                >
                    {duration}
                </span>
            </div>

            <div className="min-w-0 flex-1">
                <h3
                    className="
                        line-clamp-2
                        font-medium
                        text-foreground
                    "
                >
                    {title}
                </h3>

                <p className="mt-1 text-sm text-muted">
                    {channelName}
                </p>

                <p className="text-sm text-muted">
                    {views} views
                </p>
            </div>
        </Link>
    );
}

export default SuggestedVideoCard;