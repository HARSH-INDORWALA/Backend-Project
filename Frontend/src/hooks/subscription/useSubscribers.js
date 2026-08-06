import { useInfiniteQuery } from "@tanstack/react-query";

import { getChannelSubscribers } from "../../services/subscriptionService";
import  useAuthStore  from "../../store/authStore.js";

export const useSubscribers = () => {
    const user = useAuthStore((state) => state.user);

    return useInfiniteQuery({
        queryKey: ["subscribers", user?._id],

        queryFn: ({ pageParam = 1 }) =>
            getChannelSubscribers(user._id, {
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