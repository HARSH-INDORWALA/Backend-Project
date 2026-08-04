import InfiniteScroll from "react-infinite-scroll-component";

import LoadingSpinner from "../components/common/LoadingSpinner";
import {VideoGrid} from "../components/video";
import { useInfiniteVideos } from "../hooks/video/useInfiniteVideos";

function HomePage() {
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteVideos({
        limit: 12,
    });
    
    const videos =
        data?.pages.flatMap((page) => page.docs) ?? [];

    if (isLoading) {
        return (
            <LoadingSpinner text="Loading videos..." />
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center py-20">
                <p className="text-red-500">
                    Failed to load videos.
                </p>
            </div>
        );
    }

    return (
        <section className="space-y-6">
            <InfiniteScroll
                dataLength={videos.length}
                next={fetchNextPage}
                hasMore={hasNextPage ?? false}
                loader={
                    isFetchingNextPage  ? (
                    <LoadingSpinner
                        size={35}
                        text="Loading more videos..."
                    />
                    ): null}
                endMessage={
                    <p className="py-8 text-center text-sm text-muted-foreground">
                        You've reached the end.
                    </p>
                }
            >
                <VideoGrid videos={videos} />
            </InfiniteScroll>
        </section>
    );
}

export default HomePage;