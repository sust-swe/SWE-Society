const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


router.post('/register', authController.protect, authController.restrictTo('superadmin', 'admin'), userController.registerUser);
router.post('/login', userController.login);
router.get('/:reg_no', userController.getSingleUser);
router.get('/', userController.getAllUser);
router.patch('/update', authController.protect, userController.updateUser);


module.exports = router;
//register->authController.protect,authController.restrictTo('superadmin','admin'),