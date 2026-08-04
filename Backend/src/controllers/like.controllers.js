import mongoose, { isValidObjectId} from "mongoose";
import asynchandler from "../utils/AsyncHandler.js";
import { Video } from "../models/videos.models.js";
import { Like } from "../models/like.models.js";
import { Comment } from "../models/comment.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const toggleVideoLike = asynchandler(async(req,res)=>{
    const {videoId} = req.params

    //Step-1 : Validating the Input VideoId
    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid Video ID")
    }

    //Step-2 : Finding the video
    const video = await Video.findById(videoId)

    if(!video){
        throw new ApiError(404,"Video not found")
    }

    //Step-3 : Checking if the video is not published
    if(!video.isPublished){
        throw new ApiError(403,"Forbidden request")
     }

    //Step-4 : Checking if already like or not
    let message = ""

    const isLiked = await Like.findOne(
            {
                likedBy : req.user?._id,
                video : videoId
            }
        
    )

    //Step- 5 : If liked then deleting the Like Object
    if(isLiked){
        await Like.deleteOne({
            video : videoId,
            likedBy : req.user._id
        })
        message = "Video unliked successfully"
    }

    //Step-6 : If not liked then creating the new Object
    else {
        await Like.create({
            video : videoId,
            likedBy : req.user._id
        }) 
        message = "Video liked successfully"
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,{},message)
            )
})

const toggleCommentLike = asynchandler(async(req,res)=>{
    const {commentId} = req.params

    //Step-1 : Validating the Input VideoId
    if(!isValidObjectId(commentId)){
        throw new ApiError(400,"Invalid Comment ID")
    }

    //Step-2 : Finding the video
    const comment = await Comment.findById(commentId)

    if(!comment){
        throw new ApiError(404,"Comment not found")
    }

    //Step-3 : Checking if already liked or not
    let message = ""

    const isLiked = await Like.findOne(
            {
                likedBy : req.user?._id,
                comment : commentId
            }
        
    )

    //Step- 4 : If liked then deleting the Like Object
    if(isLiked){
        await Like.deleteOne({
            comment : commentId,
            likedBy : req.user._id
        })
        message = "Comment UnLiked successfully"
    }

    //Step-5 : If not liked then creating the new Object
    else {
        await Like.create({
            comment : commentId,
            likedBy : req.user._id
        }) 
        message = "Comment liked successfully"
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,{},message)
            )
})

const getLikedVideos = asynchandler(async(req,res)=>{
    const  {page =1, limit = 10} = req.query

    const pageNumber = Math.max(1, parseInt(page))
    const limitNumber = Math.min(50, Math.max(1, parseInt(limit)))

    //Aggregation Pipeline for the liked videos
    const aggregate= Like.aggregate([
        //Step-i : Finding from all the liked videos in which user has liked
        {
            $match : {
                likedBy : new mongoose.Types.ObjectId(req.user._id),
                video : {$exists : true}
            }
        },
        {
            $sort : {
                createdAt : -1
            }
        },
        //Step-ii : Looking from the likedBy Getting the video
        {
            $lookup : {
                from : "videos",
                localField : "video",
                foreignField : "_id",
                as : "video",
                pipeline : [
                    {
                        $project : {
                            title :1,
                            thumbnail :1,
                            duration : 1,
                            views : 1,
                            owner : 1,
                            createdAt : 1
                        }
                    }
                ]
            }

        },
        {
            $unwind : "$video"
        },
        {
            $lookup : {
                from : "users",
                localField : "video.owner",
                foreignField : "_id",
                as : "owner",
                pipeline : [
                    {
                        $project : {
                            username : 1,
                            avatar : 1,
                            fullName : 1,
                        }
                    }
                ]
            }
        },
        {
            $addFields : {
                owner : {
                    $first : "$owner"
                },
            }
        },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [
                        "$video",
                        {
                            owner: "$owner",
                        },
                    ],
                },
            },
        },
        {
            $project : {
                title: 1,
                thumbnail: 1,
                duration: 1,
                views: 1,
                createdAt: 1,
                owner: 1
            }
        }

    ])
    
    const options ={
        page :pageNumber,
        limit : limitNumber
    }

    const likedvideos = await Like.aggregatePaginate(aggregate,options)
    
    return res
            .status(200)
            .json(
                new ApiResponse(200,likedvideos,"Fetched liked videos successfully")
            )
})

export {
    toggleVideoLike,
    toggleCommentLike,
    getLikedVideos
}