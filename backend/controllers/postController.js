const asyncHandler = require("express-async-handler");
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const DraftPost = require('../models/DraftPost'); 
const mongoose = require('mongoose');
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Get all 
exports.get_all_post = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find({}).sort({createdAt: -1});

    res.status(200).json(allPosts);
});

// Get a single post
exports.get_a_post = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Check if its a valid id type
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such post'})
    }

    const findPost = await Post.findById(id).populate({path: 'comments', options: {sort: {createdAt: -1}}});

    if(!findPost) {
        return res.status(400).json({error: 'No such post'})
    }

    res.status(200).json(findPost);
});

// Create a new post
exports.create_post = [
    body('title')
    .trim()
    .isLength({min: 3})
    .escape()
    .withMessage('Title must have at least 3 characters')
    .isLength({max: 100})
    .escape()
    .withMessage('Body must be less than 100 characters'),
    body('body')
    .trim()
    .isLength({min: 3})
    .escape()
    .withMessage('Body must have at least 3 characters')
    ,
    asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    const { title, body } = req.body;

    if(!errors.isEmpty()) {
        res.status(400).json({error: errors.errors});
    } else {
        // Add post to db
        try {
            // Verify authentication
            const { authorization } = req.headers;

            if(!authorization) {
                throw new Error()
            }

            // Splits Bearer and token
            const token = authorization.split(' ')[1]
            const { _id } = jwt.verify(token, process.env.JWT_SECRET)


            const currentUser = await User.findOne({_id})
            const newPost = await Post.create({
                user: currentUser,
                title,
                body
            });

            res.status(200).json(newPost);
        } catch(error) {
            res.status(400).json({error: 'Something went wrong, try again.'});
        }
    }
    
})
]

// Delete a post
exports.delete_post = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Check if its a valid id type
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such post'})
    }
     
    try {
        const findPostToDelete = await Post.findById(id)

        // If post comment array is greater than zero delete all comments by postid and then delete post
        if(findPostToDelete.comments.length > 0) {
            await Comment.deleteMany({postid: findPostToDelete._id})
            await Post.findByIdAndDelete(id)
            res.status(200).json(findPostToDelete);
        // If post comment array is zero just delete the post
        } else if(findPostToDelete.comments.length === 0) {
            await Post.findByIdAndDelete(id)
            res.status(200).json(findPostToDelete);

        } else {
            res.status(400).json({error: error.message});
        }
        
    } catch(error) {

        res.status(400).json({error: error.message});
    }
});

// update a post
exports.update_post = [
    body('title')
    .trim()
    .isLength({min: 3})
    .escape()
    .withMessage('Title must have at least 3 characters')
    .isLength({max: 100})
    .escape()
    .withMessage('Body must be less than 100 characters'),
    body('body')
    .trim()
    .isLength({min: 3})
    .escape()
    .withMessage('Body must have at least 3 characters')
    ,
    asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Check if its a valid id type
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such post'});
    };

   const currentPost = await Post.findOneAndUpdate(
    { _id: id },
    { ...req.body }
   )

   if(!currentPost) {
    return res.status(400).json({ error: 'No such post'});
   };

   res.status(200).json(currentPost);
})
]



// ADD POST AND DELETE DRAFT POST

// Create a new post
exports.create_post_delete_draft = asyncHandler(async (req, res, next) => {
    const { title, body, draftid } = req.body;

        // Add post to db
        try {
            // Verify authentication
            const { authorization } = req.headers;

            if(!authorization) {
                throw new Error()
            }

            // Splits Bearer and token
            const token = authorization.split(' ')[1]
            const { _id } = jwt.verify(token, process.env.JWT_SECRET)

            // Get user and delete draft
            const currentUser = await User.findOne({_id})
            const deletedDraft = await DraftPost.findByIdAndDelete(draftid)

            // Check for user and deleted draft if either dont exist throw error
            if(!currentUser || !deletedDraft) {

                throw new Error('User or draft post does not exist')
            } else {
                
                const newPost = await Post.create({
                    user: currentUser,
                    title,
                    body
                });

                res.status(200).json(newPost);
            }
            
            
        } catch(error) {

            res.status(400).json({error: error.message});
        }

})