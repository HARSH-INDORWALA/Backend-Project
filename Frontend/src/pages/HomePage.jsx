import VideoCard from "../components/video/VideoCard";
import VideoGrid from "../components/video/VideoGrid";
import mockVideos from "../data/mockVideos";
const HomePage = () => {
    

  return (
   <section className="space-y-6">
      <VideoGrid videos={mockVideos} />
    </section>
  );
};

export default HomePage;