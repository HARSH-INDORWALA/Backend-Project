import Modal from "../common/Modal";
import Button from "../common/Button";

function DeletePlaylistModal({
    isOpen,
    onClose,
    playlist,
    onDelete,
    isLoading,
}) {
    const handleDelete = () => {
        onDelete();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Delete Playlist"
        >
            <div className="space-y-6">
                <p className="text-muted">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-muted-foreground">
                        "{playlist?.name}"
                    </span>
                    ?
                </p>

                <p className="text-sm text-red-500">
                    This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        isLoading={isLoading}
                    >
                        Delete Playlist
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default DeletePlaylistModal;