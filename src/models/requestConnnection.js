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
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: "{VALUE} is not a valid status",
        },
        required: true,
    },
}, {
    timestamps: true,
});

requestConnectionSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

requestConnectionSchema.pre("save", function () {
    if (this.fromUserId.equals(this.toUserId)) {
        throw new Error("You cannot send request to yourself");
    }
});

const RequestConnection = mongoose.model("RequestConnection", requestConnectionSchema);

module.exports = RequestConnection;