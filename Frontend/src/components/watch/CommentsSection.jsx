import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useComments, useDeleteComment, useUpdateComment } from "../../hooks/comment";
import { CommentInput, CommentList, DeleteCommentModal, EditCommentModal } from "./comments";
import { LoadingSpinner, LoadMoreButton, EmptyState } from "../common";

function CommentsSection({ videoId, commentsCount }) {
    const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, error } = useComments(videoId);
    const [selectedComment, setSelectedComment] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const { mutate: updateComment, isError: isUpdateError, isPending: isUpdating, error: updateError } = useUpdateComment();
    const { mutate: deleteComment, isError: isDeleteError, isPending, error: deleteError } = useDeleteComment();

    const comments = data?.pages.flatMap((page) => page.docs) ?? [];

    if (isLoading) {
        return <LoadingSpinner text="Loading Comments" />
    }

    if (isError) {
        return (
            <div className="flex justify-center py-20">
                <p className="text-red-500">
                    {error?.response?.data?.message ||
                        "Failed to load Comments."}
                </p>
            </div>
        )
    }
    return (
        <section className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
                {commentsCount} Comments
            </h2>


            <CommentInput videoId={videoId} />

            {comments.length === 0 ? (
                <EmptyState
                    icon={<MessageCircle size={40} className="text-primary" />}
                    title=" No comments yet"
                    description="Be the first to share your thoughts."
                />
            ) : (
                <>
                    <CommentList
                        comments={comments}
                        videoId={videoId}
                        onEdit={(comment) => {
                            setSelectedComment(comment);
                            setIsEditOpen(true);
                        }}
                        onDelete={(comment) => {
                            setSelectedComment(comment);
                            setIsDeleteOpen(true);
                        }}
                    />

                    {hasNextPage && (
                        <LoadMoreButton
                            onClick={fetchNextPage}
                            isLoading={isFetchingNextPage}
                        />
                    )}
                </>
            )}

            <EditCommentModal
                isOpen={isEditOpen}
                isError={isUpdateError}
                error={updateError}
                comment={selectedComment}
                isPending={isUpdating}
                onClose={() => {
                    setIsEditOpen(false);
                    setSelectedComment(null);
                }}
                onSubmit={(content) => {
                    updateComment(
                        {
                            commentId: selectedComment._id,
                            videoId,
                            content,
                        },
                        {
                            onSuccess: () => {
                                setIsEditOpen(false);
                                setSelectedComment(null);
                            },
                        }
                    );
                }}
            />

            <DeleteCommentModal
                isOpen={isDeleteOpen}
                isPending={isPending}
                isError={isDeleteError}
                error={deleteError}
                onClose={() => {
                    setIsDeleteOpen(false);
                    setSelectedComment(null);
                }}
                onConfirm={() => {

                    deleteComment(
                        {
                            commentId: selectedComment._id,
                            videoId,
                        },
                        {
                            onSuccess: () => {
                                setIsDeleteOpen(false);
                                setSelectedComment(null);
                            },
                        }
                    );
                }}
            />
        </section>
    );
}

export default CommentsSection;