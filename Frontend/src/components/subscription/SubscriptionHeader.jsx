function SubscriptionsHeader({ title = "Subscriptions", description = "Channels you subscribed to", totalChannels = 0 }) {
    return (
        <div className="pb-2">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        {title}
                    </h1>

                    <p className="mt-1 text-xl text-foreground">
                        {description}
                    </p>
                </div>

                <span className="rounded-full bg-primary/20 px-4 py-2 text-xl font-medium text-primary">
                    {totalChannels} {totalChannels === 1 ? "Channel" : "Channels"}
                </span>
            </div>
        </div>
    );
}

export default SubscriptionsHeader;