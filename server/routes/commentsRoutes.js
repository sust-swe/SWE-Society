
const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const authController = require('../controllers/authController');

router.patch('/:id',authController.protect, commentsController.UpdateComment);
router.post('/',authController.protect, commentsController.postComment);
router.delete('/:id',authController.protect, commentsController.deleteComment);
router.get('/:blog_id',authController.protect, commentsController.getCommentsOfBlog)



module.exports = router;