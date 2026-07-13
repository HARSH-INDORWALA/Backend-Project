import { Plus } from "lucide-react";

function CreatePlaylistCard({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group flex aspect-16/11 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-surface p-6 transition-all duration-300 hover:border-primary hover:bg-primary/5"
        >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-border transition-colors duration-300 group-hover:border-primary">
                <Plus
                    size={34}
                    className="text-muted transition-colors duration-300 group-hover:text-primary"
                />
            </div>

            <h3 className="mt-6 text-xl font-semibold text-foreground">
                Create Playlist
            </h3>

            <p className="mt-2 max-w-55 text-center text-sm text-muted">
                Organize your favorite videos into playlists.
            </p>
        </button>
    );
}

export default CreatePlaylistCard;