import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearWatchHistory } from "../../services/authService";

export const useClearWatchHistory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: clearWatchHistory,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["watch-history"],
            });
        },
    });
};