import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleCommentLike } from "../../services/commentService";

export const useToggleCommentLike = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleCommentLike,

        onSuccess: (_, commentId) => {
            queryClient.invalidateQueries({
                queryKey: ["comments"],
            });
        },
    });
};