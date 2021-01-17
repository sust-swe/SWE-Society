const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const credentialController = require('../controllers/credentialController');

router.post('/login', credentialController.login);
router.post('/register',  userController.registerUser);
router.get('/:reg_no', userController.getSingleUser);
router.delete('/:reg_no', authController.protect, authController.restrictTo('superadmin', 'admin'), userController.deleteUser)
router.patch('/update', authController.protect, userController.updateUser);
router.patch('/setadmin', authController.protect, authController.restrictTo('superadmin', 'admin'), userController.setAdmin);
router.patch('/removeadmin/:reg_no', authController.protect, authController.restrictTo('superadmin', 'admin'), userController.removeAdmin);
router.get('/', userController.getAllUser);
router.post('/password/forgot', credentialController.forgotPassword);
router.patch('/password/update', authController.protect, credentialController.updatePassword);
router.patch('/password/reset/:token', credentialController.resetPassword);
router.post('/email/requestchange', authController.protect, credentialController.requestEmailChange);
router.patch('/email/change', authController.protect, credentialController.changeEmail);


module.exports = router;
//register->authController.protect,authController.restrictTo('superadmin','admin'),