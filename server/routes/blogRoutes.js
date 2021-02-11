
const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');
const authController = require('../controllers/authController');


router.get('/user/:reg_no', authController.protect, blogsController.getSpecificUsersBlogs);
router.get('/true', authController.protect, blogsController.getAllApprovedBlogs);
router.get('/false/:id', authController.protect, authController.restrictTo('admin', 'superadmin'), blogsController.getOneNotApprovedBlog);
router.get('/false', authController.protect, authController.restrictTo('admin', 'superadmin'), blogsController.getAllNotApprovedBlogs);
router.get('/:id', authController.protect, blogsController.getOneBlog);
router.post('/', authController.protect, blogsController.postBlog);
router.patch('/approve/:id', authController.protect, authController.restrictTo('admin', 'superadmin'), blogsController.approveBlog);
router.patch('/:id', authController.protect, blogsController.updateBlog);
router.delete('/:id', authController.protect, blogsController.deleteBlog);



module.exports = router;