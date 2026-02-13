const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
    age: {
        type: Number,
        min: 18,
        max: 100,
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: "{VALUE} is not a valid gender"
        },
    },
    bio: {
        type: String,
        default: "This is a default Bio of users",
    },
    interests: {
        type: Array,
    },
    profilePicture: {
        type: String,
        default: "https://www.vhv.rs/viewpic/ioJThwo_men-profile-icon-png-image-free-download-searchpng/",
    },
},
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;