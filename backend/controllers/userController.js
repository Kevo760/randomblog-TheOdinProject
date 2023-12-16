const asyncHandler = require("express-async-handler");
const User = require('../models/User');



// Login user
exports.login_user = asyncHandler(async (req, res, next) => {
    res.json({ msg: 'login user '})
});

// Signup user
exports.signup_user = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body

    try {
        const newUser = await User.signup(username, password);

        res.status(200).json({newUser})
    } catch(error) {

        res.status(400).json({error: error.message})
    }

    res.json({ msg: 'signup user '})
});