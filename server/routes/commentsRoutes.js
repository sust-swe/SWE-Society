
const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

router.patch('/:comment_id', commentsController.UpdateComment);
router.post('/', commentsController.postComment);



module.exports = router;