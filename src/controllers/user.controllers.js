import asynchandler from "../utlis/AsyncHandler.js"
import { ApiError } from "../utlis/ApiError.js"
import {ApiResponse} from "../utlis/ApiResponse.js"
import { uploadToCloudinary,deleteFromCloudinary } from "../utlis/cloudinary.js"
import {User} from "../models/user.models.js"

const generateAccessAndRefreshTokens =  async(userId)=>{
    try {
        const user =await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken =refreshToken
        user.save({ validateBeforeSave : false  })
        // console.log(accessToken,refreshToken);
        
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating access and refresh tokens")
    }
}

const registerUser = asynchandler ( async(req, res) => {
  // Step-1 : Getting all the data from the request body
    const {username,email,password,fullName} = req.body
    // console.log("Request body:", req.body);

    //Step-2 :Validating all the fields
    if(
        [username,email,fullName,password].some((field)=> (field?.trim ===""))
    )
    {
        throw new ApiError(400,"Field not found")
    }

    //Step-3 : Checking user exists or not
    const existeduser = await User.findOne(
        { $or : [{username},{email}]}
    )
    if(existeduser) {
        throw new ApiError(409,"User with email or username already exists")
    }
    // Step-4 : Checking for the files and ensuring avatar file is required 
    // console.log("req.files:", req.files);   

    //const avatarLocalPath= req.files?.avatar[0]?.path;
    //const coverImageLocalPath=req.files?.coverImage[0]?.path
    let avatarLocalPath;
    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length >0)
    {
        avatarLocalPath=req.files.avatar[0].path
    }
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length >0)
    {
        coverImageLocalPath=req.files.coverImage[0].path
    }

    if(!avatarLocalPath)
    {
        throw new ApiError(500,"Avatar file is required")
    }

    const avatar=await uploadToCloudinary(avatarLocalPath)
    const coverImage= await uploadToCloudinary(coverImageLocalPath)

    if(!avatar)
    {
        throw new ApiError(500,"Avatar file is required")
    }


    //Step-5 : Creating the user object and creating the entry in db
    const user= await User.create({
        fullName,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        email,
        username,
        password
    })
    // console.log("user:", user);

    //Step-6 : checking if user created and removing fields password & refreshtoken
    const createdUser = await User.findById(user._id).select( "-password -refreshToken")
    if(!createdUser)
    {
        throw new ApiError(500,"Something went wrong while registering the user")
    }
    //Step-7 : Returning the response

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User Registered Succesfully") 
    )

})

const loginUser = asynchandler(async(req,res)=>{
    //Step-1 : Getting username,email,password from the request body
    const {username,email,password} =req.body
    // console.log("Request Body",req.body)

    //Step-2 : Getting the User or email (anyone)
    if(!username && !email){
        throw new ApiError(400,"USername or email is required ")
    }

    //Step-3 : finding the user in the database
    const user = await User.findOne({ $or : [{username},{email}]})

    if(!user){
        throw new ApiError(404,"User doesn't exist")
    }
    //Step-4 : verifying the password of the user to validate login
    const isPasswordValid = await user.IsPasswordValid(password)
    if(!(isPasswordValid)){
        throw new ApiError(401,"Password incorrect")
    }

    //Step-5 : Generating the access and the refresh tokens
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)
    // console.log(accessToken,refreshToken);

    //Getting the Logged in User    
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    //Step-6 : Sending the tokens in the form of cookies
    //Creating options :
    const options = {
        httpOnly :true,
        secure :true
    }

    //Step-7 : Returning the response
    return res.
    status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(201,{
            user : loggedInUser,accessToken,refreshToken
        },"User LoggdIn Successfully")
    )
})

const logoutUser = asynchandler(async(req,res)=>{
    await User.findByIdAndUpdate(req.user?._id,
        {
            $set : {refreshToken : undefined}
        },{
            new : true
        }
    )

    const options = {
        httpOnly :true,
        secure :true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(201,{},"User Logged Out")
    )
})

const refreshAccessToken = asynchandler(async(req,res)=>{
    //Step-1 : Getting the Refresh Token from the user avaiable
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(400,"Invalid Refresh Token")
    }

    //Step-2 : Getting the RefreshToken from the database
    const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)

    if(!decodedToken){
        throw new ApiError(401,"Error while getting Refresh Token")
    }
    const user = await User.findById(decodedToken._id)

    if(!user){
        throw new ApiError(401,"Invalid Refresh Token")
    }

    //Step-3 : Checking if the incoming and user's refresh Token are same

    if(incomingRefreshToken !== user.refreshToken){
        throw new ApiError(401,"Invalid Refresh Token")
    }

    //Step-4 : Generating the new Access and Refresh Token 
    const {accessToken,refreshToken} = generateAccessAndRefreshTokens(user._id)

    const options ={
        httpOnly : true,
        secure : true
    }

    //Step-5 : Sending the reponse and cookies in the form of the refresh & Access Token
    return  res
            .status(200)
            .cookie("accessToken",accessToken,options)
            .cookie("refreshToken",refreshToken,options)
            .json(
                new ApiResponse(200,{user : refreshToken,accessToken},"AccessToken Refreshed")
            )
})

const changeCurrentPassword = asynchandler(async(req,res)=>{
    //Step-1 : Getting the old password and new Password
    const {oldPassword,newPassword}= req.body

    //Step-2 : Checking if the old password is correct 
    const user = await User.findById(req.user?._id)
    
    if(!user){
        throw new ApiError(401,"Invalid User credentials")
    }
    const isPasswordCorrect = await user.IsPasswordValid(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(401,"Incorrect Old Password Entered")
    }

    //Step-3 : Updating the old to new password
    user.password = newPassword

    await user.save({validateBeforeSave : false})

    return res
           .status(200)
           .json(
            new ApiResponse(200,{},"Password Changed Successfully"))
            
})

const getCurrentUser = asynchandler(async(req,res)=>{
    return res
            .status(200)
            .json(
                new ApiResponse(200,req.user,"Current User fetched Successfully")
            )
})

const updateUserDetails = asynchandler(async(req,res)=>{
    //Step -1 : Getting the info to be updated 
    const {fullName,email} =req.body

    if(!fullName && !email){
        throw new ApiError(400,"All details are required")
    }

    //Step -2 : Updating the old values to new values and saving in the database

    await User.findByIdAndUpdate(req.user?._id,
        {
            $set : {
                email,
                fullName : fullName
            }
        },
        {
            new : true
        }
    )

    return res
           .status(200)
           .json(
               new ApiResponse(200,req.user,"Account Details Updated Successfully")
           )
})

const updateUseravatar = asynchandler(async(req,res)=>{ 
    const avatarLocalpath = req.file?.path
    //Step-1 : Getting the avatarLocalPath from the files
    if(!avatarLocalpath){
        throw new ApiError(400,"Avatar File is Required")
    }

    //Step-2 : Now Updating it on the cloudinary and the database
    const avatar = await  uploadToCloudinary(avatarLocalpath)

    if(!avatar){
        throw new ApiError(500,"Something went wrong while uploading on Cloudinary")
    }

    if(req.user?.avatar){
        await deleteFromCloudinary(req.user.avatar)
    }
     await User.findByIdAndUpdate(req.user?._id,
        {
            $set :{
                avatar : avatar.url
            }
        },
        {new : true}
    )
    
    return res
            .status(200)
            .json(
                new ApiResponse(200,req.user,"Avatar Image Updated")
            )

})

const updateUserCoverImage = asynchandler(async(req,res)=>{
    const CoverImageLocalpath = req.file?.path
    //Step-1 : Getting the avatarLocalPath from the files
    if(!CoverImageLocalpath){
        throw new ApiError(401,"CoverImage File is Required")
    }

    //Step-2 : Now Updating it on the cloudinary and the database
    const CoverImage = uploadToCloudinary(CoverImageLocalpath)

    if(!CoverImage?.url){
        throw new ApiError(401,"Something went wrong while uploading on Cloudinary")
    }

     await User.findByIdAndUpdate(req.user?._id,
        {
            $set :{
                CoverImage : CoverImage.url
            }
        },
        {new : true}
    ).select("-password -refreshToken")

    await deleteFromCloudinary(CoverImageLocalpath)
    return res
            .status(200)
            .json(
                new ApiResponse(200,req.user,"CoverImage Updated")
            )

})

const getUserChannelProfile = asynchandler(async(req,res)=>{
    const {username} = req.params

    if(!username?.trim()){
        throw new ApiError(400,"username is missing")
    }

    const channel = await User.aggregate([
        {
            $match :{
                username : username.toLowerCase()
            }
        },
        {
            $lookup :{
                from : "subscriptions",
                localField : "_id",
                foreignField : "channel",
                as : "subscribers"
            },
        },
        {
                $lookup :{
                    from : "subscriptions",
                    localField : "_id",
                    foreignField : "subscriber",
                    as : "subscribedTo"
                }
        },
        {
            $addFields : {
                subscriberCount : {
                    $size : "$subscribers"
                },
                channelsSubscribedToCount : {
                    $size : "$subscribedTo" 
                },
                isSubscribed :{
                    $cond : {
                        if : {$in : [req.user?._id,"$subscribers.subscriber"]},
                        then : true,
                        else : false
                    }
                }
            }
        },
        {
            $project :{
                fullName : 1,
                email : 1,
                username : 1,
                subscriberCount :1,
                channelsSubscribedToCount : 1,
                isSubscribed : 1,
                avatar : 1,
                coverImage : 1
            }
        }
    ])

    // console.log(channel)
    if(!channel?.length){
        throw new ApiError(404,"Channel doesn't exists")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,channel[0],"Channel Profile Fetched Successfully")
            )
})

const getUserWatchHistory = asynchandler(async(req,res)=>{
    const user = await User.aggregate([
        {
            $match : {
                _id : new mongoose.Types.ObjectId(req.user?._id)
            }
        },
        {
            $lookup : {
                from : "videos",
                localField : "watchHistory",
                foreignField : "_id",
                as : "watchHistory",
                pipeline : [
                    {
                        $lookup :{
                            from : "users",
                            localField : "owner",
                            foreignField : "_id",
                            as : "owner"
                        },
                        $project : {
                            username : 1,
                            fullName : 1,
                            avatar : 1
                        }
                    },
                    {
                        $addFields : {
                            owner : {
                                $first : "$owner"    
                            }
                        }
                    }
                ]
            }
        },
    
    ])

    return res
            .status(200)
            .json(
                new ApiResponse(200,user[0].watchHistory,"User watch History fetched Successfully")
            )
})
export {registerUser,loginUser,logoutUser,refreshAccessToken,changeCurrentPassword,getCurrentUser,updateUserDetails,updateUseravatar,updateUserCoverImage,getUserChannelProfile,getUserWatchHistory}