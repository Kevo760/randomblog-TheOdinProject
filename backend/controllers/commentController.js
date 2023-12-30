const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require('../models/User');
require('dotenv').config();


exports.create_comment = [
    body('message')
    .trim()
    .isLength({min: 3})
    .escape()
    .withMessage('Body must have at least 3 characters')
    .isLength({max: 100})
    .escape()
    .withMessage('Body must be less than 100 characters')
    ,
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        const { message, postid } = req.body;
        const userid = req.user;
    
        if(!errors.isEmpty()) {
            res.status(400).json({error: errors.errors});
        } else {

            try {
                const currentUser = await User.findById(userid);
                const post = await Post.findById(postid);

                const comment = new Comment({
                    username: currentUser.username,
                    message
                })

                await comment.save()
                post.comments.push(comment)
                await post.save()

                res.status(200).json(comment)
            } catch(error) {
                res.status(400).json({error: 'Something went wrong, try again.'});
            }
        }
        
    })
]