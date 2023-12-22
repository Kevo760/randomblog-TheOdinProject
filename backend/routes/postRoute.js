var express = require('express');
var router = express.Router();

const postControl = require('../controllers/postController');
const requireAdminAuth = require('../middleware/requireAdminAuth');



// GET ALL POST
router.get('/', postControl.get_all_post);

// GET SINGLE POST
router.get('/:id', postControl.get_a_post);

// Auth middleware - Users need to be logged in to do the task below
router.use(requireAdminAuth);

// POST A NEW POST
router.post('/', postControl.create_post);

// DELETE A POST
router.delete('/:id', postControl.delete_post);

// UPDATE A POST
router.patch('/:id', postControl.update_post);

module.exports = router