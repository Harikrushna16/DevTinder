const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://harry:harry1234@cluster0.4vfc5ea.mongodb.net/devTinder?appName=Cluster0");
}

module.exports = connectDB;

