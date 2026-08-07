import api from "../api/axios.js";

export const getChannelStats = async () => {
    const response = await api.get("/dashboard/channelstats");

    return response.data.data;
};