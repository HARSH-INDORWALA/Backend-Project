import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    addVideoToPlaylist,
    removeVideoFromPlaylist,
} from "../../services/playlistService";

export const useTogglePlaylistVideo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            playlistId,
            videoId,
            hasVideo,
            userId,
        }) => {
            if (hasVideo) {
                return removeVideoFromPlaylist({
                    playlistId,
                    videoId,
                });
            }

            return addVideoToPlaylist({
                playlistId,
                videoId,
            });
        },

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [
                    "playlists",
                    variables.userId,
                    variables.videoId,
                ],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "playlist",
                    variables.playlistId,
                ],
            });
        },
    });
};