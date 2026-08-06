import { useState } from "react";

import CreatePlaylistModal from "../components/playlist/CreatePlaylistModal";
import PlaylistGrid from "../components/playlist/PlaylistGrid";

import {
    useUserPlaylists,
    useCreatePlaylist,
} from "../hooks/playlist";

import useAuthStore from "../store/authStore.js";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";

function PlaylistPage() {
    const user = useAuthStore((state) => state.user);

    const { data, isLoading, isError } = useUserPlaylists(user?._id);

    const createPlaylistMutation = useCreatePlaylist(user?._id);

    const playlists = data?.docs || [];


    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleCreatePlaylist = () => {
        setIsCreateModalOpen(true);
    };

    if (isLoading) {
        return (
            <LoadingSpinner
            text="Loading Playlist..."
            />
        );
    }

    if (isError) {
        return (
            <div className="py-20 text-center text-red-500">
                Failed to load playlists.
            </div>
        );
    }

    return (
        <>
            <PlaylistGrid
                playlists={playlists}
                showCreateCard
                onCreatePlaylist={handleCreatePlaylist}
            />

            <CreatePlaylistModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                isLoading={createPlaylistMutation.isPending}
                onSubmit={async (values) => {
                    const payload = {
                        ...values,
                        isPublic: values.isPublic === "true",
                    };

                    await createPlaylistMutation.mutateAsync(payload);

                    setIsCreateModalOpen(false);
                }}
            />
        </>
    );
}

export default PlaylistPage;