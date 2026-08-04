import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import LoadingSpinner from "../components/common/LoadingSpinner";
import VideoGrid from "../components/video/VideoGrid";
import { useSearchVideos } from "../hooks/video/useSearchVideos";

function SearchPage() {
    const [searchParams] = useSearchParams();

    const query = searchParams.get("q") || "";

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useSearchVideos(query);

    const videos =
        data?.pages.flatMap((page) => page.docs) ?? [];

    if (isLoading) {
        return (
            <LoadingSpinner text="Searching videos..." />
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center py-20">
                <p className="text-red-500">
                    Failed to fetch search results.
                </p>
            </div>
        );
    }

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-foreground">
                    Search Results
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Showing results for{" "}
                    <span className="font-medium text-foreground">
                        "{query}"
                    </span>
                </p>
            </div>

            {videos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24">
                    <h2 className="text-xl font-semibold text-foreground">
                        No videos found
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Try searching with different keywords.
                    </p>
                </div>
            ) : (
                <InfiniteScroll
                    dataLength={videos.length}
                    next={fetchNextPage}
                    hasMore={!!hasNextPage}
                    loader={
                        isFetchingNextPage ? (
                            <LoadingSpinner
                                size={35}
                                text="Loading more videos..."
                            />
                        ) : null
                    }
                    endMessage={
                        <p className="py-8 text-center text-sm text-muted-foreground">
                            You've reached the end.
                        </p>
                    }
                >
                    <VideoGrid videos={videos} />
                </InfiniteScroll>
            )}
        </section>
    );
}

export default SearchPage;