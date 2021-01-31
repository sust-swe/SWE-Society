const express = require('express');
const app = require('../app');
const router = express.Router();
const authController = require('../controllers/authController');
const imageUploadController = require('../controllers/imageUploadController');

router.post('/', authController.protect, imageUploadController.UpdateImage);

module.exports = router