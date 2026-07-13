import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlaylist } from "../../services/playlistService.js";

export const useCreatePlaylist = (userId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPlaylist,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["playlists", userId],
            });
        },
    });
};