import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    usePlaylist,
    useUpdatePlaylist,
    useDeletePlaylist,
    useRemoveVideoFromPlaylist,
} from "../hooks/playlist";

import EditPlaylistModal from "../components/playlist/EditPlaylistModal";
import DeletePlaylistModal from "../components/playlist/DeletePlaylistModal";

import PlaylistHero from "../components/playlist/PlaylistView/PlaylistHero";
import PlaylistVideoList from "../components/playlist/PlaylistView/PlaylistVideoList";
import EmptyPlaylist from "../components/playlist/PlaylistView/EmptyPlaylist";

function PlaylistDetailsPage() {
    const { playlistId } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, isError } = usePlaylist(playlistId);

    const updatePlaylistMutation = useUpdatePlaylist();
    const deletePlaylistMutation = useDeletePlaylist();
    const removeVideoMutation = useRemoveVideoFromPlaylist();

    // Backend currently returns an array
    const playlist = data?.data?.[0];

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleUpdatePlaylist = async (formData) => {
        const payload = {
            ...formData,
            isPublic: formData.isPublic === "true",
        };

        try {
            await updatePlaylistMutation.mutateAsync({
                playlistId: playlist._id,
                data: payload,
            });

            setShowEditModal(false);
        } catch (error) {
            console.error("Failed to update playlist:", error);
        }
    };

    const handleDeletePlaylist = async () => {
        try {
            await deletePlaylistMutation.mutateAsync(playlist._id);

            navigate("/playlists");
        } catch (error) {
            console.error("Failed to delete playlist:", error);
        }
    };

    const handleRemoveVideo = async (videoId) => {
        try {
            await removeVideoMutation.mutateAsync({
                videoId,
                playlistId: playlist._id,
            });
        }
        catch (error) {
            console.error("Failed to remove video from playlist:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="py-20 text-center text-muted">
                Loading playlist...
            </div>
        );
    }

    if (isError || !playlist) {
        return (
            <div className="py-20 text-center text-red-500">
                Failed to load playlist.
            </div>
        );
    }

    return (
        <>
            <section className="mx-auto max-w-400 px-6 py-8">
                <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
                    <PlaylistHero
                        playlist={playlist}
                        onEdit={() => setShowEditModal(true)}
                        onDelete={() => setShowDeleteModal(true)}
                    />

                    {playlist.videos.length === 0 ? (
                        <EmptyPlaylist
                            isOwner={playlist.isOwner}
                        />
                    ) : (
                        <PlaylistVideoList
                            videos={playlist.videos}
                            isOwner={playlist.isOwner}
                            onRemoveVideo={handleRemoveVideo}
                        />
                    )}
                </div>
            </section>

            <EditPlaylistModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                playlist={playlist}
                isLoading={updatePlaylistMutation.isPending}
                onSubmit={handleUpdatePlaylist}
            />

            <DeletePlaylistModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                playlist={playlist}
                isLoading={deletePlaylistMutation.isPending}
                onDelete={handleDeletePlaylist}
            />
        </>
    );
}

export default PlaylistDetailsPage;