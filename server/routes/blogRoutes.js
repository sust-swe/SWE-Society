
const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');

router.get('/:blog_id', blogsController.getOne);
router.get('/', blogsController.getAll);
router.post('/', blogsController.post);
router.patch('/:blog_id', blogsController.patch)
router.delete('/:blog_id', blogsController.delete);


module.exports = router;