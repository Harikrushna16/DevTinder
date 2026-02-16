const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { validateUpdateProfileData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

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

profileRouter.patch("/update-password", userAuth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = req.user;
        const isPasswordValid = await user.comparePassword(currentPassword);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid current password" });
        }
        const passwordHash = await bcrypt.hash(newPassword, 10);
        user.password = passwordHash;
        await user.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(400).json({ message: "Password update failed", error });
    }
})

module.exports = profileRouter;