import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePlaylist } from "../../services/playlistService";

export const useUpdatePlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updatePlaylist,

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["playlists"],
            });

            queryClient.invalidateQueries({
                queryKey: ["playlist", variables.playlistId],
            });
        },
    });
};