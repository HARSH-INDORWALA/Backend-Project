import { ApiError } from "../utlis/ApiError";
import asynchandler from "../utlis/AsyncHandler";
import { deleteFromCloudinary, uploadToCloudinary } from "../utlis/cloudinary";
import { Video } from "../models/videos.models";
import { ApiResponse } from "../utlis/ApiResponse";
import { isValidObjectId } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const uploadAVideo = asynchandler(async(req,res)=>{
    //Step-1 : Getting the data from the frontend
    const {title,description} = req.body

    //Step-2 : Validate the datas
    if(!title?.trim()  || !description?.trim()){
        throw new ApiError(400,"Fields not found")
    }

    //Step-3 : Getting the Video & Thumnbail files from the request files
    let videoPath;
    if(req.files && Array.isArray(req.files.videoFile) && req.files.videoFile.length>0){
        videoPath=req.files.videoFile[0].path
    }

    let thumbnailPath;
    if(req.files && Array.isArray(req.files.thumbnail) && req.files.thumbnail.length>0){
        thumbnailPath=req.files.thumbnail[0].path
    }

    if(!videoPath){
        throw new ApiError(400,"Video File is required")
    }

    if(!thumbnailPath){
        throw new ApiError(400,"Thumbnail is required")
     }
    //Step-4 : Uploading the files to the cloudinary
    const videofile = await uploadToCloudinary(videoPath)
    const thumbnail = await uploadToCloudinary(thumbnailPath)

    if(!videofile){
        throw new ApiError(400,"Video File is required")
    }

    if(!thumbnail){
        throw new ApiError(400,"Thumbnail is required")
    }

    // //Getting the user
    // const user = await User.FindById(req.user?._id)

    //Step-5 : Saving the video details to the database
    const video = await Video.create({
        title,
        description,
        videoFile : videofile.url,
        thumbnail : thumbnail.url,
        owner : req.user._id,
        duration : videofile.duration
    })

    if(!video){
        throw new ApiError(500,"Something went wrong while Uploading the video")
    }

    return res.status(201).json(
        new ApiResponse(200,video,"Video Uploaded Succesfully")
    )
})

const getAllVideos = asynchandler(async(req,res)=>{
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query

    //Step- 1 : Doing the numeric conversions and setting the limits
    const pageNumber = Math.max(1,parseInt(page))
    const limitNumber = Math.min(50,Math.max(1,parseInt(limit)))

    //Step-2 : Creating the sorting and the pagination values
    const sortOrder = sortType === "asc" ? 1 : -1
    
    //Step-3 : Fetching the videos from the database with thw queries

    //Dynamic Filter Object for the search
    const filter ={
        isPublished : true,
    }
    

    if(query?.trim()){
        filter.$or = [
            {
                title : {
                    $regex : query,
                    $options :"i"
                }
            },
            {
                description : {
                    $regex : query,
                    $options :"i"
                }
            }
        ]
    }
    //Step-4 : UserId Videos only to show Validation
    if(userId && !isValidObjectId(userId?.trim())){
        throw new ApiError(400,"Invalid UserId")
    }

    //Adding the userId videos only
    if(userId?.trim()){
        filter.owner = new mongoose.Types.ObjectId(userId)
    }

    //Step- 5: Finding all the videos 
    const aggregate =  Video.aggregate([
        {
            $match : filter
        },
        {
            $sort : {
                [sortBy || "createdAt"] : sortOrder
            }
        },
        {
            $lookup : {
                from : "users",
                localField : "owner",
                foreignField : "_id",
                as : "owner",
                pipeline : [
                    {
                        $project : {
                            username  : 1,
                            fullName : 1,
                            avatar : 1
                        }
                    }
                ]
            }
        },
        {
            $addFields : {
                owner : {
                    $first : "$owner"
                }
            }
        },
        {
            $project : {
                owner : 1,
                videoFile : 1,
                thumbnail : 1,
                title : 1,
                description : 1,
                duration : 1,
                views : 1,
                isPublished : 1,
                createdAt : 1,
            }
        }
    ])

    const options = {
        page : pageNumber,
        limit : limitNumber
    }
    const videos =await  Video.aggregatePaginate(aggregate,options)
    //Reponse 
    return res
    .status(200)
    .json(
        new ApiResponse(200,
            videos
        ,"Videos fetched successfully")
    )
})

const getVideoById = asynchandler(async(req,res)=>{
    const {videoId} = req.params

    //Step-1 : Validating the VideoId
    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid video id")
    }
    
    //Step-2 : Finding The Video and checking if exists
    const video = await Video.findById(videoId)

    if(!video){
        throw new ApiError(404,"Video not found")
    }

    //Step-3 : Checking the videos is published or not and also the onwer
    if(!video.isPublished && video.owner.toString()!==req.user?._id.toString()){
        throw new ApiError(403,"Forbidden request")
    }

    //Step-4 : Aggregating the owner details
    const newvideo = await Video.aggregate([
    
    //Step-i : Matching the requested video
    {
        $match : {
            _id : new mongoose.Types.ObjectId(videoId)
        }
    },

    //Step-ii : Fetching owner details
    {
        $lookup : {
            from : "users",
            localField : "owner",
            foreignField : "_id",
            as : "owner",
            pipeline : [
                {
                    $project : {
                        username : 1,
                        fullName : 1,
                        avatar : 1
                    }
                }
            ]
        }
    },

    //Step-iii : Fetching subscribers of the channel(owner)
    {
        $lookup : {
            from : "subscriptions",
            localField : "owner._id",
            foreignField : "channel",
            as : "subscribers"
        }
    },

    //Step-iv : Fetching all comments of the video
    {
        $lookup : {
            from : "comments",
            localField : "_id",
            foreignField : "video",
            as : "comments"
        }
    },

    //Step-v : Adding computed fields
    {
        $addFields : {

            //Converting owner array into object
            owner : {
                $first : "$owner"
            },

            //Total subscribers count
            subscribersCount : {
                $size : "$subscribers"
            },

            //Total comments count
            commentsCount : {
                $size : "$comments"
            },

            //Checking if current user subscribed to owner/channel
            isSubscribed : {
                $cond : {
                    if : {
                        $in : [
                            req.user?._id,
                            "$subscribers.subscriber"
                        ]
                    },
                    then : true,
                    else : false
                }
            }
        }
    },

    //Step-vi : Final response shaping
    {
        $project : {
            videoFile : 1,
            thumbnail : 1,
            title : 1,
            description : 1,
            duration : 1,
            views : 1,
            isPublished : 1,
            createdAt : 1,
            owner : 1,
            subscribersCount : 1,
            commentsCount : 1,
            isSubscribed : 1
        }
    }
])

    return res.status(200)
    .json(
        new ApiResponse(200,newvideo[0],"Video fetched successfully")
    )
})

const updateVideo = asynchandler(async(req,res)=>{
    const  {videoId} = req.params
    
    //Step-1 : Validating the Input VideoId
    if(!isValidObjectId(videoId?.trim())){
        throw new ApiError(400,"Invalid Video ID")
    }

    //Step-2 : Finding the video
    const video = await Video.findById(videoId)

    if(!video){
        throw new ApiError(404,"Video not found")
    }

    //Step-3 : Checking if user and owner are same
    if(req.user._id.toString() !== video.owner.toString()){
        throw new ApiError(403,"Forbidden Request")
    }

    //Step-4 : Getting the new details which is to be updated 
     const {title,description} = req.body

     if(!title?.trim() && !description?.trim()){
        throw new ApiError(400,"Some details are required")
     }

     //Step-5 : Updating the basic details like title & description 
     if(title?.trim()){
        video.title =  title
     }

     if(description?.trim()){
        video.description = description
     }
     
     //Step-6 : Checking for new thumbnail

    let thumbnailPath

    if (req.files && Array.isArray(req.files.thumbnail) &&req.files.thumbnail.length > 0) {
        thumbnailPath = req.files.thumbnail[0].path
    }

    if (thumbnailPath) {

        const newThumbnail = await uploadToCloudinary(thumbnailPath)

        if (!newThumbnail) {
            throw new ApiError(500, "Error uploading thumbnail")
        }

        const oldThumbnail = video.thumbnail

        video.thumbnail = newThumbnail.url

        await deleteFromCloudinary(oldThumbnail)
    }

    const updatedVideo = await video.save()
     return res
     .status(200)
     .json(
        new ApiResponse(200,{updatedVideo},"Video details updated successfully")
     )
})

const deleteVideo = asynchandler(async(req,res)=>{
    const {videoId} = req.params

    //Step-1 : Validating the VideoId
    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid Video ID")
    }

    //Step-2 :Checking if video exists
    const video = await Video.findById(videoId)

    if(!video){
        throw new ApiError(404,"Video not found")
    }

    //Step-3 :Checking ownership
    if(req.user._id.toString() !== video.owner.toString()){
        throw new ApiError(403,"Forbidden request")
    }


    //Step-4 : Deleting the files from the cloudinary 
    await deleteFromCloudinary(video.videoFile)
    await deleteFromCloudinary(video.thumbnail)

    //Step-5 : Deleting the object from the Database
    await video.deleteOne()

    //Response 
    return res
            .staus(201)
            .json(
                new ApiResponse(200,{},"Video deleted Successfully")
            )
})

const togglePublishStatus = asynchandler(async(req,res)=>{
    const {videoId} = req.params

    //Step-1 : Validating the VideoId
    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid Video ID")
    }

    //Step-2 :  Checking if video exists
    const video = await Video.findById(videoId)

    if(!video){
        throw new ApiError(404,"Video not found")
    }

    //Step-3 :  Checking ownership
    if(req.user._id.toString() !== video.owner.toString()){
        throw new ApiError(403,"Forbidden request")
    }

    //Step-4 : Changing the status 
    video.isPublished = !video.isPublished
    const updatedVideo = await video.save()
    
    //Reponse 
    return res
            .status(200)
            .json(
                new ApiResponse(200,{updatedVideo},"Video Published Status Switched")
            )
})

export {
    uploadAVideo,
    getAllVideos,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}