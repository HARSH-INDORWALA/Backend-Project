import mongoose, { isValidObjectId } from "mongoose";
import asynchandler from "../utlis/AsyncHandler";
import { ApiError } from "../utlis/ApiError";
import { Video } from "../models/videos.models";
import { Comment } from "../models/comment.models";
import { ApiResponse } from "../utlis/ApiResponse";

const getVideoComments = asynchandler(async(req,res)=>{
    
    //Step-1 : Getting the content,video & owner from the request
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
    
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
    if(!video.isPublished &&    req.user?._id?.toString() !== video.owner.toString()){
        throw new ApiError(403,"Forbidden request")
    }

    //Step- 5: Parse Pagination 
    
    //Dynamic Object options
    const options = {
        page : page,
        limit : limit,
    }

    const aggregate = Comment.aggregate([
    //Step-i : Matching with the video for which want the comments
    {   
        $match : {
            video : new mongoose.Types.ObjectId(videoId)
        }
    },
    //Step-ii : Sorting according to the descending of the time created
    {
        $sort :{
            createdAt : -1
        }
    },
    //Step-iii : Fetching the users data for the comment
    {
        $lookup : {
            from : "users",
            localField : "owner",
            foreignField : "_id",
            as : "owner",
            pipeline : [
                {
                    $project : {    //Passing only required info rather than all 
                        username : 1,
                        avatar : 1,
                        fullName :  1
                    }
                }
            ]
        }

    },
    //Step-iv :Converting owner array into object
    {
        $addFields :{
            owner : {
                $first : "$owner"
            }
        }
    },
    //Step-v : Shaping the final fields to be send to frontend
    {
        $project : {
            content : 1, 
            owner : 1,
            createdAt : 1,
            updatedAt : 1

        }
    }
    ])

    //Step-6 : Pagination using mongoose pagainate function 
    const comments = await Comment.aggregatePaginate(aggregate,options)

    return res 
            .status(200)
            .json(
                new ApiResponse(200,comments,"Comments for the videos fetched successfully")
            )
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

    return res
            .status(201)
            .json(
                new ApiResponse(201,comment,"Comment added successfully")
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

    return res
            .status(200)
            .json(
                new ApiResponse(200,updatedComment,"Comment Updated successfully")
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