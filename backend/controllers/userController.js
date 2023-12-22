const asyncHandler = require("express-async-handler");
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d'});
}

// Login user
exports.login_user = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const loginUser = await User.login(username, password);

        // Grab username and status
        const userData = {
            username: loginUser.username,
            status: loginUser.status
        }

        // Create token for user logging in
        const token = createToken(loginUser._id);

        res.status(200).json({userData, token});
    } catch(error) {

        res.status(400).json({error: error.message});
    }

});

// Signup user
exports.signup_user = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const newUser = await User.signup(username, password);


        // Grab username and status
        const userData = {
            username: newUser.username,
            status: newUser.status
        }
        // Create a token
        const token = createToken(newUser._id);


        res.status(200).json({userData, token});
    } catch(error) {

        res.status(400).json({error: error.message});
    }
});