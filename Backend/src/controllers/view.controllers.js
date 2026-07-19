import asynchandler from "../utils/AsyncHandler.js";
import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Video } from "../models/videos.models.js";
import { View } from "../models/view.models.js";
const incrementView = asynchandler(async(req,res)=>{
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.findById(videoId)
                                .select("owner views")
                                .lean();

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (video.owner.toString() === req.user._id.toString()) {
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Owner view ignored"));
    }

    const yesterday = new Date();

    yesterday.setHours(yesterday.getHours() - 24);

    const alreadyViewed = await View.findOne({
        video: videoId,
        viewer: req.user._id,
        createdAt: {
            $gte: yesterday,
        },
    });

    if (alreadyViewed) {
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "View already counted"));
    }

    await View.create({
        video: videoId,
        viewer: req.user._id,
    });

    await Video.findByIdAndUpdate(videoId, {
        $inc: {
            views: 1,
        },
    });
    return res.status(200).json(
    new ApiResponse(200, {}, "Video view counted successfully"));
})

export {incrementView};