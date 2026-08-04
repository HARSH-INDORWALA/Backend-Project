import api from "../api/axios.js";

export const toggleVideoLike = async (videoId) => {
    const response = await api.post(`/likes/toggle/v/${videoId}`);

    return response.data.data;
};

// Get liked videos
export const getLikedVideos = async (page = 1, limit = 20) => {
    const response = await api.get("/likes/videos", {
        params: {
            page,
            limit,
        },
    });

    return response.data;
};