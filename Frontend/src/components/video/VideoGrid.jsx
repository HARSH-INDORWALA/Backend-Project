import VideoCard from "./VideoCard.jsx";

function VideoGrid({ videos, ...videoCardProps }) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {videos.map((video) => (
        <VideoCard
          key={video._id}
          video={video}
          {...videoCardProps}
        />
      ))}
    </div>
  );
};

export default VideoGrid;