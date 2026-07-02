import SuggestedVideoCard from "./SuggestedVideoCard";

function SuggestedVideos({ videos }) {
    return (
        <aside
                className="
                    xl:sticky
                    xl:top-28
                    rounded-2xl
                    border
                    border-border
                    bg-surface
                    p-5
                    shadow-sm
                "
            >
            <h2
                className="
                    mb-5
                    text-lg
                    font-semibold
                    text-foreground
                "
            >
                Suggested Videos
            </h2>

            <div className="space-y-5">
                {videos.map((video) => (
                    <SuggestedVideoCard
                        key={video.id}
                        {...video}
                    />
                ))}
            </div>
        </aside>
    );
}

export default SuggestedVideos;