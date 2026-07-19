import { ThumbsUp } from "lucide-react";
import { formatTimeAgo } from "../../../utils/formatTimeAgo";
import CommentActions from "./CommentActions";
import { useToggleCommentLike } from "../../../hooks/comment";
function CommentCard({
    _id,
    content,
    owner,
    createdAt,
    likesCount,
    isLiked,
    isOwner,
    onEdit,
    onDelete
}) {

    const { mutate : toggleCommentLike, isPending} = useToggleCommentLike();
     return (
        <div className="flex gap-4">
            <img
                src={owner.avatar}
                alt={owner.fullName}
                className="h-10 w-10 rounded-full object-cover"
            />

            <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground">
                            {owner.fullName}
                        </p>

                        <span className="text-sm text-muted">
                            {formatTimeAgo(createdAt)}
                        </span>
                    </div>

                    {isOwner && (
                        <CommentActions
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    )}
                </div>

                <p className="mt-2 whitespace-pre-line text-foreground">
                    {content}
                </p>

                <div className="mt-4 flex items-center gap-6 text-muted">
                    <button 
                        onClick={()=>{toggleCommentLike(_id)}}
                        disabled={isPending}
                        className="flex cursor-pointer items-center gap-2 transition-colors hover:text-primary">
                        <ThumbsUp
                            size={18}
                            className={isLiked ? "fill-current text-primary" : ""}
                        />

                        {likesCount}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CommentCard;