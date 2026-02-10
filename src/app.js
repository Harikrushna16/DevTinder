const express = require("express");
const { adminAuth } = require("./middleware/auth");

const app = express();

app.use("/user", adminAuth);

app.get("/user", (req, res) => {
    res.send({ firstName: "Harikrushna", lastName: "DDS" })
});

app.post("/user", (req, res) => {
    res.send("User created successfully");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});