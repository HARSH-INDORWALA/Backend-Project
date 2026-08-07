import {
    CalendarDays,
    Users,
    UserRound,
    Video,
} from "lucide-react";
import { formatViews } from "../../utils/formatViews";

function ChannelAbout({ channel }) {
    return (
        <section className="mt-8 space-y-6">

            {/* About Header */}
            <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-foreground">
                        About
                    </h2>

                    <p className="mt-1 text-sm text-muted">
                        Channel information and activity
                    </p>
                </div>

                {/* Channel Stats */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                    <div className="rounded-xl border border-border bg-background p-4">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Users
                                size={20}
                                className="text-primary"
                            />
                        </div>

                        <p className="text-2xl font-semibold text-foreground">
                            {formatViews(channel.subscriberCount)}
                        </p>

                        <p className="mt-1 text-sm text-muted">
                            Subscribers
                        </p>
                    </div>

                    <div className="rounded-xl border border-border bg-background p-4">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Video
                                size={20}
                                className="text-primary"
                            />
                        </div>

                        <p className="text-2xl font-semibold text-foreground">
                            {formatViews(channel.totalVideos)}
                        </p>

                        <p className="mt-1 text-sm text-muted">
                            Videos
                        </p>
                    </div>

                    <div className="rounded-xl border border-border bg-background p-4">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <UserRound
                                size={20}
                                className="text-primary"
                            />
                        </div>

                        <p className="text-2xl font-semibold text-foreground">
                            {formatViews(channel.channelsSubscribedToCount)}
                        </p>

                        <p className="mt-1 text-sm text-muted">
                            Subscribed To
                        </p>
                    </div>

                    <div className="rounded-xl border border-border bg-background p-4">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <CalendarDays
                                size={20}
                                className="text-primary"
                            />
                        </div>

                        <p className="text-lg font-semibold text-foreground">
                            {new Date(channel.createdAt).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </p>

                        <p className="mt-1 text-sm text-muted">
                            Date Joined
                        </p>
                    </div>

                </div>
            </div>

            {/* Channel Details */}
            <div className="rounded-2xl border border-border bg-surface p-6">

                <h3 className="mb-5 text-lg font-semibold text-foreground">
                    Channel Details
                </h3>

                <div className="space-y-4">

                    <div className="flex items-center justify-between border-b border-border pb-4">
                        <span className="text-sm text-muted">
                            Channel Name
                        </span>

                        <span className="font-medium text-foreground">
                            {channel.fullName}
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-border pb-4">
                        <span className="text-sm text-muted">
                            Username
                        </span>

                        <span className="font-medium text-foreground">
                            {channel.username}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted">
                            Subscribers
                        </span>

                        <span className="font-medium text-foreground">
                            {formatViews(channel.subscriberCount)}
                        </span>
                    </div>

                </div>
            </div>

        </section>
    );
}

export default ChannelAbout;