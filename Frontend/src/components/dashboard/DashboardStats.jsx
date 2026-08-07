import {
    Eye,
    Video,
    Heart,
    Users,
    ArrowUpRight,
} from "lucide-react";

import { formatViews } from "../../utils/formatViews";

function DashboardStats({ stats }) {
    const cards = [
        {
            label: "Total Views",
            value: formatViews(stats.totalviews),
            icon: Eye,
        },
        {
            label: "Total Videos",
            value: formatViews(stats.totalVideos),
            icon: Video,
        },
        {
            label: "Total Likes",
            value: formatViews(stats.totalLikes),
            icon: Heart,
        },
        {
            label: "Subscribers",
            value: formatViews(stats.totalSubscribers),
            icon: Users,
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.label}
                        className="group rounded-2xl border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Icon size={21} />
                            </div>

                            <ArrowUpRight
                                size={18}
                                className="text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </div>

                        <p className="mt-5 text-2xl font-bold text-foreground">
                            {card.value}
                        </p>

                        <p className="mt-1 text-sm text-muted">
                            {card.label}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

export default DashboardStats;