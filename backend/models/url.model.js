import { Schema, model } from "mongoose";

const urlSchema = new Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
        },
        redirectURL: {
            type: String,
            required: true,
        },
        visitHistory: [
            {
                timestamp: { type: Number },
            },
        ],
        totalClicks: {
            type: Number,
            default: 0
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
    },
    { timestamps: true }
);

//MODEL
const URL = model("url", urlSchema);

export default URL;
