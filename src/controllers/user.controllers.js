import asynchandler from "../utlis/AsyncHandler.js"
import { ApiError } from "../utlis/ApiError.js"
import {ApiResponse} from "../utlis/ApiResponse.js"
import { uploadToCloudinary } from "../utlis/cloudinary.js"
import {User} from "../models/user.models.js"

const generateAccessAndRefreshTokens =  async(userId)=>{
    try {
        const user =await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken =refreshToken
        user.save({ validateBeforeSave : false  })
        
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
    console.log("user:", user);

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

    //Step-2 : Getting the User or email (anyone)
    if(!username && !email){
        return ApiError(400,"USername or email is required ")
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

    //Getting the Logged in User
    const loggedInUser = await User.findById(user._id) 

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
    await User.findByIdAndUpdate(req.user._id,
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
export {registerUser,loginUser,logoutUser}