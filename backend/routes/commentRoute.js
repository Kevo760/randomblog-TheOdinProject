var express = require('express');
var router = express.Router();

const commentControl = require('../controllers/commentController');
const requireAuth = require('../middleware/requireAuth');

// Auth middleware - Users need to be logged in to do the task below
router.use(requireAuth);

// POST A NEW COMMENT
router.post('/', commentControl.create_comment);

// DELETE A COMMENT
router.delete('/:id', commentControl.delete_comment);


module.exports = router