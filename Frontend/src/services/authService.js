import api from "../api/axios.js";

export const loginUser = async (credentials) => {
    const response = await api.post(
        "/users/login",
        credentials
    );

    return response.data;
};

export  const registerUser = async (formData) => {
    const response = await api.post(
        "/users/register",
        formData
    );

    return response.data;
};

export const logoutUser = async() =>{
    const response = await api.post(
        "/users/logout",
    );

    return response.data;
}

export const getCurrentUser = async()=>{
    const response = await api.get("/users/current-user");

    return response.data;
}

export const getWatchHistory = async()=>{
    const response = await api.get("/users/history");
    
    return response.data.data;
}

export const getChannelProfile = async (username) => {
    const response = await api.get(`/users/c/${username}`);
    
    return response.data.data;
};

export const removeVideoFromWatchHistory = async(videoId)=>{
    const response = await api.delete(`/users/history/${videoId}`);

    return response.data.data;
}

export const clearWatchHistory = async()=>{
    const response = await api.delete("/users/history");

    return response.data.data;
}

export const updateUserDetails = async (data) => {
    const response = await api.patch(
        "/users/update-account",
        data
    );

    return response.data.data;
};

export const updateUserAvatar = async (file) => {
    const formData = new FormData();

    formData.append("avatar", file);

    const response = await api.patch(
        "/users/avatar",
        formData
    );

    return response.data.data;
};

export const updateUserCoverImage = async (file) => {
    const formData = new FormData();

    formData.append("coverImage", file);

    const response = await api.patch(
        "/users/cover-image",
        formData
    );

    return response.data.data;
};