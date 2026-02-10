const express = require("express");

const app = express();

// app.get("/user/:userId", (req, res) => {
//     console.log(req.params);
//     res.send({ firstName: "Harikrushna", lastName: "DDS" })
// });

app.get("/user", (req, res) => {    //?userId=101&name=Harikrushna
    console.log(req.query);
    res.send({ firstName: "Harikrushna", lastName: "DDS" })
});

app.post("/user", (req, res) => {
    res.send("User created successfully");
})

app.patch("/user", (req, res) => {
    res.send("User updated successfully");
})

app.put("/user", (req, res) => {
    res.send("User updated successfully");
})

app.delete("/user", (req, res) => {
    res.send("User deleted successfully");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});