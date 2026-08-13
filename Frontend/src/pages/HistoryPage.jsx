import { useState } from "react";
import { History } from "lucide-react";
import { EmptyState, LoadingSpinner } from "../components/common";
import { HistoryHeader, HistorySection, ClearHistoryModal, RemoveHistoryModal } from "../components/history";
import { useWatchHistory, useRemoveVideoFromWatchHistory, useClearWatchHistory } from "../hooks/auth";
import groupWatchHistory from "../utils/groupWatchHistory";
import { useNavigate } from "react-router-dom";

function HistoryPage() {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const navigate = useNavigate();
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);

    const { data, isLoading, isError, error } = useWatchHistory();

    const { mutate: removeVideo, isPending: isRemoving, error: removeError } = useRemoveVideoFromWatchHistory();

    const { mutate: clearHistory, isPending: isClearing, error: clearingError } = useClearWatchHistory();

    const history = data ?? [];

    const groupedHistory = groupWatchHistory(history);

    if (isLoading) {
        return (
            <LoadingSpinner text="Loading Watch History..." />
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

    if (!history.length) {
        return (
            <EmptyState
                icon={<History size={40} className="text-primary" />}
                title="No watch history yet"
                description="Videos you watch will appear here. Start exploring and discover content you'll love."
                actionLabel="Explore Videos"
                onAction={() => navigate("/")}
            />
        )
    }

    return (
        <>
            <HistoryHeader
                totalVideos={history.length}
                onClearHistory={() => setIsClearModalOpen(true)}
            />

            {groupedHistory.map((group) => (
                <HistorySection
                    key={group.label}
                    label={group.label}
                    videos={group.videos}
                    onActionClick={(video) => {
                        setSelectedVideo(video);
                        setIsRemoveModalOpen(true);
                    }}
                />
            ))}

            <RemoveHistoryModal
                isOpen={isRemoveModalOpen}
                isPending={isRemoving}
                error={removeError}
                onClose={() => {
                    setIsRemoveModalOpen(false);
                    setSelectedVideo(null);
                }}
                onConfirm={() => {
                    removeVideo(selectedVideo._id, {
                        onSuccess: () => {
                            setIsRemoveModalOpen(false);
                            setSelectedVideo(null);
                        },
                    });
                }}
            />

            <ClearHistoryModal
                isOpen={isClearModalOpen}
                isPending={isClearing}
                error={clearingError}
                onClose={() => setIsClearModalOpen(false)}
                onConfirm={() => {
                    clearHistory(undefined, {
                        onSuccess: () => {
                            setIsClearModalOpen(false);
                        },
                    });
                }}
            />
        </>
    );
}

export default HistoryPage;