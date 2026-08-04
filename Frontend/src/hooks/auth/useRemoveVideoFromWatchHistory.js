import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeVideoFromWatchHistory } from "../../services/authService";

export const useRemoveVideoFromWatchHistory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeVideoFromWatchHistory,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["watch-history"],
            });
        },  
    });
};