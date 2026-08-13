import { VideoGrid } from "../video";
import { useInfiniteVideos } from "../../hooks/video";
import { EmptyState, LoadingSpinner } from "../common";
import InfiniteScroll from "react-infinite-scroll-component";

function ChannelHome({ channelId }) {
    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useInfiniteVideos({ userId: channelId });

    const videos = data?.pages.flatMap((page) => page.docs) ?? [];

    if (isLoading) {
        return (
            <LoadingSpinner text="Loading Videos..." />
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center py-20">
                <p className="text-red-500">
                    {error?.response?.data?.message ||
                        "Failed to load Channel."}
                </p>
            </div>
        );
    }

    if (!videos.length) {
        return (
            <EmptyState
                title="No videos yet"
                description="This channel has not uploaded any videos yet."
            />
        )
    }

    return (
        <section className="mt-8 space-y-8">
            <InfiniteScroll
                dataLength={videos.length}
                next={fetchNextPage}
                hasMore={hasNextPage}
                loader={
                    <LoadingSpinner
                        size={30}
                        className="py-6"
                    />
                }
                className="overflow-visible"
            >
                <VideoGrid videos={videos} />
            </InfiniteScroll>

            {isFetchingNextPage && (
                <LoadingSpinner
                    size={30}
                    className="py-4"
                />
            )}
        </section>
    );
}

export default ChannelHome;