import { useInfiniteQuery } from "@tanstack/react-query";
import { getVideos } from "../../services/videoService.js";

export const useInfiniteVideos = (params = {}) => {
    return useInfiniteQuery({
        queryKey: ["videos", params],

        queryFn: ({ pageParam = 1 }) =>
            getVideos({
                ...params,
                page: pageParam,
            }),

        initialPageParam: 1,

        getNextPageParam: (lastPage) => {
            return lastPage.hasNextPage
                ? lastPage.nextPage
                : undefined;
        },

        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
    });
};