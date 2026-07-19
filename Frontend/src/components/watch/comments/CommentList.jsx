import CommentCard from "./CommentCard";

function CommentList({ comments, videoId, onDelete, onEdit }) {

    return (
        <div className="space-y-8">
            {comments.map((comment) => (
                <CommentCard
                    key={comment._id}
                    {...comment}
                    videoId={videoId}
                    onDelete={()=> onDelete(comment)}
                    onEdit={()=>onEdit(comment)}
                />
            ))}
        </div>
    );
}

export default CommentList; 