import { isValidObjectId }  from "mongoose";
import { Playlist } from "../models/playlist.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asynchandler from "../utils/AsyncHandler.js";
import { User } from "../models/user.models.js";
import mongoose from "mongoose";
import {Video} from "../models/videos.models.js"

const createPlaylist = asynchandler(async(req,res)=>{
    const {name, description} =req.body

    //Step-1 : Extracting the trimmed fields 
    const trimmedName = name?.trim()
    const trimmedDescription = description?.trim() || ""

    //Step-2 : Checking if the name exists
    if(!trimmedName){
        throw new ApiError(400,"Playlist name is required")
    }

    //Step-3 : Checking the length 
    if(trimmedName.length>100){
        throw new ApiError(400,"Playlist name cannot exceed 100 characters")
    }

    //Step-4 : Checking the description length
    if(trimmedDescription.length>500){
        throw new ApiError(400,"Playlist description cannot exceed 500 characters")
    }

    //Step-5 : Checking if the playlist with same name already exist
    const isPlaylistExist = await Playlist.findOne({
        name : trimmedName,
        owner : req.user._id
    })
    
    if(isPlaylistExist){
        throw new ApiError(409,"Playlist with same name already exists")
    }

    const playlist = await Playlist.create({
        name : trimmedName,
        description : trimmedDescription,
        owner : req.user._id,
    })

    
    //Reponse
    return res
            .status(201)
            .json(
                new ApiResponse(201,playlist,"Playlist created successfully")
            )
    
})

const getUserPlaylists = asynchandler(async(req,res)=>{
    const {userId} =req.params
    const {page =1, limit = 10} = req.query

    //Step-1 : Validating the userId
    const trimmedUserId = userId.trim()

    if(!isValidObjectId(trimmedUserId)){
        throw new ApiError(400,"Invalid User ID")
    }

    //Step-2 : Checking if user exists
    //Getting only the ID
    const user = await User.findById(trimmedUserId)
                            .select("_id")
                            .lean()

    if(!user){
        throw new ApiError(404,"User does not exists")
    }

    //Step-3 : Fetching the Playlists
    const filter = {
        owner : new mongoose.Types.ObjectId(trimmedUserId)
    }
    //Adding the not public videos for the owner only
    if(req.user._id.toString() !== trimmedUserId.toString()){    
        filter.isPublic = true
    }

    const aggregate = Playlist.aggregate([
        {
            $match : filter
        },
        {
            $sort : {
                createdAt : -1
            }
        },
        {
            $addFields : {
                firstVideo : {
                    $arrayElemAt : ["$videos",0]
                }
            }
        },
        {
            $lookup :{
                from : "videos",
                localField : "firstVideo",
                foreignField : "_id",
                as : "thumbnailVideo",
                pipeline : [
                    {
                        $match : {
                            isPublished :  true
                        }
                    },
                    {
                        $project :{
                            thumbnail : 1,
                            _id : 0
                        }
                    }
                ]
            }
        },
        {
            $addFields : {
                thumbnail : {
                    $first : "$thumbnailVideo.thumbnail"
                },
                totalVideos : {
                    $size : "$videos"
                }
            }
        },
        {
            $project : {
                name : 1,
                description : 1,
                isPublic : 1,
                totalVideos : 1,
                thumbnail : 1,
                updatedAt : 1
            }
        }
    ])


    const pageNumber = Math.max(1, parseInt(page))
    const limitNumber = Math.min(50, Math.max(1, parseInt(limit)))

    const options ={
        page :pageNumber,
        limit : limitNumber
    }

    const playlists = await Playlist.aggregatePaginate(aggregate,options)
    return res
            .status(200)
            .json(
                new ApiResponse(200,playlists,"Fetched the users successfully")
            )
})

const getPlaylistById = asynchandler(async(req,res)=>{
    const {playlistId} = req.params

    //Step-1 : Validating the Object ID
    if(!isValidObjectId(playlistId)){
        throw new ApiError(400,"Invalid playlist ID")
    }

    //Step-2 : Checking if the Playlist exists
    const playlist = await Playlist.findById(playlistId)

    if(!playlist){
        throw new ApiError(404,"Playlist does not exists")
    }

    //Step-3 : Checking the ownership of the playlist
    if(!playlist.isPublic && req.user._id.toString() !== playlist.owner.toString()){
        throw new ApiError(403,"Forbidden request")
    }

    //Step-4 : Fetching the videos preview of the playlist
    const playlistDetails = Playlist.aggregate([
    {
        $match: {
            _id: new mongoose.Types.ObjectId(playlistId)
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "ownerDetails",
            pipeline: [
                {
                    $project: {
                        fullName: 1,
                        username: 1,
                        avatar: 1,
                        _id: 1
                    }
                }
            ]
        }
    },
    {
        $lookup: {
            from: "videos",

            let: {
                playlistVideos: "$videos"
            },

            pipeline: [
                {
                    $match: {
                        $expr: {
                            $in: ["$_id", "$$playlistVideos"]
                        },
                        isPublished: true
                    }
                },

                //Preserving playlist order
                {
                    $addFields: {
                        playlistOrder: {
                            $indexOfArray: [
                                "$$playlistVideos",
                                "$_id"
                            ]
                        }
                    }
                },

                {
                    $sort: {
                        playlistOrder: 1
                    }
                },

                {
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "videoOwnerDetails",
                        pipeline: [
                            {
                                $project: {
                                    fullName: 1,
                                    username: 1,
                                    avatar: 1,
                                    _id: 1
                                }
                            }
                        ]
                    }
                },
                {
                    $addFields: {
                        videoOwner: {
                            $first: "$videoOwnerDetails"
                        }
                    }
                },
                {
                    $project: {
                        title: 1,
                        thumbnail: 1,
                        duration: 1,
                        views: 1,
                        createdAt: 1,
                        videoOwner: 1,
                        _id: 1
                    }
                }
            ],

            as: "videos"
        }
    },
    {
        $addFields: {
            owner: {
                $first: "$ownerDetails"
            },
            totalVideos: {
                $size: "$videos"
            }
        }
    },
    {
        $project: {
            name: 1,
            description: 1,
            totalVideos: 1,
            isPublic: 1,
            createdAt: 1,
            updatedAt: 1,
            owner: 1,
            videos: 1
        }
    }
])

    return res
        .status(200)
        .json(
            new ApiResponse(200,playlistDetails,"Fetched the playlist details successfully")
        )
})

const addVideoToPlaylist = asynchandler(async(req,res)=>{
    const {playlistId,videoId} = req.params

    //Step-1 : Validating the Object IDs
    if(!isValidObjectId(playlistId)){
        throw new ApiError(400,"Invalid playlist ID")
    }

    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid video ID")
    }

    //Step-2 : Checking the ownership & exisitence of the video
    const video = await Video.findById(videoId)
                                .select("_id isPublished owner")
                                .lean()
                            
    if(!video){
        throw new ApiError(404,"Video does not exist")
    }

    if(!video.isPublished && req.user._id.toString() !== video.owner.toString()){
        throw new ApiError(403,"Forbidden request for the video")
    }

    //Step-3 : Checking if the Playlist exists
    const playlist = await Playlist.findById(playlistId)
                                    .select("_id owner")
                                    .lean()
                                    
    if(!playlist){
        throw new ApiError(404,"Playlist does not exist")
    }

    //Step-4 : Checking the ownership of the playlist
    if(req.user._id.toString() !== playlist.owner.toString()){
        throw new ApiError(403,"Forbidden request for the playlist")
    }

   //Step-5 : Adding the video atomically
    const updatedPlaylist = await Playlist.updateOne(
        {
            _id: playlistId,
            videos: {
                $ne: videoId
            }
        },
        {
            $addToSet: {
                videos: videoId
            }
        }
    )

    //Step-6 : Checking duplicate insertion
    if (updatedPlaylist.modifiedCount === 0) {
        throw new ApiError(409, "Video already exists in the playlist")
    }

    //Response
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    playlistId,
                    videoId
                },
                "Video added to the playlist successfully"
            )
        )
})

const removeVideoFromPlaylist = asynchandler(async(req,res)=>{
    const {playlistId,videoId} = req.params

    //Step-1 : Validating the Object IDs
    if(!isValidObjectId(playlistId)){
        throw new ApiError(400,"Invalid playlist ID")
    }

    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid video ID")
    }

    //Step-2 : Checking the ownership & exisitence of the video
    const video = await Video.findById(videoId)
                                .select("_id isPublished owner")
                                .lean()
                            
    if(!video){
        throw new ApiError(404,"Video does not exist")
    }

    if(!video.isPublished && req.user._id.toString() !== video.owner.toString()){
        throw new ApiError(403,"Forbidden request for the video")
    }

    //Step-3 : Checking if the Playlist exists
    const playlist = await Playlist.findById(playlistId)
                                    .select("_id owner")
                                    .lean()
                                    
    if(!playlist){
        throw new ApiError(404,"Playlist does not exist")
    }

    //Step-4 : Checking the ownership of the playlist
    if(req.user._id.toString() !== playlist.owner.toString()){
        throw new ApiError(403,"Forbidden request for the playlist")
    }

    //Step-5 : Removing the video atomically
    const updatedPlaylist = await Playlist.updateOne(
        {
            _id: playlistId,
            videos: videoId
        },
        {
            $pull: {
                videos: videoId
            }
        }
    )
    //Step-6 : Checking if the video was part of the playlist
    if (updatedPlaylist.modifiedCount === 0) {
        throw new ApiError(404, "Video not found in the playlist")
    }

    //Response
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    playlistId,
                    videoId
                },
                "Video removed from the playlist successfully"
            )
        )
})

const deletePlaylist = asynchandler(async(req,res)=>{
    const {playlistId} = req.params 
    
    //Step-1 : Validating the Object ID
    if(!isValidObjectId(playlistId)){
        throw new ApiError(400,"Invalid playlist ID")
    }

    //Step-2 : Checking if the Playlist exists
    const playlist = await Playlist.findById(playlistId)
                                    .select("_id owner")
                                    .lean()

    if(!playlist){
        throw new ApiError(404,"Playlist does not exist")
    }

    //Step-3 : Checking the ownership of the playlist
    if(req.user._id.toString() !== playlist.owner.toString()){
        throw new ApiError(403,"Forbidden request for the playlist")
    }

    //Step-4 : Deleting the playlist
    await Playlist.findByIdAndDelete(playlistId)

    //Response
    return res
            .status(200)
            .json(
                new ApiResponse(200,{},"Playlist deleted successfully")
            )
})

const updatePlaylist = asynchandler(async (req, res) => {
    const { playlistId } = req.params
    const { name, description, isPublic } = req.body

    //Step-1 : Validating the Object ID
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist ID")
    }

    //Step-2 : Checking if the playlist exists
    const playlist = await Playlist.findById(playlistId)
        .select("_id owner")
        .lean()

    if (!playlist) {
        throw new ApiError(404, "Playlist does not exist")
    }

    //Step-3 : Checking playlist ownership
    if (req.user._id.toString() !== playlist.owner.toString()) {
        throw new ApiError(403, "Forbidden request for the playlist")
    }

    //Step-4 : Building dynamic update object
    const updateFields = {}

    //Updating name
    if (name !== undefined) {
        const trimmedName = name.trim()

        if (!trimmedName) {
            throw new ApiError(400, "Playlist name cannot be empty")
        }

        if (trimmedName.length > 100) {
            throw new ApiError(
                400,
                "Playlist name cannot exceed 100 characters"
            )
        }

        updateFields.name = trimmedName
    }

    //Updating description
    if (description !== undefined) {
        const trimmedDescription = description.trim()

        if (trimmedDescription.length > 500) {
            throw new ApiError(
                400,
                "Playlist description cannot exceed 500 characters"
            )
        }

        updateFields.description = trimmedDescription
    }

    //Updating visibility
    if (isPublic !== undefined) {
        if (typeof isPublic !== "boolean") {
            throw new ApiError(400, "isPublic must be a boolean value")
        }

        updateFields.isPublic = isPublic
    }

    //Step-5 : Checking if any field is provided
    if (Object.keys(updateFields).length === 0) {
        throw new ApiError(400, "No fields provided for update")
    }

    //Step-6 : Updating the playlist
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $set: updateFields
        },
        {
            new: true,
            runValidators: true
        }
    )

    //Response
    return res
            .status(200)
            .json(
        new ApiResponse(200,updatedPlaylist,"Playlist updated successfully")
        )
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}