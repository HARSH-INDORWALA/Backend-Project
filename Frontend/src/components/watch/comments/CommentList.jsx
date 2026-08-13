import CommentCard from "./CommentCard";

function CommentList({ comments, videoId, onDelete, onEdit }) {

    return (
        <div className="space-y-2 divide-y divide-border">
            {comments.map((comment) => (
                <div className="py-2">
                    <CommentCard
                        key={comment._id}
                        {...comment}
                        videoId={videoId}
                        onDelete={() => onDelete(comment)}
                        onEdit={() => onEdit(comment)}
                    />
                </div>
            ))}
        </div>
    );
}

export default CommentList; 