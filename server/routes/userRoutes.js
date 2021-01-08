const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgotpassword',authController.forgotPassword);
router.patch('/updatepassword',authController.protect,authController.updatePassword);
router.patch('/resetpassword/:token',authController.resetPassword);

router.get('/:reg_no', userController.getSingleUser);
router.get('/', userController.getAllUser);
router.patch('/',authController.protect, userController.updateUser);


module.exports = router;
//register->authController.protect,authController.restrictTo('superadmin','admin'),