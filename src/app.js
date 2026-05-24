import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
const app=express()
app.use(cors(
    {
        origin :  process.env.CORS_ORGIN
    }
))
app.use(express.json({
    limit :"16kb"
}))
app.use(express.urlencoded({
    extended : true,
    limit : "16kb"
}));
app.use(express.static("public"))
app.use(cookieParser())


//Routes Import
import userRouter from "./routes/user.route.js";
import videoRouter from "./routes/videos.route.js"
import commentRouter from "./routes/comment.route.js"
import LikeRouter from "./routes/like.routes.js"
import SubscriptionRouter from "./routes/subscription.routes.js"
app.use("/api/v1/users",userRouter)
app.use("api/v1/videos",videoRouter)
app.use("/api/v1/comments",commentRouter)
app.use("/api/v1/likes",LikeRouter)
app.use("/api/v1/subscription",SubscriptionRouter)
export {app} 