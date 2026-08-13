import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button } from "../../common";

function EditCommentModal({ isOpen, onClose, comment, onSubmit, isPending, isError, error }) {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            content: "",
        },
    });

    useEffect(() => {
        reset({
            content: comment?.content || "",
        });
    }, [comment, reset]);

    const handleUpdate = ({ content }) => {
        onSubmit(content.trim());
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Edit Comment"
            maxWidth="max-w-xl"
        >
            <form
                onSubmit={handleSubmit(handleUpdate)}
                className="space-y-6"
            >
                <textarea
                    rows={5}
                    {...register("content", {
                        required: true,
                        validate: (value) => value.trim().length > 0,
                    })}
                    className="w-full resize-none rounded-2xl border border-border bg-background p-4 text-foreground outline-none transition-colors focus:border-primary"
                    placeholder="Update your comment..."
                />
                
                {isError && (
                    <p className="text-sm text-red-500">
                        {error?.response?.data?.message ||
                            "Failed to update comment."}
                    </p>
                )}
                <div className="flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="secondary"
                        className="w-auto px-6 py-2"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        isLoading={isPending}
                        className="w-auto px-6 py-2"
                    >
                        Save Changes
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default EditCommentModal;