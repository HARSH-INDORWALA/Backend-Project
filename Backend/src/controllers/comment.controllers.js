import mongoose, { isValidObjectId } from "mongoose";
import asynchandler from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Video } from "../models/videos.models.js";
import { Comment } from "../models/comment.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getCommentDetails = async (commentId, userId) => {
    const comment = await Comment.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(commentId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            username: 1,
                            fullName: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "comment",
                as: "likes"
            }
        },
        {
            $addFields: {
                owner: {
                    $first: "$owner"
                },
                likesCount : {
                    $size : "$likes"
                },
                isLiked: {
                    $in: [
                        userId,
                        "$likes.likedBy"
                    ]
                },
                 isOwner: {
                    $eq: [
                        "$owner._id" ,
                        userId
                    ]
                }
            }
        },
        {
            $project: {
                _id: 1,
                content: 1,
                owner: 1,
                createdAt: 1,
                updatedAt: 1,
                likesCount: 1,
                isLiked: 1,
                isOwner: 1
            }
        }
    ]);

    return comment[0];
};

const getVideoComments = asynchandler(async (req, res) => {
    const { videoId } = req.params
    const { page = 1, limit = 10 } = req.query

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid Video ID")
    }

    const video = await Video.findById(videoId)

    if (!video) {
        throw new ApiError(404, "Video Not found")
    }

    if (!video.isPublished && req.user?._id?.toString() !== video.owner.toString()) {
        throw new ApiError(403, "Forbidden request")
    }

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
    }
    const aggregate = Comment.aggregate([
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            avatar: 1,
                            fullName: 1
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "comment",
                as: "likes"
            }
        },
        {
            $addFields: {
                owner: { $first: "$owner" },
                likesCount: {
                    $size : "$likes"
                }
            }
        },
        {
            $addFields :{
                isLiked: { 
                    $in: [req.user._id, "$likes.likedBy"] 
                },
                isOwner: {
                    $eq: ["$owner._id", req.user?._id]
                }
            }
        },
        {
            $project: {
                _id: 1,
                content: 1,
                owner: 1,
                createdAt: 1,
                updatedAt: 1,
                likesCount: 1,
                isLiked: 1,
                isOwner: 1
            }
        }
    ])

    const comments = await Comment.aggregatePaginate(aggregate, options)

    return res
        .status(200)
        .json(new ApiResponse(200, comments, "Comments for the video fetched successfully"))
})

const addComment = asynchandler(async(req,res)=>{
    //Step-1 : Getting the content,video & owner from the request
    const {videoId} =req.params
    const {content} =req.body
    
    //Step-2 : Validating the Video ID
    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid Video ID")
    }

    //Step-3 : Checking if the video exists?
    const video = await Video.findById(videoId)

    if(!video){
        throw new ApiError(404,"Video Not found")
    }

    //Step-4 : Checking if the video is not published 
    if(!video.isPublished){
        throw new ApiError(403,"Forbidden request")
    }

    //Step-5 : Validating the comment content
    if(!content?.trim()){
        throw new ApiError(400,"Invalid Comment content")
    }

    //Step-6 : Creating the comment DB Object for the video
    const comment = await Comment.create({
        content : content,
        video : videoId,
        owner : req.user._id
    })
    //Step-7 : Fetching the comment details to send to the frontend
    const createdComment = await getCommentDetails(comment._id, req.user._id);


    return res
            .status(201)
            .json(
                new ApiResponse(201,createdComment,"Comment added successfully")
            )
})

const updateComment = asynchandler(async(req,res)=>{
    //Step-1 : Fetching the commentId & content
    const {commentId} = req.params
    const {newcontent} = req.body

    //Step-2 : Validating the comment ID
    if(!isValidObjectId(commentId)){
        throw new ApiError(400,"Invalid Comment ID")
    }

    //Step-3 : Checking if comments exists or not
    const comment = await Comment.findById(commentId)

    if(!comment){
        throw new ApiError(404,"Comment not found")
    }

    //Step-4 : Checking the ownership of the comment
    if(req.user._id.toString() !== comment.owner.toString()){
        throw new ApiError(403,"Forbidden request")
    }

    //Step-5 : Validating the content of the comment
    if(!newcontent?.trim()){
        throw new ApiError(400,"Invalid content of the comment")
    }

    //Step-6 : Updating the content of the comment
    comment.content = newcontent
    
    //Step-7 : Saving in the Database
    const updatedComment = await comment.save()

    const commentDetails = await getCommentDetails(updatedComment._id, req.user._id);

    return res
            .status(200)
            .json(
                new ApiResponse(200,commentDetails,"Comment Updated successfully")
            )
})

const deleteComment = asynchandler(async(req,res)=>{
    //Step-1 : Getting the comment Id
    const {commentId} = req.params

    //Step-2 : Validating the comment ID
    if(!isValidObjectId(commentId)){
        throw new ApiError(400,"Invalid Comment ID")
    }

    //Step-3 : Checking if comments exists or not
    const comment = await Comment.findById(commentId)

    if(!comment){
        throw new ApiError(404,"Comment not found")
    }

    //Step-4 : Checking the ownership of the comment
    if(req.user._id.toString() !== comment.owner.toString()){
        throw new ApiError(403,"Forbidden request")
    }

    //Step-5 : Deleting directly the comment from the DB as no files linked
    await comment.deleteOne()

    return res
            .status(200)
            .json(
                new ApiResponse(200,{},"Comment deleted successfully")
            )
})

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}