import { ListVideo } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePlaylist, useUpdatePlaylist, useDeletePlaylist, useRemoveVideoFromPlaylist, } from "../hooks/playlist";
import { EditPlaylistModal, DeletePlaylistModal, PlaylistHero, PlaylistVideoList } from "../components/playlist";
import { LoadingSpinner, EmptyState } from "../components/common";

function PlaylistDetailsPage() {
    const { playlistId } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError, error } = usePlaylist(playlistId);

    const { mutateAsync: updatePlaylist, isPending: isUpdating, isError: isUpdateError, error: updateError } = useUpdatePlaylist();
    const { mutateAsync: deletePlaylist, isPending: isDeleting, isError: isDeleteError, error: deleteError } = useDeletePlaylist();
    const { mutateAsync: removeVideo, isPending: isRemoving, isError: isRemoveError, error: removeError } = useRemoveVideoFromPlaylist();

    const playlist = data?.data?.[0];

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleUpdatePlaylist = async (formData) => {
        const payload = {
            ...formData,
            isPublic: formData.isPublic === "true",
        };

        try {
            await updatePlaylist({
                playlistId: playlist._id,
                data: payload,
            });

            setShowEditModal(false);
        } catch (error) {
            console.error("Failed to update playlist:", updateError);
        }
    };

    const handleDeletePlaylist = async () => {
        try {
            await deletePlaylist(playlist._id);

            navigate("/playlists");
        } catch (error) {
            console.error("Failed to delete playlist:", deleteError);
        }
    };

    const handleRemoveVideo = async (videoId) => {
        try {
            await removeVideo({
                videoId,
                playlistId: playlist._id,
            });
        }
        catch (error) {
            console.error("Failed to remove video from playlist:", removeError);
        }
    };

    if (isLoading) {
        return (
            <div className="py-20 text-center text-muted">
                <LoadingSpinner text="Loading Playlist..." />
            </div>
        );
    }

    if (isError || !playlist) {
        return (
            <div className="flex justify-center py-20">
                <p className="text-red-500">
                    {error?.response?.data?.message ||
                        "Failed to load PLaylist."}
                </p>
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
                        <EmptyState
                            icon={<ListVideo size={40} className="text-primary" />}
                            title="The Playlist is empty"
                            description={playlist.isOwner
                                ? "Add videos to this playlist to start building your collection."
                                : "There are no videos in this playlist yet."
                            }
                        />
                    ) : (
                        <div>
                            {removeError && (
                                <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                                    {removeError?.response?.data?.message ||
                                        "Failed to remove video from playlist."}
                                </div>
                            )}

                            <PlaylistVideoList
                                videos={playlist.videos}
                                isOwner={playlist.isOwner}
                                onRemoveVideo={handleRemoveVideo}
                            />
                        </div>
                    )}
                </div>
            </section>

            <EditPlaylistModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                playlist={playlist}
                error={updateError}
                isLoading={isUpdating}
                onSubmit={handleUpdatePlaylist}
            />

            <DeletePlaylistModal
                isOpen={showDeleteModal}
                error={deleteError}
                onClose={() => setShowDeleteModal(false)}
                playlist={playlist}
                isLoading={isDeleting}
                onDelete={handleDeletePlaylist}
            />
        </>
    );
}

export default PlaylistDetailsPage;