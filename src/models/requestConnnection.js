const mongoose = require("mongoose");

const requestConnectionSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["ignored", "interested"],
        required: true,
    },
}, {
    timestamps: true,
});

const RequestConnection = mongoose.model("RequestConnection", requestConnectionSchema);

module.exports = RequestConnection;