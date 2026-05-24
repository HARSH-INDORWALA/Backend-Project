import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const subscriptionSchema = new Schema({
    subscriber : {
        type : Schema.Types.ObjectId,// one who is subscribing
        ref : "User"
    },
    channel : {
        type : Schema.Types.ObjectId,//one whose channel is where subscriber is subscribing
        ref : "User"
    }
},{timestamps : true})

subscriptionSchema.plugin(mongooseAggregatePaginate)
subscriptionSchema.index({subscriber :1,channel : 1},{ unique : true })
export const Subscription = mongoose.model("Subscription",subscriptionSchema)