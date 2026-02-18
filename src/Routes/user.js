const express = require("express");
const { userAuth } = require("../middleware/auth");
const userRouter = express.Router();
const RequestConnection = require("../models/requestConnnection");

userRouter.get("/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const requests = await RequestConnection.find({
            toUserId: loggedInUserId,
            status: "interested"
        }).populate("fromUserId", "firstName lastName email profilePicture");
        if (!requests) {
            return res.status(404).json({ message: "No requests found" });
        }
        return res.status(200).json({ requests, message: "Requests fetched successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message || "Failed to get requests" });
    }
});

module.exports = userRouter;