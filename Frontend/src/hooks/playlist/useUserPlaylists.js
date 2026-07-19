import { useQuery } from "@tanstack/react-query";
import { getUserPlaylists } from "../../services/playlistService.js";

export const useUserPlaylists = (userId,videoId) => {
    return useQuery({
        queryKey: ["playlists", userId,videoId],

        queryFn: () => getUserPlaylists(userId,videoId),

        enabled: !!userId,
    });
};