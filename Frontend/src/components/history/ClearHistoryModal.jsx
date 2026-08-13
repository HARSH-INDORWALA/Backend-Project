import { Modal, Button } from "../common";

function ClearHistoryModal({ isOpen, onClose, onConfirm, isPending, error }) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Clear Watch History"
            maxWidth="max-w-md"
        >
            <div className="space-y-6">
                <p className="text-muted">
                    Are you sure you want to clear your entire watch history?
                    This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                    {error && (
                        <div className=" rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500 ">
                            {error?.response?.data?.message ||
                                "Failed to clear watch history."}
                        </div>
                    )}
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        disabled={isPending}
                        className="w-auto px-5 py-2"
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        onClick={onConfirm}
                        isLoading={isPending}
                        className="w-auto px-5 py-2"
                    >
                        Clear History
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default ClearHistoryModal;