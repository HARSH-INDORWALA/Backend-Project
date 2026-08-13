import { Globe, Lock, ListVideo } from "lucide-react";
import { formatDate } from "../../../utils/formatDate.js";
import Button from "../../common/Button.jsx";

function PlaylistHero({ playlist, onEdit, onDelete, }) {
    const { name, description, isPublic, isOwner, totalVideos, updatedAt, owner, videos } = playlist;

    const thumbnail = videos.length > 0 ? videos[0].thumbnail : "https://placehold.co/800x450?text=Playlist";

    return (
        <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl">
                <img
                    src={thumbnail}
                    alt={name}
                    className="aspect-video w-full object-cover"
                />
            </div>

            <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {isPublic ? (
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

                <h1 className="text-3xl font-bold text-foreground">
                    {name}
                </h1>
  
                <p className="text-sm text-muted">
                    Created by{" "}
                    <span className="font-medium text-foreground">
                        {owner.fullName}
                    </span>
                </p>

                {description && (
                    <p className="leading-7 text-foreground">
                        {description}
                    </p>
                )}

                <div className="flex items-center gap-2 text-sm text-muted">
                    <ListVideo size={16} />
                    <span>
                        {totalVideos} Videos • Updated {formatDate(updatedAt)}
                    </span>
                </div>
            </div>

            {isOwner && (
                <div className="grid grid-cols-2 gap-3">
                    <Button
                        variant="secondary"
                        onClick={onEdit}
                        className="w-full"
                    >
                        Edit Playlist
                    </Button>

                    <Button
                        variant="danger"
                        onClick={onDelete}
                        className="w-full"
                    >
                        Delete
                    </Button>
                </div>
            )}
        </aside>
    );
}

export default PlaylistHero;