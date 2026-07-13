import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeVideoFromPlaylist } from "../../services/playlistService";

export const useRemoveVideoFromPlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeVideoFromPlaylist,

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["playlist", variables.playlistId],
            });

            queryClient.invalidateQueries({
                queryKey: ["playlists"],
            });
        },
    });
};