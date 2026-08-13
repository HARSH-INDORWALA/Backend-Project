import { LikedVideosGrid, LikedVideosHeader } from "../components/liked";
import { EmptyState, LoadingSpinner } from "../components/common";
import { useLikedVideos } from "../hooks/like";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LikedVideosPage() {
    const { data, isLoading, isError, error } = useLikedVideos();
    const navigate = useNavigate();
    const likedVideos = data?.data?.docs ?? [];

    if (isLoading) {
        return (
            <LoadingSpinner text="Loading Liked Videos..." />
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center py-20">
                <p className="text-red-500">
                    {error?.response?.data?.message ||
                        "Failed to load videos."}
                </p>
            </div>
        )
    }
    
    if (!likedVideos.length) {
        return (
            <EmptyState
                icon={<Heart size={40} className="fill-primary text-primary" />}
                title="No liked videos yet"
                description="Videos you like will appear here. Explore StreamSphere and like videos to build your collection."
                actionLabel="Explore Videos"
                onAction={() => navigate("/")}
            />
        )
    }

    return (
        <div className="space-y-4">
            <div>
                <LikedVideosHeader
                    totalVideos={likedVideos.length}
                />
                <div className="h-px w-full bg-slate-300" />
            </div>


            <LikedVideosGrid
                videos={likedVideos}
            />
        </div>
    );
}

export default LikedVideosPage;