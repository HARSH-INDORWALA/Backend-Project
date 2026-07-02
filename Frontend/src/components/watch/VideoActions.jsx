import {
    Bookmark,
    MoreHorizontal,
    Share2,
    ThumbsUp,
} from "lucide-react";
import { useState } from "react";
const buttonStyles = `
    flex
    items-center
    gap-2
    rounded-full
    border
    border-border
    bg-surface
    px-5
    py-2.5
    text-sm
    font-medium
    text-foreground
    transition-colors
    hover:bg-background
`;


function VideoActions  ({ likes }) {
    const [liked, setLiked] = useState(false);
    return (
        <div
            className="
                flex
                flex-wrap
                items-center
                gap-3
            "
        >
            <button
            onClick={() => setLiked(!liked)}
            className={`
                flex
                items-center
                gap-2
                rounded-full
                border
                px-5
                py-2.5
                text-sm
                font-medium
                transition-all
                duration-300
                cursor-pointer
                ${
                    liked
                        ? "bg-primary text-white border-primary"
                        : "border-border bg-surface text-foreground hover:bg-background"
                }
            `}
        >
            <ThumbsUp
                size={20}
                className={liked ? "fill-white" : ""}
            />

            <span className="font-medium">
                {liked ? likes + 1 : likes}
            </span>
        </button>

            <button className={buttonStyles}>
                <Share2 size={18} />
                Share
            </button>

            <button className={buttonStyles}>
                <Bookmark size={18} />
                Save
            </button>

            <button className={buttonStyles}>
                <MoreHorizontal size={18} />
            </button>
        </div>
    );
};

export default VideoActions;