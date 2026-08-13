import HistoryGrid from "./HistoryGrid";

function HistorySection({ label, videos, onActionClick }) {
    return (
        <section className="space-y-4">
            <div className="space-y-2">
                <div className="h-px w-full bg-slate-300" />
                <h2 className="text-2xl font-semibold text-foreground">
                    {label}
                </h2>
            </div>

            <HistoryGrid
                videos={videos}
                onActionClick={onActionClick}
            />
        </section>
    );
}

export default HistorySection;