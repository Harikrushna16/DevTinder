const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");

const app = express();

app.use("/user", userAuth);

app.get("/user", (req, res) => {
    try {
        res.send({ firstName: "User", lastName: "DDS" })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

app.post("/user", (req, res) => {
    try {
        res.send("User created successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error!!!");
    }
})

app.get("/admin", adminAuth, (req, res) => {
    try {
        throw new Error("Something went wrong");
        res.send({ firstName: "Admin", lastName: "DDS" })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error!!!!");
    }
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});