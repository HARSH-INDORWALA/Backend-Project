import Modal from "../../common/Modal";
import PlaylistCheckboxItem from "./PlaylistCheckboxItem";

import useAuthStore from "../../../store/authStore";
import { useUserPlaylists, useTogglePlaylistVideo } from "../../../hooks/playlist";
import { LoadingSpinner } from "../../common";

function AddToPlaylistModal({ isOpen, onClose, videoId }) {
    const user = useAuthStore((state) => state.user);
    const { data: playlistsData, isPending: isLoading, isError, error } = useUserPlaylists(user?._id, videoId);
    const { mutate: togglePlaylist, isPending: isToggling, isError: isToggleError, error: toggleError } = useTogglePlaylistVideo();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Save to Playlist"
            maxWidth="max-w-md"
        >
            <div className="max-h-96 space-y-2 overflow-y-auto">
                {isLoading ? (
                    <div className="py-8 text-center">
                        <LoadingSpinner text="Loading Playlists..." />
                    </div>
                ) : isError ? (
                    <div className="py-8 text-center text-sm text-red-500">
                        {error?.response?.data?.message ||
                            "Failed to load playlists."}
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
                {isToggleError && (
                    <p className="mt-4 text-sm text-red-500">
                        {toggleError?.response?.data?.message ||
                            "Failed to update playlist."}
                    </p>
                )}
            </div>
        </Modal>
    );
}

export default AddToPlaylistModal;