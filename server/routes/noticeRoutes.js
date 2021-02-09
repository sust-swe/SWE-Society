const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const noticeController = require('../controllers/noticeController');

router.post('/', authController.protect, authController.restrictTo('admin', 'superadmin'), noticeController.createNotice);
router.get('/:id', noticeController.getNotice);
router.get('/', noticeController.getAllNotices);
router.patch('/:id', authController.protect, authController.restrictTo('admin', 'superadmin'), noticeController.updateNotice);
router.delete('/:id', authController.protect, authController.restrictTo('admin', 'superadmin'), noticeController.deleteNotice);

module.exports = router
