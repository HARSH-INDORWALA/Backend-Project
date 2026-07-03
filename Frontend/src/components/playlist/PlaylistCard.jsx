import { ArrowRight, ListVideo } from "lucide-react";
import { Link } from "react-router-dom";

function PlaylistCard({
    id,
    thumbnail,
    title,
    totalVideos,
    updatedAt,
}) {
    return (
        <Link to={`/playlists/${id}`} className="group block">
            <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-lg bg-black/70 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm">
                        <ListVideo size={16} />
                        <span>{totalVideos} Videos</span>
                    </div>
                </div>

                <h3 className="mt-4 line-clamp-2 text-xl font-semibold text-foreground">
                    {title}
                </h3>

                <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-muted">
                        Updated {updatedAt}
                    </span>

                    <div className="flex items-center gap-1 text-sm font-medium text-primary transition-all duration-200 group-hover:translate-x-1">
                        View all
                        <ArrowRight size={15} />
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default PlaylistCard;