const express = require('express');
const router = express.Router();
const credentialController = require('../controllers/credentialController');
const authController = require('../controllers/authController');

router.post('/forgot', credentialController.forgotPassword);
router.patch('/update', authController.protect, credentialController.updatePassword);
router.patch('/reset/:token', credentialController.resetPassword);
router.post('/requestchange', authController.protect, credentialController.requestEmailChange);
router.patch('/change', authController.protect, credentialController.changeEmail);

module.exports = router;
//register->credentialController.protect,credentialController.restrictTo('superadmin','admin'),