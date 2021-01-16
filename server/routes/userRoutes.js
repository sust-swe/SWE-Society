const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


router.post('/register', authController.protect, authController.restrictTo('superadmin', 'admin'), userController.registerUser);
router.post('/login', userController.login);
router.get('/:reg_no', userController.getSingleUser);
router.delete('/:reg_no', authController.protect, authController.restrictTo('superadmin', 'admin'), userController.deleteUser)
router.patch('/update', authController.protect, userController.updateUser);
router.patch('/setadmin', authController.protect, authController.restrictTo('superadmin', 'admin'), userController.setAdmin);
router.patch('/removeadmin/:reg_no', authController.protect, authController.restrictTo('superadmin', 'admin'), userController.removeAdmin);
router.get('/', userController.getAllUser);


module.exports = router;
//register->authController.protect,authController.restrictTo('superadmin','admin'),