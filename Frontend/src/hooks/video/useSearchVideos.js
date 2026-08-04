import { useInfiniteQuery } from "@tanstack/react-query";
import { getVideos } from "../../services/videoService";

export const useSearchVideos = (
    query,
    options = {}
) => {
    return useInfiniteQuery({
        queryKey: ["search-videos", query],

        enabled: Boolean(query?.trim()),

        queryFn: ({ pageParam = 1 }) =>
            getVideos({
                page: pageParam,
                limit: options.limit || 12,
                query: query.trim(),
                sortBy: options.sortBy,
                sortType: options.sortType,
            }),

        initialPageParam: 1,

        getNextPageParam: (lastPage) =>
            lastPage.hasNextPage
                ? lastPage.nextPage
                : undefined,

        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
    });
};