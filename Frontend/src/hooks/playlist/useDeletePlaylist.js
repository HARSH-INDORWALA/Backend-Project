import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePlaylist } from "../../services/playlistService";

export const useDeletePlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePlaylist,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["playlists"],
            });
        },
    });
};