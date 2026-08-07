import {
    Eye,
    Video,
    Heart,
    Users,
    ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import { EmptyState, LoadingSpinner } from "../components/common";
import DashboardStats from "../components/dashboard/DashboardStats";
import { useChannelStats } from "../hooks/dashboard/useChannelStats.js";
import { formatViews } from "../utils/formatViews.js";

function DashboardPage() {
    const {
        data: stats,
        isLoading,
        isError,
    } = useChannelStats();

    if (isLoading) {
        return (
            <LoadingSpinner text="Loading dashboard..." />
        );
    }

    if (isError || !stats) {
        return (
            <section className="mx-auto max-w-7xl px-4 py-8">
                <EmptyState
                    title="Unable to load dashboard"
                    description="Something went wrong while fetching your channel statistics. Please try again."
                />
            </section>
        );
    }

    return (
        <section className="mx-auto max-w-7xl space-y-8 px-4 py-8">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-primary">
                        Creator Dashboard
                    </p>

                    <h1 className="mt-1 text-3xl font-bold text-foreground">
                        Channel Overview
                    </h1>

                    <p className="mt-2 text-sm text-muted">
                        Keep track of your channel performance and audience.
                    </p>
                </div>

                <Link
                    to="/my-videos"
                    className="flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-background"
                >
                    Manage Videos
                    <ArrowRight size={16} />
                </Link>
            </div>

            {/* Stats */}
            <DashboardStats stats={stats} />

            {/* Overview */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">

                {/* Performance */}
                <div className="lg:col-span-2 rounded-2xl border border-border bg-surface p-6">
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">
                            Channel Performance
                        </h2>

                        <p className="mt-1 text-sm text-muted">
                            A quick overview of your channel activity.
                        </p>
                    </div>

                    <div className="mt-4 space-y-4">

                        <div className="flex items-center justify-between rounded-xl bg-background p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Eye size={19} />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        Views
                                    </p>

                                    <p className="text-xs text-muted">
                                        Total views across your videos
                                    </p>
                                </div>
                            </div>

                            <span className="font-semibold text-foreground">
                                {formatViews(stats.totalviews)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between rounded-xl bg-background p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Heart size={19} />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        Likes
                                    </p>

                                    <p className="text-xs text-muted">
                                        Total likes received
                                    </p>
                                </div>
                            </div>

                            <span className="font-semibold text-foreground">
                                {formatViews(stats.totalLikes)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between rounded-xl bg-background p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Users size={19} />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        Subscribers
                                    </p>

                                    <p className="text-xs text-muted">
                                        People following your channel
                                    </p>
                                </div>
                            </div>

                            <span className="font-semibold text-foreground">
                                {formatViews(stats.totalSubscribers)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="rounded-2xl border border-border bg-surface p-6">
                    <h2 className="text-lg font-semibold text-foreground">
                        Quick Actions
                    </h2>

                    <p className="mt-1 text-sm text-muted">
                        Manage your channel
                    </p>

                    <div className="mt-6 space-y-3">

                        <Link
                            to="/my-videos"
                            className="flex items-center justify-between rounded-xl bg-background p-4 transition-colors hover:bg-primary/5"
                        >
                            <div className="flex items-center gap-3">
                                <Video
                                    size={19}
                                    className="text-primary"
                                />

                                <span className="text-sm font-medium text-foreground">
                                    My Videos
                                </span>
                            </div>

                            <ArrowRight
                                size={17}
                                className="text-muted"
                            />
                        </Link>

                        <Link
                            to="/subscribers"
                            className="flex items-center justify-between rounded-xl bg-background p-4 transition-colors hover:bg-primary/5"
                        >
                            <div className="flex items-center gap-3">
                                <Users
                                    size={19}
                                    className="text-primary"
                                />

                                <span className="text-sm font-medium text-foreground">
                                    Subscribers
                                </span>
                            </div>

                            <ArrowRight
                                size={17}
                                className="text-muted"
                            />
                        </Link>

                        <Link
                            to="/profile"
                            className="flex items-center justify-between rounded-xl bg-background p-4 transition-colors hover:bg-primary/5"
                        >
                            <div className="flex items-center gap-3">
                                <ArrowRight
                                    size={19}
                                    className="text-primary"
                                />

                                <span className="text-sm font-medium text-foreground">
                                    Edit Profile
                                </span>
                            </div>

                            <ArrowRight
                                size={17}
                                className="text-muted"
                            />
                        </Link>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default DashboardPage;