
const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');

router.get('/:id', blogsController.getOneBlog);
router.get('/user/:reg_no', blogsController.getSpecificUsersBlogs);
router.get('/', blogsController.getAllBlogs);
router.post('/', blogsController.postBlog);
router.patch('/approve/:id', blogsController.approveBlog);
router.patch('/:id', blogsController.updateBlog);
router.delete('/:id', blogsController.deleteBlog);



module.exports = router;