import api from "../api/axios.js";

export const getVideoComments = async (videoId, page = 1) => {
    const response = await api.get(`/comments/${videoId}`, {
        params: {
            page,
            limit: 10,
        },
    });

    return response.data.data;
};

export const addComment = async ({videoId, content}) => {
    const response = await api.post(`/comments/${videoId}`, {
        content,
    });

    return response.data.data;
};

export const updateComment = async ({commentId, content : newcontent}) => {
    console.log(commentId,newcontent);
    
    const response = await api.patch(`/comments/c/${commentId}`, {
        newcontent,
    });

    return response.data.data;
};

export const deleteComment = async ({commentId}) => {
    
    const response = await api.delete(`/comments/c/${commentId}`);

    return response.data.data;
};

export const toggleCommentLike = async (commentId) => {
    const response = await api.post(`/likes/toggle/c/${commentId}`);

    return response.data.data;
};