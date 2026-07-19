import { ListVideo } from "lucide-react";
import { Link } from "react-router-dom";
import { formatRelativeDate } from "../../utils/formatDate.js";
function PlaylistCard({ playlist}) {
    const {
        _id,
        thumbnail,
        name,
        totalVideos,
        updatedAt,
    } = playlist;
    return (
        <Link
            to={`/playlists/${_id}`}
            className="group block"
        >
            {/* Thumbnail */}
            <div className="relative aspect-16/8 overflow-hidden rounded-2xl transition-transform duration-300 ease-out group-hover:-translate-y-2">
                <img
                    src={
                        thumbnail ??
                        "https://placehold.co/800x450?text=Playlist"
                    }
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-xl bg-black/75 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm">
                    <ListVideo size={15} />
                    <span>{totalVideos} Videos</span>
                </div>
            </div>

            {/* Content */}
            <div className="mt-1">
                <h3 className="line-clamp-2 text-2xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {name}
                </h3>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">
                        Updated {formatRelativeDate(updatedAt)}
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default PlaylistCard;