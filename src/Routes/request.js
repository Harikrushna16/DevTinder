const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");
const RequestConnection = require("../models/requestConnnection");

requestRouter.post("/:status/:id", userAuth, async (req, res) => {
    try {
        const { status, id } = req.params;
        const fromUserId = req.user._id;

        // keeping such validation at schema level 
        // if (fromUserId.toString() === id.toString()) {
        //     return res.status(400).json({ message: "You cannot send request to yourself" });
        // }
        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }
        const toUser = await User.findById(id);
        if (!toUser) {
            return res.status(400).json({ message: "User not found" });
        }
        const existingRequest = await RequestConnection.findOne({
            $or: [
                { fromUserId, toUserId: id },
                { fromUserId: id, toUserId: fromUserId }
            ]
        });
        if (existingRequest) {
            return res.status(400).json({ message: "Request already sent" });
        }
        const newRequest = new RequestConnection({ fromUserId, toUserId: id, status });
        await newRequest.save();

        return res.status(200).json({ message: `${req.user.firstName} has ${status} request to ${toUser.firstName}`, newRequest });
    } catch (error) {
        res.status(400).json({ message: error.message || "Failed to send request" });
    }
});

module.exports = requestRouter;