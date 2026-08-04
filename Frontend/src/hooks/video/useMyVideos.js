import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyVideos } from "../../services/videoService";

export const useMyVideos = (sort = "latest") => {
    return useInfiniteQuery({
        queryKey: ["myVideos", sort],

        queryFn: ({ pageParam = 1 }) =>
            getMyVideos({
                page: pageParam,
                limit: 12,
                sort,
            }),

        initialPageParam: 1,

        getNextPageParam: (lastPage) =>
            lastPage.hasNextPage ? lastPage.nextPage : undefined,
    });
}
