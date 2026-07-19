import Modal from "../../common/Modal";
import Button from "../../common/Button";

function DeleteCommentModal({
    isOpen,
    onClose,
    onConfirm,
    isPending,
}) {
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Delete Comment"
            maxWidth="max-w-md"
        >
            <div className="space-y-6">
                <p className="text-muted">
                    Are you sure you want to delete this comment? This action
                    cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        onClick={onConfirm}
                        isLoading={isPending}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default DeleteCommentModal;