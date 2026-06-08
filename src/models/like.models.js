import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const likeSchema = new Schema({
    comment : {
        type : mongoose.Types.ObjectId,
        ref : "Comment"
    },
    video : {
        type : mongoose.Types.ObjectId,
        ref : "Video"
    },
    likedBy : {
        type : mongoose.Types.ObjectId,
        ref : "User",   
        required : true
    },
},
{
    timestamps : true

})

likeSchema.plugin(mongooseAggregatePaginate);
likeSchema.index({ likedBy: 1, video: 1 })

export const Like = mongoose.model('Like',likeSchema)