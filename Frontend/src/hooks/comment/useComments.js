import { useInfiniteQuery } from "@tanstack/react-query";
import { getVideoComments } from "../../services/commentService";

export const useComments = (videoId) => {
    return useInfiniteQuery({
        queryKey: ["comments", videoId],
        queryFn: ({ pageParam = 1 }) => getVideoComments(videoId, pageParam),
        enabled: !!videoId,
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.hasNextPage ? lastPage.nextPage : undefined,
    });
}   