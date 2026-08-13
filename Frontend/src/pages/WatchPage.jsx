import { VideoPlayer, VideoActions, VideoInfo, ChannelInfo, DescriptionBox, CommentsSection, SuggestedVideos } from "../components/watch";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useVideo, useSuggestedVideos, useIncrementView } from "../hooks/video";
import { formatDate } from "../utils";
import { LoadingSpinner } from "../components/common";

function WatchPage() {
    const { videoId } = useParams();
    const { data: video, isLoading, isSuccess, isError, error } = useVideo(videoId);
    const { data: suggestVideos = [] } = useSuggestedVideos(videoId);
    const { mutate } = useIncrementView();

    useEffect(() => {
        if (!isSuccess) return;

        mutate(videoId);
    }, [isSuccess, videoId, mutate]);

    if (isLoading) {
        return <LoadingSpinner text="Loading Video..." />;
    }

    if (isError || !video) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <div className=" rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500 ">
                    {error?.response?.data?.message ||
                        "Video not found."}
                </div>
            </div>
        );
    }

    return (
        <div className="grid gap-8 xl:grid-cols-[68%_32%] ">
            {/* Left */}
            <section className="space-y-6">
                <VideoPlayer
                    videoUrl={video.videoFile}
                    thumbnail={video.thumbnail}
                />

                <VideoInfo
                    title={video.title}
                    views={video.views}
                    uploadTime={formatDate(video.createdAt)}
                />

                <VideoActions
                    isOwner={video.isOwner}
                    videoId={video._id}
                    likesCount={video.likesCount}
                    isLiked={video.isLiked}
                />

                <ChannelInfo
                    videoId={video._id}
                    channelId={video.owner._id}
                    isOwner={video.isOwner}
                    avatar={video.owner.avatar}
                    channelName={video.owner.username}
                    subscribersCount={video.subscribersCount}
                    isSubscribed={video.isSubscribed}
                />

                <DescriptionBox
                    description={video.description.trim()}
                />

                <CommentsSection videoId={video._id} commentsCount={video.commentsCount} />
            </section>

            {/* Right */}
            <aside>
                <SuggestedVideos videos={suggestVideos} />
            </aside>
        </div>
    );
}

export default WatchPage;