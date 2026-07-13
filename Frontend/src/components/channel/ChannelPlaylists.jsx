import PlaylistGrid from "../../components/playlist/PlaylistGrid";

function ChannelPlaylists({playlists}) {
    return (
        <section className="mt-8 space-y-8">
            <PlaylistGrid playlists={playlists} />
        </section>
    );
}

export default ChannelPlaylists;