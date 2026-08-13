import Modal from "../common/Modal";
import PlaylistForm from "./PlaylistForm";

function CreatePlaylistModal({ isOpen, onClose, onSubmit, isLoading, error }) {
    const handleSubmit = async (data) => {
        await onSubmit(data);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Playlist"
        >
            <PlaylistForm
                submitLabel="Create Playlist"
                isLoading={isLoading}
                onSubmit={handleSubmit}
                onCancel={onClose}
                error={error}
            />
        </Modal>
    );
}

export default CreatePlaylistModal;