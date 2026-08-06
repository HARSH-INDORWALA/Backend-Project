import InfiniteScroll from "react-infinite-scroll-component";
import { Users } from "lucide-react";
import { SubscriptionGrid, SubscriptionsHeader } from "../components/subscription";

import { LoadingSpinner, EmptyState } from "../components/common";

import { useSubscribedChannels } from "../hooks/subscription";

function SubscriptionsPage() {
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useSubscribedChannels();
    
    const channels = data?.pages.flatMap((page) => page.docs) ?? [];

    const totalChannels = data?.pages?.[0]?.totalDocs ?? 0;

    if (isLoading) {
        return (
            <LoadingSpinner
                text="Loading subscriptions..."
            />
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <p className="text-muted-foreground">
                    Failed to load your subscriptions.
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
                    <p className="
                        py-8
                        text-center
                        text-sm
                        text-muted-foreground
                    ">
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