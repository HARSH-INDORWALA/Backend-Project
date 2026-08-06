import {
    AtSign,
    Users,
    UserRoundPlus,
    Video,
} from "lucide-react";

import { formatViews } from "../../utils/formatViews";

function ChannelAbout({ channel }) {
    const stats = [
        {
            label: "Subscribers",
            value: formatViews(channel.subscriberCount),
            icon: Users,
        },
        {
            label: "Subscribed To",
            value: formatViews(channel.channelsSubscribedToCount),
            icon: UserRoundPlus,
        },
        {
            label: "Videos",
            value: formatViews(channel.totalVideos),
            icon: Video,
        },
    ];

    return (
        <section className="mt-2 space-y-4">

            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-foreground">
                    About this channel
                </h2>

                <p className="mt-1 text-sm text-muted">
                    Channel information and statistics
                </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.label}
                            className="group rounded-2xl border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Icon size={20} />
                                </div>
                            </div>

                            <p className="mt-4 text-2xl font-bold text-foreground">
                                {stat.value}
                            </p>

                            <p className="mt-1 text-sm text-muted">
                                {stat.label}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Channel Details */}
            <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold text-foreground">
                    Channel Details
                </h3>

                <div className="mt-5 flex items-center gap-4 rounded-xl bg-background p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <AtSign size={20} />
                    </div>

                    <div>
                        <p className="text-xs text-muted">
                            Username
                        </p>

                        <p className="mt-0.5 font-medium text-foreground">
                            {channel.username}
                        </p>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default ChannelAbout;