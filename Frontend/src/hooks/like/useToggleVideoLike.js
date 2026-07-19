import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleVideoLike } from "../../services/likeService";

export const useToggleVideoLike = (videoId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => toggleVideoLike(videoId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["video", videoId],
            });
        },
    });
}