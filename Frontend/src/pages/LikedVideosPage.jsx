import {
    EmptyLikedVideos,
    LikedVideosGrid,
    LikedVideosHeader,
} from "../components/liked";

import { useLikedVideos } from "../hooks/like";

function LikedVideosPage() {
    const { data, isLoading } = useLikedVideos();

    const likedVideos = data?.data?.docs ?? [];

    if (isLoading) {
        return (
            <div className="space-y-8">
                <div className="h-10 w-64 animate-pulse rounded-xl bg-background" />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="aspect-video animate-pulse rounded-2xl bg-background"
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (!likedVideos.length) {
        return <EmptyLikedVideos />;
    }

    return (
        <div className="space-y-4">
            <LikedVideosHeader
                totalVideos={likedVideos.length}
            />

            <LikedVideosGrid
                videos={likedVideos}
            />
        </div>
    );
}

export default LikedVideosPage;