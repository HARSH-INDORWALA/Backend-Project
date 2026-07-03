import PlaylistCard from "./PlaylistCard";

function PlaylistGrid({
    playlists = [],
}) {
    return (
        <section className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {playlists.map((playlist) => (
                <PlaylistCard
                    key={playlist.id}
                    {...playlist}
                />
            ))}
        </section>
    );
}

export default PlaylistGrid;