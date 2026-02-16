const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");

profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        res.status(200).json({ message: "User profile", user: req.user });
    } catch (error) {
        res.status(400).json({ message: "Failed to fetch user profile", error });
    }
})

module.exports = profileRouter;