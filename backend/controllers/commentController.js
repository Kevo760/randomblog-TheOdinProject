const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require('../models/User');
require('dotenv').config();

// Create a comment
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
        // Get userid from req.user via requireAuth
        const userid = req.user;
    
        if(!errors.isEmpty()) {
            res.status(400).json({error: errors.errors});
        } else {

            try {
                // Find user and post
                const currentUser = await User.findById(userid);
                const post = await Post.findById(postid);

                const comment = new Comment({
                    commenterid: currentUser._id,
                    username: currentUser.username,
                    message,
                    postid: post._id
                })
                // Save comment then push comment into post comments array
                await comment.save()
                post.comments.push(comment)
                // Save post
                await post.save()

                res.status(200).json(comment)
            } catch(error) {
                
                res.status(400).json({error: 'Something went wrong, try again.'});
            }
        }
        
    })
]

// Delete a comment
exports.delete_comment = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // Get userid from req.user via requireAuth
    const user = req.user;
    const userid = user._id.valueOf();

    try {
        const comment = await Comment.findById(id);
 
        // IF commenterid does not match userid throw error
        if(comment.commenterid !== userid) {
            throw new Error('Unauthorized action')
        }

        // Delete comment and send deleted comment as json
        await comment.deleteOne()
        res.status(200).json(comment)
    } catch(error) {

       res.status(400).json({error: error.message})
    }
});