const express = require("express");

const app = express();

// app.get("/user/:userId", (req, res) => {
//     console.log(req.params);
//     res.send({ firstName: "Harikrushna", lastName: "DDS" })
// });

app.get("/user", (req, res, next) => {    //?userId=101&name=Harikrushna
    console.log(req.query);
    next();
    // res.send({ firstName: "Harikrushna", lastName: "DDS" })
},
    (req, res, next) => {
        console.log("Middleware 1");
        // res.send("Middleware 1");
        next();
    },
    (req, res, next) => {
        console.log("Middleware 2");
        // res.send("Middleware 2");
        next();
    },
    (req, res, next) => {
        console.log("Middleware 3");
        // res.send("Middleware 3");
        next();
    },
    (req, res) => {
        console.log("Middleware 4");
        res.send("Middleware 4");
    }
);

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