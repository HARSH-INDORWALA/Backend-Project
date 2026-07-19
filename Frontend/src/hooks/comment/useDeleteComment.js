import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../services/commentService";
export const useDeleteComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteComment,

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