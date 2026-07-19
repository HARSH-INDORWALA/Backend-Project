import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { useComments, useDeleteComment, useUpdateComment } from "../../hooks/comment";

import { CommentInput, CommentList, EmptyComments, DeleteCommentModal, EditCommentModal} from "./comments";

import LoadMoreButton from "../common/LoadMoreButton";

function CommentsSection({ videoId, commentsCount }) {
    const {
        data,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useComments(videoId);
    
    const [selectedComment, setSelectedComment] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const { mutate : updateComment, isPending: isUpdating} = useUpdateComment();
    const { mutate: deleteComment, isPending } = useDeleteComment();

    const comments =
        data?.pages.flatMap((page) => page.docs) ?? [];

    if (isLoading) {
        return (
            <section className="space-y-6">
                <div className="h-24 animate-pulse rounded-2xl bg-background" />
            </section>
        );
    }

    return (
        <section className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground">
                    {commentsCount} Comments
                </h2>


            <CommentInput videoId={videoId} />

            {comments.length === 0 ? (
                <EmptyComments />
            ) : (
                <>
                    <CommentList
                        comments={comments}
                        videoId={videoId}
                        onEdit={(comment)=>{
                            setSelectedComment(comment);
                            setIsEditOpen(true);
                        }}   
                        onDelete={(comment)=>{
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
                onClose={() => {
                    setIsDeleteOpen(false);
                    setSelectedComment(null);
                }}
                onConfirm={() => {
                    console.log(selectedComment._id);
                    
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