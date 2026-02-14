const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

// middleware to parse json
app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
        const validationResult = validateSignUpData(req);
        if (!validationResult.isValid) {
            return res.status(400).json({ message: validationResult.message });
        }

        const { firstName, lastName, email, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email, password: passwordHash });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ message: "User registration failed", error });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const isEmailValid = validator.isEmail(email);
        if (!isEmailValid) {
            return res.status(400).json({ message: "Invalid email" });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.status(200).json({ message: "User logged in successfully" });
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(400).json({ message: "Login failed", error });
    }
});

app.get("/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user", error });
    }
});

app.get("/user", async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        } else {
            return res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user", error });
    }
})

app.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error });
    }
});

app.patch("/user/:id", async (req, res) => {
    const updatedUserData = req.body;
    const userId = req.params.id;

    try {
        const allowedUpdates = ["firstName", "lastName", "password", "age", "bio", "skills", "profilePicture"];
        const isValidOperation = Object.keys(updatedUserData).every((update) => allowedUpdates.includes(update));
        if (!isValidOperation) {
            return res.status(400).json({ message: "Invalid update" });
        }
        const user = await User.findByIdAndUpdate(userId, updatedUserData, { returnDocument: "after", runValidators: true });
        if (!user) {
            res.status(400).json({ message: "User not found" });
        } else {
            res.status(200).json({ message: "User updated successfully", user })
        }
    } catch (err) {
        res.status(400).json({ message: "Failed to update user", err })
    }
})

app.delete("/user", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.body.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } else {
            return res.status(200).json(`User ${user.firstName} deleted successfully`);
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user", error });
    }
});

connectDB()
    .then(() => {
        console.log("MongoDB connected");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    }).catch((error) => {
        console.log(error);
    });
