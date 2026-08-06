import { AlertTriangle } from "lucide-react";

import {
    Button,
    LoadingSpinner,
    Modal,
} from "../common";

function DeleteVideoModal({
    open,
    video,
    onClose,
    onConfirm,
    isPending,
}) {
    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            title="Delete Video"
            maxWidth="max-w-md"
        >
            <div className="space-y-6">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
                        <AlertTriangle
                            size={28}
                            className="text-red-500"
                        />
                    </div>

                    <h3 className="text-lg font-semibold text-foreground">
                        Delete this video?
                    </h3>

                    <p className="mt-2 text-sm text-foreground">
                        Are you sure you want to delete{" "}
                        <span className="font-medium text-foreground">
                            "{video?.title}"
                        </span>
                        ? This action cannot be undone.
                    </p>
                </div>

                <div className="flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        onClick={onConfirm}
                        disabled={isPending}
                        className="bg-red-500 hover:bg-red-600"
                    >
                        {isPending ? (
                            <LoadingSpinner size={20} />
                        ) : (
                            "Delete Video"
                        )}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default DeleteVideoModal;