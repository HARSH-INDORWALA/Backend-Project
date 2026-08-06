import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleSubscription } from "../../services/subscriptionService";

export const useToggleSubscription = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleSubscription,

        onSuccess: (_, channelId) => {
            queryClient.invalidateQueries({
                queryKey: ["channel"],
            });

            queryClient.invalidateQueries({
                queryKey: ["subscriptions"],
            });

            queryClient.invalidateQueries({
                queryKey: ["subscribers"],
            });
        },
    });
};