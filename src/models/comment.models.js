import mongoose, { Schema, SchemaTypes } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema({
    content : {
        type :String,
        required : true
    },
    //the video on which commenting
    video : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Video"
    },
    //the one commenting
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
},
{
    timestamps : true
})

commentSchema.plugin(mongooseAggregatePaginate)
export const Comment = mongoose.model("Comment",commentSchema);