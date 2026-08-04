import Modal from "../common/Modal";
import Button from "../common/Button";

function RemoveHistoryModal({
    isOpen,
    onClose,
    onConfirm,
    isPending,
}) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Remove from Watch History"
            maxWidth="max-w-md"
        >
            <div className="space-y-6">
                <p className="text-muted">
                    Are you sure you want to remove this video from your watch
                    history?
                </p>

                <div className="flex justify-end gap-3">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        disabled={isPending}
                        className="w-auto px-5 py-2"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={onConfirm}
                        isLoading={isPending}
                        className="w-auto px-5 py-2"
                    >
                        Remove
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default RemoveHistoryModal;