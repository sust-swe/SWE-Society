
const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');

router.get('/:blog_id', blogsController.getOneBlog);
router.get('/', blogsController.getAllBlogs);
router.post('/', blogsController.postBlog);
router.patch('/approve/:blog_id', blogsController.approveBlog);
router.patch('/:blog_id', blogsController.updateBlog);
router.delete('/:blog_id', blogsController.deleteBlog);



module.exports = router;