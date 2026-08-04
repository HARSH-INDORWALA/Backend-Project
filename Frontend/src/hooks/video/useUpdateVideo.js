import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateVideo } from "../../services/videoService";

export const useUpdateVideo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ videoId, formData }) =>
            updateVideo({videoId, formData}),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["myVideos"],
            });

            queryClient.invalidateQueries({
                queryKey: ["video", variables.videoId],
            });

            queryClient.invalidateQueries({
                queryKey: ["videos"],
            });
        },
    });
};