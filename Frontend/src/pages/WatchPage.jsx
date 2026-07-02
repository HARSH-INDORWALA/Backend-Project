import VideoPlayer from "../components/watch/VideoPlayer";
import VideoInfo from "../components/watch/VideoInfo";
import VideoActions from "../components/watch/VideoActions";
import ChannelInfo from "../components/watch/ChannelInfo";
import DescriptionBox from "../components/watch/DescriptionBox";
import SuggestedVideos from "../components/watch/SuggestedVideos";
import CommentsSection from "../components/watch/CommentsSection";

import mockCurrentVideo from "../data/mockCurrentVideo";
import mockSuggestedVideos from "../data/mockSuggestedVideos";

function WatchPage() {
    return (
        <div className="grid gap-8 xl:grid-cols-[68%_32%] ">
            {/* Left */}
            <section className="space-y-6">
                <VideoPlayer
                    thumbnail={mockCurrentVideo.thumbnail}
                />

                <VideoInfo
                    title={mockCurrentVideo.title}
                    views={mockCurrentVideo.views}
                    uploadTime={mockCurrentVideo.uploadTime}
                />

                <VideoActions
                    likes={mockCurrentVideo.likes}
                />

                <ChannelInfo
                    avatar={mockCurrentVideo.channel.avatar}
                    channelName={mockCurrentVideo.channel.name}
                    subscribers={mockCurrentVideo.channel.subscribers}
                />

                <DescriptionBox
                    description={mockCurrentVideo.description.trim()}
                />

                <CommentsSection />
            </section>

            {/* Right */}
            <aside>
                <SuggestedVideos
                    videos={mockSuggestedVideos}
                />
            </aside>
        </div>
    );
}

export default WatchPage;