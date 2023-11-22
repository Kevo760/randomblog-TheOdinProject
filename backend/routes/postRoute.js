var express = require('express');
var router = express.Router();
const asyncHandler = require("express-async-handler");
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

const postControl = require('../controllers/postController');

// GET ALL POST
router.get('/', postControl.get_all_post);

// GET SINGLE POST
router.get('/:id', postControl.get_a_post);

// POST A NEW POST
router.post('/', postControl.create_post);

// DELETE A POST
router.delete('/:id', postControl.delete_post);

// UPDATE A POST
router.patch('/:id', postControl.update_post);

module.exports = router