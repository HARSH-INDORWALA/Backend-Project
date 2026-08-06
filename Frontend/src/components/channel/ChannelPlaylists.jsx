import PlaylistGrid  from "../../components/playlist/PlaylistGrid";
import { useUserPlaylists } from "../../hooks/playlist";
import { LoadingSpinner } from "../common";
function ChannelPlaylists({ userId }) {
    const { 
        data,
        isLoading,
        isError
    } = useUserPlaylists(userId);

    const playlists = data?.docs ?? [];

    if(isLoading){
        return (
            <LoadingSpinner
                text="Loading Playlists..."
            />
        );
    }

    if(isError){
        return (
            <div className="mt-8 flex justify-center">
                <p className="text-red-500 text-lg font-semibold">
                    Failed to load channel playlists.
                </p>
            </div>
        );
    }

    if(!playlists.length){
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