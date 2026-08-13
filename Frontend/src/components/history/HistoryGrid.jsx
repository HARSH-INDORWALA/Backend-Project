import HistoryVideoCard from "./HistoryVideoCard";

function HistoryGrid({ videos, onActionClick }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((video) => (
                <HistoryVideoCard
                    key={video._id}
                    {...video}
                    onActionClick={() => onActionClick(video)}
                />
            ))}
        </div>
    );
}

export default HistoryGrid;