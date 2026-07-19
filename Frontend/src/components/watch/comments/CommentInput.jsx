import { useForm } from "react-hook-form";
import   Button  from "../../common/Button";
import useAuthStore  from "../../../store/authStore";
import { useAddComment } from "../../../hooks/comment";

function CommentInput({ videoId }) {
    const user = useAuthStore((state) => state.user);

    const {
        register,
        watch,
        reset,
        handleSubmit,
    } = useForm({
        defaultValues: {
            content: "",
        },
    });

    const content = watch("content");

    const { mutateAsync: addComment, isPending } = useAddComment(videoId);

    const onSubmit = async ({ content }) => {
        await addComment({videoId, content});
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
            <img
                src={user?.avatar}
                alt={user?.fullName}
                className="h-10 w-10 rounded-full object-cover"
            />

            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Add a comment..."
                    {...register("content", {
                        required: true,
                        validate: (value) => value.trim().length > 0,
                    })}
                    className="w-full border-b border-border bg-transparent py-2 text-foreground outline-none placeholder:text-muted"
                />

                {content?.trim() && (
                    <div className="mt-4 flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            className="w-auto rounded-full px-6 py-2"
                            onClick={() => reset()}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            isLoading={isPending}
                            className="w-auto rounded-full px-6 py-2"
                        >
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </form>
    );
}

export default CommentInput;