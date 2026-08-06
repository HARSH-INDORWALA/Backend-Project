function SubscriptionsHeader({
    title = "Subscriptions",
    description = "Channels you subscribed to",
    totalChannels = 0,
    countLabel = "Channels",
}) {
    return (
        <div className="border-b border-border pb-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        {title}
                    </h1>

                    <p className="mt-1 text-sm text-foreground">
                        {description}
                    </p>
                </div>

                <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                    {totalChannels} {countLabel}
                </span>
            </div>
        </div>
    );
}

export default SubscriptionsHeader;