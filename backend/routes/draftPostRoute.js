var express = require('express');
var router = express.Router();

const draftPostControl = require('../controllers/draftPostController');
const requireAdminAuth = require('../middleware/requireAdminAuth');




// GET ALL DRAFT POST
router.get('/', draftPostControl.get_all_draftpost);

// GET SINGLE DRAFT POST
router.get('/:id', draftPostControl.get_a_draftpost);

// Auth middleware - Users need to be logged in to do the task below
router.use(requireAdminAuth);

// POST A NEW DRAFT POST
router.post('/', draftPostControl.create_draftpost);

// DELETE A DRAFT POST
router.delete('/:id', draftPostControl.delete_draftpost);

// UPDATE A DRAFT POST
router.patch('/:id', draftPostControl.update_draftpost);

module.exports = router