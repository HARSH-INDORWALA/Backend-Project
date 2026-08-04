import LikedVideoCard from "./LikedVideoCard";

function LikedVideosGrid({ videos }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((video) => (
                <LikedVideoCard
                    key={video._id}
                    {...video}
                />
            ))}
        </div>
    );
}

export default LikedVideosGrid;