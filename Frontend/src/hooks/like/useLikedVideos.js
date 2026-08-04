import { useQuery } from "@tanstack/react-query";
import { getLikedVideos } from "../../services/likeService";

export const useLikedVideos = ( page = 1, limit = 20 ) => {
    return useQuery({
        queryKey: ["likedVideos", page, limit],

        queryFn: () => getLikedVideos(page, limit),
    });
};