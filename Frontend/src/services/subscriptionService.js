import api from "../api/axios.js";

export const toggleSubscription = async (channelId) => {
    const response = await api.post(`/subscriptions/c/${channelId}`);

    return response.data.data;
};