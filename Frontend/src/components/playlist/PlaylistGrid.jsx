import PlaylistCard from "./PlaylistCard";
import CreatePlaylistCard from "./CreatePlaylistCard";

function PlaylistGrid({
    playlists,
    showCreateCard = false,
    onCreatePlaylist,
    onEditPlaylist,
    onDeletePlaylist,
}) {
    return (
        <div className="mt-3 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {showCreateCard && (
                <CreatePlaylistCard onClick={onCreatePlaylist} />
            )}

            {playlists.map((playlist) => (
                <PlaylistCard
                    key={playlist._id}
                    playlist={playlist}
                    onEdit={() => onEditPlaylist(playlist)}
                    onDelete={() => onDeletePlaylist(playlist)}
                />
            ))}
        </div>
    );
}

export default PlaylistGrid;