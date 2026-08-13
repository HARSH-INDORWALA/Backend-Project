import { Button, Modal } from "../common";

function DeletePlaylistModal({ isOpen, onClose, playlist, onDelete, isLoading, error }) {
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
                {error && (
                    <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                        {error?.response?.data?.message ||
                            "Failed to delete playlist."}
                    </div>
                )}

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