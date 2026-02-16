const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { validateUpdateProfileData } = require("../utils/validation");
const User = require("../models/user");

profileRouter.get("/view", userAuth, async (req, res) => {
    try {
        res.status(200).json({ message: "User profile", user: req.user });
    } catch (error) {
        res.status(400).json({ message: "Failed to fetch user profile", error });
    }
});

profileRouter.patch("/update", userAuth, async (req, res) => {
    try {
        const validation = validateUpdateProfileData(req);
        if (!validation.isValid) {
            return res.status(400).json({ message: validation.message });
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        const user = await loggedInUser.save();
        res.status(200).json({ message: `${loggedInUser.firstName} profile updated successfully`, user });
    } catch (error) {
        res.status(400).json({ message: "Profile update failed", error });
    }
});

module.exports = profileRouter;