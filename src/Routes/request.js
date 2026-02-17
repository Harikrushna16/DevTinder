const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");

requestRouter.post("/:status/:id", userAuth, async (req, res) => {
    try {
        const { status, id } = req.params;
        const fromUserId = req.user._id;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }
        const toUser = await User.findById(id);
        if (!toUser) {
            return res.status(400).json({ message: "User not found" });
        }
        const request = await RequestConnection.findOne({ $or: [{ fromUserId, toUserId: id }, { fromUserId: id, toUserId: fromUserId }] });
        if (request) {
            return res.status(400).json({ message: "Request already sent" });
        }
        const newRequest = await RequestConnection.create({ fromUserId, toUserId: id, status });
        res.status(200).json({ message: "Request sent successfully", newRequest });
    } catch (error) {
        res.status(400).json({ message: "Failed to send request", error });
    }
});

module.exports = requestRouter;