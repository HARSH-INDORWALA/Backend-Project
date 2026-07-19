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
    const reponse = await api.post(
        "/users/logout",
    );

    return reponse.data;
}

export const getCurrentUser = async()=>{
    const reponse = await api.get("/users/current-user");

    return reponse.data;
}

export const getWatchHistory = async()=>{
    const reponse = await api.get("/users/history")
}