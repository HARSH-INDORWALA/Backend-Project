import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVideo } from "../../services/videoService";

export const useDeleteVideo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteVideo,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["myVideos"],
            });

            queryClient.invalidateQueries({
                queryKey: ["videos"],
            });
        },
    });
};