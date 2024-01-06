const asyncHandler = require("express-async-handler");
const DraftPost = require('../models/DraftPost');
const User = require('../models/User');
const mongoose = require('mongoose');
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Get all 
exports.get_all_draftpost = asyncHandler(async (req, res, next) => {
    const allDraftPosts = await DraftPost.find({}).sort({createdAt: -1});

    res.status(200).json(allDraftPosts);
});

// Get a single post
exports.get_a_draftpost = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Check if its a valid id type
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such draft post'})
    }

    const findDraftPost = await DraftPost.findById(id);

    if(!findDraftPost) {
        return res.status(400).json({error: 'No such draft post'})
    }

    res.status(200).json(findDraftPost);
});

// Create a new post
exports.create_draftpost = [
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
            const newDraftPost = await DraftPost.create({
                user: currentUser,
                title,
                body
            });
            res.status(200).json(newDraftPost);
        } catch(error) {
            res.status(400).json({error: 'Something went wrong, try again.'});
        }
    }
    
})
]

// Delete a post
exports.delete_draftpost = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Check if its a valid id type
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such draft post'})
    }
     
    try {
        const findDraftPostToDelete = await DraftPost.findById(id)

        if(findDraftPostToDelete) {
            await DraftPost.findByIdAndDelete(id)
            res.status(200).json(findDraftPostToDelete);
        } else {
            throw new Error('Draft post does not exist')
        }
        
    } catch(error) {

        res.status(400).json({error: error.message});
    }
});

// update a post
exports.update_draftpost = [
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
        return res.status(404).json({ error: 'No such draft post'});
    };

   const currentDraftPost = await DraftPost.findOneAndUpdate(
    { _id: id },
    { ...req.body }
   )

   if(!currentDraftPost) {
    return res.status(400).json({ error: 'No such draft post'});
   };

   res.status(200).json(currentDraftPost);
})
]