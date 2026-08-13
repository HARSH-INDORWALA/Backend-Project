import { Bookmark, MoreHorizontal, Share2, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { useToggleVideoLike } from "../../hooks/like";
import { AddToPlaylistModal } from "./playlist";
const buttonStyles = ` flex items-center gap-2 cursor-pointer rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-background `;


function VideoActions({ isOwner, videoId, likesCount, isLiked }) {
    const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
    const { mutateAsync: toggleLike, isPending } = useToggleVideoLike(videoId);
    const [shareError, setShareError] = useState("");
    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/watch/${videoId}`;
        setShareError("");
        try {
            if (navigator.share) {
                await navigator.share({
                    title: document.title,
                    text: "Check out this video on StreamSphere",
                    url: shareUrl,
                });

                return;
            }

            await navigator.clipboard.writeText(shareUrl);

        } catch (error) {
            if (error.name !== "AbortError") {
                setShareError("Unable to share this video. PLease try again.")
            }
        }
    };

    return (
        <>
            <div className="flex flex-wrap items-center gap-3">
                {!isOwner && (<button
                    onClick={() => toggleLike()}
                    disabled={isPending}
                    className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer
                        ${isLiked
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
                <div>
                    <button className={buttonStyles}
                        onClick={handleShare}
                    >
                        <Share2 size={18} />
                        Share
                    </button>

                    {shareError && (
                        <p className="mt-2 text-sm text-red-500">
                            {shareError}
                        </p>
                    )}
                </div>
                <button
                    className={buttonStyles}
                    onClick={() => setIsPlaylistModalOpen(true)}
                >
                    <Bookmark size={18} />
                    Save
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