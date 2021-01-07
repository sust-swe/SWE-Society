const express = require('express');
const { __esModule } = require('xss-clean/lib/xss');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/', userController.getUser);

module.exports = router;