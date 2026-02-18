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
        }).populate("fromUserId", "firstName lastName profilePicture");
        if (!requests) {
            return res.status(404).json({ message: "No requests found" });
        }
        return res.status(200).json({ requests, message: "Requests fetched successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message || "Failed to get requests" });
    }
});

userRouter.get("/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connections = await RequestConnection.find({
            $or: [{
                fromUserId: loggedInUser._id,
                status: "accepted"
            }, {
                toUserId: loggedInUser._id,
                status: "accepted"
            }]
        }).populate("fromUserId", "firstName lastName profilePicture").populate("toUserId", "firstName lastName profilePicture");
        if (!connections) {
            return res.status(404).json({ message: "No connections found" });
        }
        const formattedConnections = connections.map((connection) => {
            if (connection.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return connection.toUserId;
            } else {
                return connection.fromUserId;
            }
        })
        return res.status(200).json({ formattedConnections, message: "Connections fetched successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message || "Failed to get connections" });
    }
})

module.exports = userRouter;