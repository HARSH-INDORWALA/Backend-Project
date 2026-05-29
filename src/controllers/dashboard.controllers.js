import asynchandler from "../utlis/AsyncHandler.js";
import { Video } from "../models/videos.models.js";
import {Subscription} from "../models/subscription.models.js"
import mongoose from "mongoose";
import { ApiResponse } from "../utlis/ApiResponse.js";

const getChannelStats = asynchandler(async(req,res)=>{
    
    //Step-1 : Fetching all the videos of the channel
    const videos = await Video.aggregate([
        {
            $match :{
                owner : new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "likes",

                let: {
                    videoId: "$_id"
                },

                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$video", "$$videoId"]
                            }
                        }
                    },
                    {
                        $count: "totalLikes"
                    }
                ],

                as: "likes"
            }
        },
        {
            $addFields : {
                totalLikes : {
                    $cond : {
                        if : {$gt : [{$size : "$likes"},0]},
                        then : {$first : "$likes.totalLikes"},
                        else : 0
                    }
                }
            }
        },
        {
            $group : {
                _id : null,
                totalViews : {
                    $sum : "$views"
                },
                totalVideos : {
                    $sum : 1
                },
                totalLikes : {
                    $sum : "$totalLikes"
                }
            }
        }
    ])

    const subscriberCount = await Subscription.aggregate([
        {
            $match : {
                channel : new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $count : "totalSubscribers"
        }
    ])

    return res
            .status(200)
            .json(
                new ApiResponse(200,
                    {
                        totalviews : videos[0]?.totalViews || 0,
                        totalVideos : videos[0]?.totalVideos || 0,
                        totalLikes : videos[0]?.totalLikes || 0,
                        totalSubscribers : subscriberCount[0]?.totalSubscribers || 0
                    },
                    "Fetched channel stats successfully"
                )
            )
})

const getChannelVideos = asynchandler (async(req,res)=>{

    //Step-1 : Extracting pagination parameters
    const { page = 1, limit = 10, sort ,sortBy = "createdAt" ,sortType = "desc"} = req.query

    //Step-2 : Sanitizing pagination values
    const pageNumber = Math.max(1, parseInt(page))
    const limitNumber = Math.min(50, Math.max(1, parseInt(limit)))

    //Step-3 : Pagination options
    const options = {
        page: pageNumber,
        limit: limitNumber
    }

    //Step-4 : Sort condition
    let sortOptions = {}
    
    if(sort){

        switch(sort){

            case "latest":
                sortOptions = { createdAt: -1 }
                break

            case "oldest":
                sortOptions = { createdAt: 1 }
                break

            case "mostViewed":
                sortOptions = { views: -1 }
                break

            case "mostLiked":
                sortOptions = { totalLikes: -1 }
                break

            case "mostCommented":
                sortOptions = { totalComments: -1 }
                break

            default:
                sortOptions = { createdAt: -1 }
        }
    }
    else {
            sortOptions[sortBy] = sortType === "asc" ? 1 : -1

    }
    //Step-5 : Aggregation pipeline to fetch channel videos along with total likes and comments count
    const aggregate =  Video.aggregate([
        {
            $match : {
                owner  :  new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup :{
                from : "likes",

                let : {
                    videoId : "$_id"
                },

                pipeline : [
                    {
                        $match : {
                            $expr : {
                                $eq : ["$video","$$videoId"]
                            }
                        }
                    },
                    {
                        $count : "totalLikes"
                    }
                ],

                as : "likes"
            }
        },
        {
            $lookup :{
                from : "comments",

                let : {
                    videoId : "$_id"
                },

                pipeline : [
                    {
                        $match : {
                            $expr : {
                                $eq : ["$video","$$videoId"]
                            }
                        }
                    },
                    {
                        $count : "totalComments"
                    }
                ],

                as : "comments"
            }
        },
        {
            $addFields : {
                totalLikes :{
                    $ifNull : [{$first : "$likes.totalLikes"},0]
                },
                totalComments : {
                   $ifNull : [ {$first : "$comments.totalComments"},0]
                }
            }
        },
        {
            $sort : sortOptions
        },
        {
            $project : {
                _id : 1,
                thumbnail : 1,
                title : 1,
                views : 1,
                duration : 1,
                isPublished : 1,
                totalLikes : 1,
                totalComments : 1,
                createdAt  : 1
            }
        }
    ])

    //Step-6 : Pagination 
    const videos = await Video.aggregatePaginate(aggregate,options)

    return res
            .status(200)
            .json(
                new ApiResponse(200,videos,"Fetched channel videos successfully")
            )
})

export {
    getChannelStats,
    getChannelVideos
}