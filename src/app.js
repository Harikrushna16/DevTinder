const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");

const app = express();

app.use("/user", userAuth);

app.get("/user", (req, res) => {
    res.send({ firstName: "User", lastName: "DDS" })
});

app.post("/user", (req, res) => {
    res.send("User created successfully");
})

app.get("/admin", adminAuth, (req, res) => {
    res.send({ firstName: "Admin", lastName: "DDS" })
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});