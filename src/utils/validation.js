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

const validateUpdateProfileData = (req) => {
    const allowedFields = ["firstName", "lastName", "age", "gender", "bio", "skills", "profilePicture"];
    const isEditAllowed = Object.keys(req.body).every((key) => allowedFields.includes(key));
    if (!isEditAllowed) {
        return { isValid: false, message: "Invalid fields" };
    }
    const { age, gender, bio, skills, profilePicture } = req.body;
    if (age !== undefined && !validator.isInt(String(age))) {
        return { isValid: false, message: "Age must be a number" };
    }
    if (gender !== undefined && !validator.isLength(gender, { min: 1, max: 1 })) {
        return { isValid: false, message: "Gender must be a single character" };
    }
    if (bio !== undefined && !validator.isLength(bio, { min: 10, max: 200 })) {
        return { isValid: false, message: "Bio must be between 10 and 200 characters" };
    }
    if (profilePicture !== undefined && !validator.isURL(profilePicture)) {
        return { isValid: false, message: "Profile picture must be a valid URL" };
    }
    return { isValid: true, message: "All fields are valid" };
}

module.exports = { validateSignUpData, validateUpdateProfileData };