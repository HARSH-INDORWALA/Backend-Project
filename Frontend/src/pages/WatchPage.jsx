import VideoPlayer from "../components/watch/VideoPlayer";
import VideoInfo from "../components/watch/VideoInfo";
import VideoActions from "../components/watch/VideoActions";
import ChannelInfo from "../components/watch/ChannelInfo";
import DescriptionBox from "../components/watch/DescriptionBox";
import SuggestedVideos from "../components/watch/SuggestedVideos";
import CommentsSection from "../components/watch/CommentsSection";

import { useParams } from "react-router-dom";
import { useEffect } from "react";  
import { useVideo, useSuggestedVideos, useIncrementView} from "../hooks/video";
import { formatRelativeDate } from "../utils/formatDate.js";

function WatchPage() {
    const { videoId } = useParams();
    const { data: video, isLoading, isSuccess, isError } = useVideo(videoId);

    const {data: suggestVideos=[]} = useSuggestedVideos(videoId);
    const { mutate } = useIncrementView();
    useEffect(() => {
        if (!isSuccess) return;

        mutate(videoId);
    }, [isSuccess, videoId, mutate]);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !video) {
        return <div>Video not found.</div>;
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
                    uploadTime={formatRelativeDate(video.createdAt)}
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

                <CommentsSection  videoId={video._id} commentsCount={video.commentsCount}/>
            </section>

            {/* Right */}
            <aside>
                <SuggestedVideos videos={suggestVideos}/>
            </aside>
        </div>
    );
}

export default WatchPage;