import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import asynchandler from "../utils/AsyncHandler.js"
import jwt from "jsonwebtoken"
export const verifyJWT = asynchandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        // console.log(token)
        if (!token) {
            throw new ApiError(401, "Unauthorised Request")
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // console.log(decoded);
        const user = await User.findById(decoded?.id).select("-password -refreshToken")
        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }
})
