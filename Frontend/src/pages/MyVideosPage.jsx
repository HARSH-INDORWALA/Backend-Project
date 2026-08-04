import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { VideoOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useMyVideos, useDeleteVideo } from "../hooks/video";

import { VideoGrid,  MyVideosHeader, EditVideoModal, DeleteVideoModal } from "../components/video";

import { LoadingSpinner, EmptyState } from "../components/common";

function MyVideosPage() {
    const navigate = useNavigate();

    const [sort, setSort] = useState("latest");
    const [editingVideo, setEditingVideo] = useState(null);
    const [deletingVideo, setDeletingVideo] = useState(null);
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useMyVideos(sort);
    
    const {
        mutate: deleteVideo,
        isPending: isDeleting,
    } = useDeleteVideo();

    const videos = data?.pages.flatMap((page) => page.docs) ?? [];
    const totalVideos = data?.pages?.[0]?.totalDocs ?? 0;

    if (isLoading) {
        return (
            <LoadingSpinner text="Loading your videos..." />
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <p className="text-muted-foreground">
                    Failed to load your videos.
                </p>
            </div>
        );
    }

    if (!videos.length) {
        return (
            <EmptyState
                icon={
                    <VideoOff
                        size={72}
                        className="text-muted-foreground"
                    />
                }
                title="No videos uploaded yet"
                description="Upload your first video and start sharing with your audience."
                actionLabel="Upload Video"
                onAction={() => navigate("/upload")}
            />
        );
    }

    return (
        <section className="space-y-8">
            <MyVideosHeader
                totalVideos={totalVideos}
                sort={sort}
                onSortChange={setSort}
            />

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
                <VideoGrid videos={videos} 
                           showStats
                           showVisibility
                           showMenu
                           onEdit={setEditingVideo}
                           onDelete={setDeletingVideo}
                            />
            </InfiniteScroll>

            {isFetchingNextPage && (
                <LoadingSpinner
                    size={30}
                    className="py-4"
                />
            )}
            <EditVideoModal
                open={!!editingVideo}
                video={editingVideo}
                onClose={() => setEditingVideo(null)}
            />

            <DeleteVideoModal
                open={!!deletingVideo}
                video={deletingVideo}
                isPending={isDeleting}
                onClose={() => setDeletingVideo(null)}
                onConfirm={() => {
                    deleteVideo(deletingVideo._id, {
                        onSuccess: () => {
                            setDeletingVideo(null);
                        },
                    });
                }}
            />
        </section>
    );
}

export default MyVideosPage;