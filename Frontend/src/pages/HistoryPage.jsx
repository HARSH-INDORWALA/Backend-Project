import { useState } from "react";

import { 
    HistoryHeader,
    HistorySection,
    EmptyHistory,
    ClearHistoryModal,
    RemoveHistoryModal,
} from "../components/history";

import {
    useWatchHistory,
    useRemoveVideoFromWatchHistory,
    useClearWatchHistory,
} from "../hooks/auth";

import groupWatchHistory from "../utils/groupWatchHistory";

function HistoryPage() {
    const [selectedVideo, setSelectedVideo] = useState(null);

    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);

    const { data, isLoading } = useWatchHistory();
        
    const { mutate: removeVideo, isPending: isRemoving } = useRemoveVideoFromWatchHistory();

    const { mutate: clearHistory, isPending: isClearing } = useClearWatchHistory();

    const history = data??[];

    const groupedHistory = groupWatchHistory(history);

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

    if (!history.length) {
        return <EmptyHistory />;
    }

    return (
        <>
            <div className="space-y-2">
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
            </div>

            <RemoveHistoryModal
                isOpen={isRemoveModalOpen}
                isPending={isRemoving}
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