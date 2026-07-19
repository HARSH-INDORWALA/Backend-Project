import { useQuery } from "@tanstack/react-query";
import { getSuggestedVideos } from "../../services/videoService";

export const useSuggestedVideos = (videoId) => {
    return useQuery({
        queryKey: ["suggestedVideos", videoId],
        queryFn: () => getSuggestedVideos(videoId),
        enabled: !!videoId,
    });
}