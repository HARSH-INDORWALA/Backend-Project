import { isValidObjectId } from "mongoose";
import asynchandler from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Subscription } from "../models/subscription.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import mongoose from "mongoose";


const toggleSubscription = asynchandler(async(req,res)=>{
    const {channelId} = req.params

    //Step-1 : Validating the channelID
    if(!isValidObjectId(channelId)){
        throw new ApiError(400,"Invalid Channel ID")    
    }

    //Step-2 : Checking if channel exists
    const channel = await User.findById(channelId)

    if(!channel){
        throw new ApiError(404,"Channel not found")
    }

    //Step-3 :Checking user and channel owner same
    if(req.user?._id.toString() === channelId){
        throw new ApiError(400,"You cannot subscribe to your own channel")
    }

    //Step-4 : Checking whether channel subscribed or not
    const existingsubscription = await Subscription.findOne({
        subscriber : req.user?._id,
        channel : channelId
    })

    //Step-5 : if Subscribed then deleting the db document
    let message = ""
    let subscribed =false 

    if(existingsubscription){
       await  Subscription.deleteOne({
            subscriber: req.user._id,
            channel: channelId
       })
        message = "Channel Unsubscribed successfully"
        subscribed = false
    }
    else {
        await Subscription.create({
            subscriber : req.user._id,
            channel : channelId
        })
        message = "Channel Subscribed successfully"
        subscribed = true
    }
    
    return res
            .status(200)
            .json(
                new ApiResponse(200,{subscribed},message)
            )
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asynchandler(async(req,res)=>{
    const { subscriberId } = req.params

    //Step-1 : Validating the SubscriberId
    if(!isValidObjectId(subscriberId)){
        throw new ApiError(400,"Invalid Subscriber ID")
    }

    //Step-2 : Checking if the user.exists
    const subscriber = await User.findById(subscriberId)

    if(!subscriber){
        throw new ApiError(404,"Invalid Subscriber")
    }
    

    //Step-3 : Aggregation Pipeline :
    const aggregate = Subscription.aggregate([
    {
        $match : {
            subscriber : new mongoose.Types.ObjectId(subscriberId)
        }
    },
    {
        $sort : {
            createdAt : -1
        }
    },
    {
        $lookup : {
            from : "users",
            localField : "channel",
            foreignField : "_id",
            as : "channel",
            pipeline : [
                {
                    $lookup : {
                        from : "subscriptions",
                        localField : "_id",
                        foreignField : "channel",
                        as : "subscribers"
                    }
                },
                {
                    $addFields : {
                        subscribersCount : {
                            $size : "$subscribers"
                        }
                    }
                },
                {
                    $project : {
                        username : 1,
                        avatar : 1,
                        fullName : 1,
                        subscribersCount : 1
                    }
                }
            ]
        }
    },
    {
        $addFields : {
            channel : {
                $first : "$channel"
            }
        }
    },
    {
        $replaceRoot : {
            newRoot : "$channel"
        }
    }   
])

    const  {page =1, limit = 10} = req.query

    const pageNumber = Math.max(1, parseInt(page))
    const limitNumber = Math.min(50, Math.max(1, parseInt(limit)))

    const options ={
        page :pageNumber,
        limit : limitNumber
    }

    const subscribedChannels = await Subscription.aggregatePaginate(aggregate,options)

    return res
            .status(200)
            .json(
                new ApiResponse(200,subscribedChannels,"Fetched all the subscribed channels")
            )
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asynchandler(async(req,res)=>{
    const { channelId } = req.params

    //Step-1 : Validating the channelId
    if(!isValidObjectId(channelId)){
        throw new ApiError(400,"Invalid Channel ID")
    }

    //Step-2 : Checking if the channel exists
    const channel = await User.findById(channelId)

    if(!channel){
        throw new ApiError(404,"Channel not found")
    }

    //Step-3 : Aggregation Pipeline :
    const aggregate = Subscription.aggregate([
        {
            $match : {
                channel : new mongoose.Types.ObjectId(channelId)
            }
        },
        {
            $sort : {   
                createdAt : -1
            }
        },
        {   
            $lookup : {
                from : "users",
                localField : "subscriber",
                foreignField : "_id",
                as : "subscriber",
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
        {
            $addFields : {
                subscriber : {
                    $first : "$subscriber"
                },
                subscribedAt : "$createdAt"
            }
        },
        {
            $replaceRoot : {
                newRoot : {
                    $mergeObjects : [
                        "$subscriber",
                        {
                            subscribedAt : "$subscribedAt"
                        }
            ]
                }
            }
        }
])

    const  {page =1, limit = 10} = req.query

    const pageNumber = Math.max(1, parseInt(page))
    const limitNumber = Math.min(50, Math.max(1, parseInt(limit)))

    const options ={
        page :pageNumber,
        limit : limitNumber
    }

    const subscribersList = await Subscription.aggregatePaginate(aggregate,options)

    return res
            .status(200)
            .json(
                new ApiResponse(200,subscribersList,"Fetched subscribers list successfully")
            )

})

export {
    toggleSubscription,
    getSubscribedChannels,
    getUserChannelSubscribers
}