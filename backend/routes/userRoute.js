var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

// Login route
router.post('/login', userController.login_user);

// Signup route
router.post('/signup', userController.signup_user);



module.exports = router