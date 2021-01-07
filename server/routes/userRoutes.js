const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/register', authController.protect,authController.restrictTo('superadmin','admin'),authController.register);
router.post('/login', authController.login);
router.post('/forgotPassword',authController.protect,authController.forgotPassword);
router.patch('/updatePassword',authController.protect,authController.updatePassword);

router.get('/:reg_no', userController.getSinleUser);
router.get('/', userController.getAllUser);
router.patch('/:reg_no', userController.updateUser);

module.exports = router;