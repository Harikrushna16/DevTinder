const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middleware/auth");
const authRouter = require("./Routes/auth");
const profileRouter = require("./Routes/profile");

// middleware to parse json
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api", profileRouter);

connectDB()
    .then(() => {
        console.log("MongoDB connected");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    }).catch((error) => {
        console.log(error);
    });
