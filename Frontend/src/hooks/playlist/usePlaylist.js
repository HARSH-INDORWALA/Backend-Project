import { useQuery } from "@tanstack/react-query";
import { getPlaylistById } from "../../services/playlistService.js";

export const usePlaylist = (playlistId) => {
    return useQuery({
        queryKey: ["playlist", playlistId],

        queryFn: () => getPlaylistById(playlistId),

        enabled: !!playlistId,
    });
};