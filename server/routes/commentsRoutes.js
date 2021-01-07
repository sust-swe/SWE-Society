
const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');


router.get('/', blogsController.getAll);
router.get('/:blogId', blogsController.getOne);
router.post('/', blogsController.post);
router.patch('/:blogId', blogsController.patch)
router.delete('/:blogId', blogsController.delete);


module.exports = router;