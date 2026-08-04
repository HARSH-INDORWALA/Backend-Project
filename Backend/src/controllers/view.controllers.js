import asynchandler from "../utils/AsyncHandler.js";
import mongoose from "mongoose";
import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Video } from "../models/videos.models.js";
import { View } from "../models/view.models.js";
import { User } from "../models/user.models.js"
const incrementView = asynchandler(async (req, res) => {
    const { videoId } = req.params;

    // Step-1 : Validate Video ID
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    // Step-2 : Check if video exists
    const video = await Video.findById(videoId)
        .select("owner views")
        .lean();

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    // Step-3 : Ignore owner's own views
    if (video.owner.toString() === req.user._id.toString()) {
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Owner view ignored"));
    }

    // Step-4 : Update watch history (always)
    await User.findByIdAndUpdate(req.user._id, {
        $pull: {
            watchHistory: {
                video: new mongoose.Types.ObjectId(videoId),
            },
        },
    });

    await User.findByIdAndUpdate(req.user._id, {
        $push: {
            watchHistory: {
                video: new mongoose.Types.ObjectId(videoId),
                watchedAt: new Date(),
            },
        },
    });

    // Step-5 : Check if view already counted in last 24 hours
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

    // Step-6 : Record view
    await View.create({
        video: videoId,
        viewer: req.user._id,
    });

    // Step-7 : Increment public view count
    await Video.findByIdAndUpdate(videoId, {
        $inc: {
            views: 1,
        },
    });

    return res.status(200).json(
        new ApiResponse(200, {}, "Video view counted successfully")
    );
});

export { incrementView };