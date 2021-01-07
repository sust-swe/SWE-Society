const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/:reg_no', userController.getSinleUser);
router.get('/', userController.getAllUser);
router.patch('/:reg_no', userController.updateUser);

module.exports = router;