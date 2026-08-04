import { useMutation, useQueryClient } from "@tanstack/react-query";
import { togglePublishStatus } from "../../services/videoService";

export const useTogglePublishStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: togglePublishStatus,

        onSuccess: (_, videoId) => {
            queryClient.invalidateQueries({
                queryKey: ["myVideos"],
            });

            queryClient.invalidateQueries({
                queryKey: ["videos"],
            });

            queryClient.invalidateQueries({
                queryKey: ["video", videoId],
            });
        },
    });
};