import { User } from "../models/user.models.js";
import { ApiError } from "../utlis/ApiError.js";
import jwt from "jsonwebtoken"
export const verifyJWT = async(req,res,next)=>{
        try {
            const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","") 
            
            if(!token){
            throw new ApiError(401,"Unauthorised Request") 
            }

            const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

            const user = await User.findById(decoded?._id).select("-password -refreshToken")
            if(!user){
                throw new ApiError(401,"Invalid Access Token")
            }
            req.user =  user
            next()
        } catch (error) {
            throw new ApiError(401,error.message || "Invalid Access Token")
        }   
}
