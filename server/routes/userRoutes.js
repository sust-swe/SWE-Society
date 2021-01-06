const express = require('express');
const { __esModule } = require('xss-clean/lib/xss');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUser);

module.exports = router;