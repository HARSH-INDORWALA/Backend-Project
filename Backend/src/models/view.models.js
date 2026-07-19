import mongoose, { Schema } from "mongoose";

const ViewSchema = new Schema(
    {
        video: {
            type: Schema.Types.ObjectId,
            ref: "Video",
            required: true,
        },

        viewer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

ViewSchema.index({ video: 1, viewer: 1, createdAt: -1 });

export const View = mongoose.model("View", ViewSchema);