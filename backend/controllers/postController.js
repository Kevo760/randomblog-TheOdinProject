const asyncHandler = require("express-async-handler");
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const mongoose = require('mongoose');
const { body, validationResult } = require("express-validator");

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

    const findPost = await Post.findById(id);

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
    .withMessage('Title must have at least 3 characters'),
    body('body')
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
    const { title, body } = req.body;


    const mainUser = await User.findOne({ username: 'NotAdmin'})
    if(!errors.isEmpty()) {
        res.status(400).json({error: errors.errors});
    } else {
        // Add post to db
        try {
            const newPost = await Post.create({
                user: mainUser,
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

        if(findPostToDelete) {
            await Post.findByIdAndDelete(id)
            .then(res.status(200).json(findPostToDelete));
        } else {
            res.status(400).json({error: error.message});
        }
        

    } catch(error) {

        res.status(400).json({error: error.message});
    }
});

// update a post
exports.update_post = asyncHandler(async (req, res, next) => {
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

   console.log(currentPost);

   res.status(200).json(currentPost);
});