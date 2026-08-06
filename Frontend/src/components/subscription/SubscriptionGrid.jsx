import SubscriptionCard from "./SubscriptionCard";

function SubscriptionGrid({
    channels,
    mode = "subscription",
}) {
    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {channels.map((channel) => (
                <SubscriptionCard
                    key={channel._id}
                    channel={channel}
                    mode={mode}
                />
            ))}
        </div>
    );
}

export default SubscriptionGrid;