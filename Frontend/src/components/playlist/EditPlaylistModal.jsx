import Modal from "../common/Modal";
import PlaylistForm from "./PlaylistForm";

function EditPlaylistModal({
    isOpen,
    onClose,
    playlist,
    onSubmit,
    isLoading,
}) {
    const handleSubmit = async (data) => {
        await onSubmit(data);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Edit Playlist"
        >
            <PlaylistForm
                key={playlist?._id}
                defaultValues={{
                    name: playlist?.name || "",
                    description: playlist?.description || "",
                    isPublic: String(playlist?.isPublic),
                }}
                submitLabel="Save Changes"
                isLoading={isLoading}
                onSubmit={handleSubmit}
                onCancel={onClose}
            />
        </Modal>
    );
}

export default EditPlaylistModal;