import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { formatRelativeDate } from "../../../utils/formatDate.js";
import PlaylistVideoActions from "./PlaylistVideoActions";

function PlaylistVideoRow({
    video,
    index,
    isOwner,
    onRemove,
}) {
    const {
        _id,
        title,
        thumbnail,
        duration,
        views,
        createdAt,
        videoOwner,
    } = video;

    const formatDuration = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        if (hrs > 0) {
            return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
        }

        return `${mins}:${String(secs).padStart(2, "0")}`;
    };

    return (
        <div className="group grid grid-cols-[60px_2fr_120px_140px_56px] items-center px-6 py-4 transition-all duration-300 hover:bg-primary/8 hover:shadow-sm">
            {/* Index / Play */}
            <Link
                to={`/watch/${_id}`}
                className="relative flex h-8 w-8 items-center justify-center"
            >
                <span className="absolute text-sm font-medium text-muted transition-all duration-200 group-hover:scale-75 group-hover:opacity-0">
                    {index + 1}
                </span>

                <Play
                    size={18}
                    fill="currentColor"
                    className="absolute scale-75 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
                />
            </Link>

            {/* Thumbnail + Info */}
            <Link
                to={`/watch/${_id}`}
                className="flex min-w-0 items-center gap-3"
            >
                <div className="relative shrink-0 overflow-hidden rounded-xl">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="h-16 w-28 object-cover sm:h-20 sm:w-36"
                    />

                    <span className="absolute bottom-1 right-1 rounded bg-black/80 px-2 py-0.5 text-[11px] font-medium text-white">
                        {formatDuration(duration)}
                    </span>
                </div>

                <div className="min-w-0 flex-1">
                                <h3 className="line-clamp-2 wrap-break-word text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                                    {title}
                                </h3>

                                <div className="mt-2 flex items-center gap-2">
                <img
                    src={videoOwner.avatar}
                    alt={videoOwner.fullName}
                    className="h-7 w-7 rounded-full object-cover"
                />

                <p className="truncate text-sm text-muted">
                    {videoOwner.fullName}
                </p>
            </div>
                </div>
            </Link>

            {/* Views */}
            <div className="text-sm text-muted">
                {views.toLocaleString()}
            </div>

            {/* Uploaded */}
            <div className="text-sm text-muted">
                {formatRelativeDate(createdAt)}
            </div>

            {/* Actions */}
            <div className="flex justify-end">
                <PlaylistVideoActions
                    isOwner={isOwner}
                    onRemove={() => onRemove?.(_id)}
                />
            </div>
        </div>
    );
}

export default PlaylistVideoRow;