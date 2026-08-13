import PlaylistGrid from "../../components/playlist/PlaylistGrid";
import { useUserPlaylists } from "../../hooks/playlist";
import { LoadingSpinner } from "../common";

function ChannelPlaylists({ userId }) {
    const { data, isLoading, isError, error } = useUserPlaylists(userId);

    const playlists = data?.docs ?? [];

    if (isLoading) {
        return (
            <LoadingSpinner
                text="Loading Playlists..."
            />
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center py-20">
                <p className="text-red-500">
                    {error?.response?.data?.message ||
                        "Failed to load Channel Playlists."}
                </p>
            </div>
        );
    }

    if (!playlists.length) {
        return (
            <div className="mt-8 flex justify-center">
                <p className="text-foreground text-lg font-semibold">
                    This channel has not created any playlists yet.
                </p>
            </div>
        );
    }

    return (
        <section className="mt-8 space-y-8">
            <PlaylistGrid playlists={playlists} />
        </section>
    );
}

export default ChannelPlaylists;