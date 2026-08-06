import { useInfiniteQuery } from "@tanstack/react-query";

import { getSubscribedChannels } from "../../services/subscriptionService";
import  useAuthStore  from "../../store/authStore.js";

export const useSubscribedChannels = () => {
    const user = useAuthStore((state) => state.user);

    return useInfiniteQuery({
        queryKey: ["subscriptions", user?._id],

        queryFn: ({ pageParam = 1 }) =>
            getSubscribedChannels(user._id, {
                page: pageParam,
                limit: 12,
            }),

        initialPageParam: 1,

        getNextPageParam: (lastPage) =>
            lastPage.hasNextPage
                ? lastPage.nextPage
                : undefined,

        enabled: !!user?._id,
    });
};