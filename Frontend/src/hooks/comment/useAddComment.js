import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../../services/commentService";
export const useAddComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addComment,

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["comments", variables.videoId],
            });

            queryClient.invalidateQueries({
                queryKey: ["video", variables.videoId],
            });
        },
    });
};