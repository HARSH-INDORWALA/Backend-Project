import Modal from "../../common/Modal";
import PlaylistCheckboxItem from "./PlaylistCheckboxItem";

import useAuthStore from "../../../store/authStore";
import { useUserPlaylists, useTogglePlaylistVideo } from "../../../hooks/playlist";

function AddToPlaylistModal({ isOpen, onClose, videoId }) {
    const user = useAuthStore((state) => state.user);
    const { data: playlistsData, isPending: isLoading } = useUserPlaylists(user?._id, videoId);
    const { mutate: togglePlaylist, isPending: isToggling } = useTogglePlaylistVideo();
    console.log(playlistsData);
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Save to Playlist"
            maxWidth="max-w-md"
        >
            <div className="max-h-96 space-y-2 overflow-y-auto">
                {isLoading ? (
                    <div className="py-8 text-center text-muted">
                        Loading playlists...
                    </div>
                ) : playlistsData?.docs?.length === 0 ? (
                    <div className="py-8 text-center text-muted">
                        You haven't created any playlists yet.
                    </div>
                ) : (
                    playlistsData.docs.map((playlist) => (
                        <PlaylistCheckboxItem
                            key={playlist._id}
                            name={playlist.name}
                            totalVideos={playlist.totalVideos}
                            hasVideo={playlist.hasVideo}
                            isPending={isToggling}
                            onToggle={() =>
                                togglePlaylist({
                                    playlistId: playlist._id,
                                    videoId,
                                    hasVideo: playlist.hasVideo,
                                    userId: user._id,
                                })
                            }
                        />
                    ))
                )}
            </div>
        </Modal>
    );
}

export default AddToPlaylistModal;