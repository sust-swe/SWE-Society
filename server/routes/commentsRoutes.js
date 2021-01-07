
const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

router.patch('/:comment_id', commentsController.UpdateComment);
router.post('/', commentsController.postComment);
router.delete('/:comment_id', commentsController.deleteComment);
router.get('/:blog_id', commentsController.getAllComments)



module.exports = router;