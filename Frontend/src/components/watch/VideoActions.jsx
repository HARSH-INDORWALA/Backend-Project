import {Bookmark, MoreHorizontal, Share2, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { useToggleVideoLike } from "../../hooks/like";
import AddToPlaylistModal from "./playlist/AddtoPlaylistModal";
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


function VideoActions  ({ isOwner, videoId, likesCount, isLiked }) {
    const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
    const { mutateAsync: toggleLike, isPending } = useToggleVideoLike(videoId);

    return (
        <>
            <div className="flex flex-wrap items-center gap-3">
                {!isOwner && (<button
                onClick={() => toggleLike()}
                    className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer
                        ${
                            isLiked
                                ? "bg-primary text-white border-primary"
                                : "border-border bg-surface text-foreground hover:bg-background"
                        }
                    `}
                >
                    <ThumbsUp
                        size={20}
                        className={isLiked ? "fill-white" : ""}
                    />

                    <span className="font-medium">
                        {likesCount}
                    </span>
                </button>
                )}
                <button className={buttonStyles}>
                    <Share2 size={18} />
                    Share
                </button>

                <button
                    className={buttonStyles}
                    onClick={() => setIsPlaylistModalOpen(true)}
                >
                    <Bookmark size={18} />
                    Save
                </button>

                <button className={buttonStyles}>
                    <MoreHorizontal size={18} />
                </button>
            </div>

            <AddToPlaylistModal
                isOpen={isPlaylistModalOpen}
                onClose={() => setIsPlaylistModalOpen(false)}
                videoId={videoId}
            />
    </>
    );
};

export default VideoActions;