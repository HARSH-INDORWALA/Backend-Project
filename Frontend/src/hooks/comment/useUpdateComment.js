import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "../../services/commentService";

export const useUpdateComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateComment,

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["comments", variables.videoId],
            });
        },
    });
};