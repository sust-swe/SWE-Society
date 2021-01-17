
const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

router.patch('/:id', commentsController.UpdateComment);
router.post('/', commentsController.postComment);
router.delete('/:id', commentsController.deleteComment);
router.get('/:blog_id', commentsController.getCommentsOfBlog)



module.exports = router;