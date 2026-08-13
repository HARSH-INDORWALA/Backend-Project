import InfiniteScroll from "react-infinite-scroll-component";
import { SubscriptionGrid, SubscriptionsHeader } from "../components/subscription";
import { LoadingSpinner, EmptyState } from "../components/common";
import { useSubscribers } from "../hooks/subscription";

function SubscribersPage() {

    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useSubscribers();
    const subscribers = data?.pages.flatMap((page) => page.docs) ?? [];
    const totalSubscribers = data?.pages?.[0]?.totalDocs ?? 0;

    if (isLoading) {
        return (
            <LoadingSpinner text="Loading subscribers..." />
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center py-20">
                <p className="text-red-500">
                    {error?.response?.data?.message ||
                        "Failed to load your Subscribers."}
                </p>
            </div>
        );
    }

    if (!subscribers.length) {
        return (
            <EmptyState
                title="No subscribers yet"
                description="When people subscribe to your channel, they will appear here."
            />
        );
    }

    return (
        <section className="space-y-4">
            <SubscriptionsHeader
                title="Subscribers"
                description="People who subscribed to your channel"
                totalChannels={totalSubscribers}
                countLabel="Subscribers"
            />
            <div className="h-px w-full bg-slate-300" />
            <InfiniteScroll
                dataLength={subscribers.length}
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
                    <p className="py-8 text-center text-m text-foreground">
                        You've reached the end.
                    </p>
                }
                className="overflow-visible"
            >
                <SubscriptionGrid
                    channels={subscribers}
                    mode="subscriber"
                />
            </InfiniteScroll>
        </section>
    );
}

export default SubscribersPage;