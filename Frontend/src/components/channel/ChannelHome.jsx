import VideoGrid from "../video/VideoGrid";
import mockVideos from "../../data/mockVideos";

function ChannelHome() {
    return (
        <section className="mt-8 space-y-8">
            <VideoGrid videos={mockVideos} />
        </section>
    );
}

export default ChannelHome;