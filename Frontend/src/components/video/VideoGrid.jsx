import VideoCard from "./VideoCard.jsx";

const VideoGrid = ({ videos }) => {
  return (
    <div
      className="
        grid
        gap-6
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
      "
    >
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          {...video}
        />
      ))}
    </div>
  );
};

export default VideoGrid;