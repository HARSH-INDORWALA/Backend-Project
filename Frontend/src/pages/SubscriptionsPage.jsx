import InfiniteScroll from "react-infinite-scroll-component";
import { Users } from "lucide-react";
import { SubscriptionGrid, SubscriptionsHeader } from "../components/subscription";
import { LoadingSpinner, EmptyState } from "../components/common";
import { useSubscribedChannels } from "../hooks/subscription";

function SubscriptionsPage() {
    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useSubscribedChannels();
    const channels = data?.pages.flatMap((page) => page.docs) ?? [];
    const totalChannels = data?.pages?.[0]?.totalDocs ?? 0;

    if (isLoading) {
        return (
            <LoadingSpinner text="Loading subscriptions..." />
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center py-20">
                <p className="text-red-500">
                    {error?.response?.data?.message ||
                        "Failed to load Subscriptions."}
                </p>
            </div>
        );
    }

    if (!channels.length) {
        return (
            <EmptyState
                icon={<Users size={40} className="text-primary" />}
                title="No subscriptions yet"
                description="Subscribe to channels to see them here."
            />
        );
    }

    return (
        <section className="space-y-4">

            <SubscriptionsHeader
                totalChannels={totalChannels}
            />
            <div className="h-px w-full bg-slate-300" />
            <InfiniteScroll
                dataLength={channels.length}
                next={fetchNextPage}
                hasMore={hasNextPage ?? false}
                loader={
                    isFetchingNextPage ? (
                        <LoadingSpinner
                            size={30}
                            className="py-6"
                        />
                    ) : null
                }
                endMessage={
                    <p className=" py-8 text-center text-m text-foreground ">
                        You've reached the end.
                    </p>
                }
                className="overflow-visible"
            >
                <SubscriptionGrid
                    channels={channels}
                />
            </InfiniteScroll>

        </section>
    );
}

export default SubscriptionsPage;