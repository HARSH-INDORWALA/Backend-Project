import { useQuery } from "@tanstack/react-query";
import { getVideoById } from "../../services/videoService";

export const useVideo = (videoId) => {
    return useQuery({
        queryKey: ["video", videoId],
        queryFn: () => getVideoById(videoId),
        enabled: !!videoId,
        refetchOnMount : "always",
    });
}