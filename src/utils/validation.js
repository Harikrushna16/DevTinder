const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return { isValid: false, message: "All fields are required" };
    }
    if (!validator.isEmail(email)) {
        return { isValid: false, message: "Please provide a valid email" };
    }
    if (!validator.isStrongPassword(password)) {
        return { isValid: false, message: "Please provide a strong password" };
    }
    return { isValid: true, message: "All fields are valid" };
}

module.exports = { validateSignUpData };