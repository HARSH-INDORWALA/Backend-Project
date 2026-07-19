import api from "../api/axios.js";


export const incrementView = async (videoId) => {
    const response = await api.post(`/videos/${videoId}/view`);

    return response.data.data;
};

export const getVideoById = async (videoId) => {
    const response = await api.get(`/videos/${videoId}`);

    return response.data.data;
};

export const getSuggestedVideos = async (videoId) => {
    const response = await api.get(`/videos/suggestions/${videoId}`);

    return response.data.data;
};