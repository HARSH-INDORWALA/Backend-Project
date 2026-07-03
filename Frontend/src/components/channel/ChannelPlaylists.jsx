import PlaylistGrid from "../../components/playlist/PlaylistGrid";
import mockPlaylists from "../../data/mockPlaylists";

function ChannelPlaylists() {
    return (
        <section className="mt-8 space-y-8">
            <PlaylistGrid playlists={mockPlaylists} />
        </section>
    );
}

export default ChannelPlaylists;