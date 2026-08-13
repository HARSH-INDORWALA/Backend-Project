import { useState } from "react";
import { LoadingSpinner } from "../components/common";
import { CreatePlaylistModal, PlaylistGrid } from "../components/playlist";
import { useUserPlaylists, useCreatePlaylist } from "../hooks/playlist";
import useAuthStore from "../store/authStore.js";

function PlaylistPage() {
    const user = useAuthStore((state) => state.user);
    const { data, isLoading, isError, error: usererror } = useUserPlaylists(user?._id);
    const { mutateAsync, isPending, error } = useCreatePlaylist(user?._id);
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
            <div className="flex justify-center py-20">
                <p className="text-red-500">
                    {usererror?.response?.data?.message ||
                        "Failed to load videos."}
                </p>
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
                isLoading={isPending}
                error={error}
                onSubmit={async (values) => {
                    const payload = {
                        ...values,
                        isPublic: values.isPublic === "true",
                    };

                    await mutateAsync(payload);

                    setIsCreateModalOpen(false);
                }}
            />
        </>
    );
}

export default PlaylistPage;