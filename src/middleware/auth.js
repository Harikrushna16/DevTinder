const adminAuth = (req, res, next) => {
    console.log("Admin auth middleware checked!");
    const token = "xyz";
    const isAdminAuthenticated = "xyz" === token;
    if (!isAdminAuthenticated) {
        res.status(401).send("You are not authorized to access this resource");
    } else {
        next();
    }
}

const userAuth = (req, res, next) => {
    console.log("User auth middleware checked!");
    const token = "xyz";
    const isUserAuthenticated = "xyz" === token;
    if (!isUserAuthenticated) {
        res.status(401).send("You are not authorized to access this resource");
    } else {
        next();
    }
}

module.exports = { adminAuth, userAuth };