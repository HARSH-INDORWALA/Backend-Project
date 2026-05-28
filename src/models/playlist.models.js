import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const playlistSchema = new Schema({
    name : {
        type : String,
        trim : true,
        maxlength : 100,
        required : true
    },
    description : {
        type : String,
        trim : true,
        maxlength : 500,
        default : ""
    },
    videos : [
        {
            type : mongoose.Types.ObjectId,
            ref : "Video",
            default : []
        }
    ],
    owner : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true
    },
    isPublic : {
        type : Boolean,
        default : true
    }
},
    {timestamps : true});

//indexing done for the getUserPlaylists
playlistSchema.index({ owner: 1 })

//Compund for the pagination
playlistSchema.index({
   owner: 1,
   createdAt: -1
})

//Playlist analytics
playlistSchema.index({ videos: 1 })

playlistSchema.plugin(mongooseAggregatePaginate);
export const Playlist = mongoose.model("Playlist",playlistSchema);