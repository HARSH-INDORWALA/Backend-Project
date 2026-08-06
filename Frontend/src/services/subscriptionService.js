import api from "../api/axios.js";

export const toggleSubscription = async (channelId) => {
    const response = await api.post(`/subscriptions/c/${channelId}`);

    return response.data.data;
};

export const getSubscribedChannels = async (subscriberId, params = {}) => {
    const response = await api.get(
        `/subscriptions/u/${subscriberId}`,
        {
            params,
        }
    );
    return response.data.data;
};

export const getChannelSubscribers = async (channelId, params = {}) => {
    const response = await api.get(
        `/subscriptions/c/${channelId}`,
        {
            params,
        }
    );

    return response.data.data;
};