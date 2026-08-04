import HistoryGrid from "./HistoryGrid";

function HistorySection({
    label,
    videos,
    onActionClick,
}) {
    return (
        <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
                {label}
            </h2>

            <HistoryGrid
                videos={videos}
                onActionClick={onActionClick}
            />
        </section>
    );
}

export default HistorySection;