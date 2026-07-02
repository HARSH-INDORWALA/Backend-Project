import {
    ThumbsUp,
    ThumbsDown,
    MessageCircle,
} from "lucide-react";

function CommentCard({
    avatar,
    username,
    time,
    comment,
    likes,
}) {
    return (
        <div className="flex gap-4">
            <img
                src={avatar}
                alt={username}
                className="
                    h-10
                    w-10
                    rounded-full
                    object-cover
                "
            />

            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground">
                        {username}
                    </p>

                    <span className="text-sm text-muted">
                        {time}
                    </span>
                </div>

                <p className="mt-2 whitespace-pre-line text-foreground">
                    {comment}
                </p>

                <div className="mt-4 flex items-center gap-6 text-muted">
                    <button className="flex items-center gap-2 hover:text-primary">
                        <ThumbsUp size={18} />
                        {likes}
                    </button>

                    <button className="hover:text-primary">
                        <ThumbsDown size={18} />
                    </button>

                    <button className="flex items-center gap-2 hover:text-primary">
                        <MessageCircle size={18} />
                        Reply
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CommentCard;