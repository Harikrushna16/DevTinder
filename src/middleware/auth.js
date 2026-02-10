const adminAuth = (req, res, next) => {
    const token = "xyz";
    const isAdminAuthenticated = "xyz" === token;
    if (!isAdminAuthenticated) {
        res.status(401).send("You are not authorized to access this resource");
    } else {
        next();
    }
}

module.exports = { adminAuth };