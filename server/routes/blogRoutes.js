
const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');
const authController = require('../controllers/authController');

router.get('/:id',authController.protect, blogsController.getOneBlog);
router.get('/user/:reg_no',authController.protect, blogsController.getSpecificUsersBlogs);
router.get('/',authController.protect, blogsController.getAllBlogs);
router.post('/',authController.protect, blogsController.postBlog);
router.patch('/approve/:id',authController.protect,authController.restrictTo('admin', 'superadmin'), blogsController.approveBlog);
router.patch('/:id',authController.protect, blogsController.updateBlog);
router.delete('/:id',authController.protect, blogsController.deleteBlog);



module.exports = router;