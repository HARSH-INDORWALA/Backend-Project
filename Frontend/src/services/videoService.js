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

export const uploadVideo =  async (formData, onUploadProgress) =>{
    const response = await api.post("/videos", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });
    
    return response.data.data;
};

export const getVideos = async (params = {}) => {
    const response = await api.get("/videos", {
        params,
    });

    return response.data.data;
};


export const getMyVideos = async ({
    pageParam = 1,
    limit = 12,
    sort = "latest",
}) => {
    const response = await api.get("/dashboard/channelvideos", {
        params: {
            page: pageParam,
            limit,
            sort,
        },
    });
    
    return response.data.data;
};

export const deleteVideo = async (videoId) => {
    const response = await api.delete(`/videos/${videoId}`);

    return response.data.data;
};

export const updateVideo = async ({ videoId, formData }) => {
    const response = await api.patch(`/videos/${videoId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data.data;
};

export const togglePublishStatus = async (videoId) => {
    const response = await api.patch(
        `/videos/toggle/publish/${videoId}`
    );

    return response.data.data;
};