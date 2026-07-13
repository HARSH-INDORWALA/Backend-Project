import { useQuery } from "@tanstack/react-query";
import { getUserPlaylists } from "../../services/playlistService.js";

export const useUserPlaylists = (userId) => {
    return useQuery({
        queryKey: ["playlists", userId],

        queryFn: () => getUserPlaylists(userId),

        enabled: !!userId,
    });
};