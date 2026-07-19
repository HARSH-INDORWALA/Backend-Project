import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleSubscription } from "../../services/subscriptionService";

export const useToggleSubscription = (videoId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleSubscription,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["video", videoId],
            });
        },
    });
}