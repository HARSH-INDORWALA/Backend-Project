import api from "../api/axios.js";

// Get all playlists of a user
export const getUserPlaylists = async (userId, videoId) => {
    const response = await api.get(
        `/playlists/user/${userId}`,{
            params : videoId ? { videoId } : {},
        }
    );

    return response.data.data;
};

// Get playlist details
export const getPlaylistById = async (playlistId) => {
    const response = await api.get(
        `/playlists/${playlistId}`
    );

    return response.data;
};

// Create playlist
export const createPlaylist = async (playlistData) => {
    const response = await api.post(
        "/playlists",
        playlistData
    );

    return response.data;
};

// Update playlist
export const updatePlaylist = async ({
    playlistId,
    data,
}) => {
    const response = await api.patch(
        `/playlists/${playlistId}`,
        data
    );

    return response.data;
};

// Delete playlist
export const deletePlaylist = async (playlistId) => {
    const response = await api.delete(
        `/playlists/${playlistId}`
    );

    return response.data;
};

// Add video to playlist
export const addVideoToPlaylist = async ({videoId, playlistId}) => {
    const response = await api.patch(
        `/playlists/add/${videoId}/${playlistId}`
    );

    return response.data;
};

// Remove video from playlist
export const removeVideoFromPlaylist = async ({
    videoId,
    playlistId
}) => {
    const response = await api.patch(
        `/playlists/remove/${videoId}/${playlistId}`
    );

    return response.data;
};