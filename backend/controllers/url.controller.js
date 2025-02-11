import { nanoid } from "nanoid";
import URL from "../models/url.model.js";

export const handlePostUrl = async (req, res) => {
    const { orignalURL } = req.body;
    if (!orignalURL) {
        return res.status(400).json({
            message: "URL is required.",
            success: false
        })
    }

    const existingURL = await URL.findOne({ redirectURL: orignalURL, createdBy: req.id })
    if (existingURL) {
        return res.status(400).json({
            message: "You already have it's short-id",
            success: false
        })
    }

    const shortId = nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectURL: orignalURL,
        visitHistory: [],
        totalClicks: 0,
        createdBy: req.id,   // req.id containes the logged in userID (handled in isAuthenticated middleware).
    });

    return res.status(201).json({
        message: "ShortID generated successfully.",
        shortId,
        success: true
    });
}

export const handleGetShortId = async (req, res) => {
    try {
        const shortId = req.params.shortId;

        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
                $inc: {
                    totalClicks: 1, // Increment totalClicks by 1
                },
            },
            { new: true } // Return the updated document
        );

        if (!entry) {
            return res.status(404).json({
                message: "Invalid ShordID.",
                success: false
            });
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error handling short ID:", error);
        res.status(500).json({
            message: "Internal Server Error.",
            success: false
        });
    }
}


export const handleGetAllShortId = async (req, res) => {
    try {
        const userId = req.id;
        if (!userId) {
            return res.status(400).json({
                message: "User not Authenticated.",
                success: false
            })
        }
        const urls = await URL.find({ createdBy: userId }).select("shortId redirectURL totalClicks visitHistory");
        if (!urls) {
            return res.status(404).json({
                message: "URLs not found.",
                success: false
            });
        }

        return res.status(200).json({
            urls,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const handleDeleteUrl = async (req, res) => {
    try {
        const shortId = req.params.shortId;

        // Check if the URL exists
        const urlEntry = await URL.findOne({ shortId });
        if (!urlEntry) {
            return res.status(404).json({
                message: "URL not found.",
                success: false
            });
        }

        // Check if the current user is authorized to delete this URL
        if (urlEntry.createdBy != req.id) {
            return res.status(403).json({
                message: "Unauthorized to delete this URL.",
                success: false
            });
        }

        // Delete the URL
        await URL.deleteOne({ shortId });

        return res.status(200).json({
            message: "URL deleted successfully.",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}