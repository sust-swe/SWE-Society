const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const AnnouncementController = require('../controllers/announcementController');

router.post('/', authController.protect, authController.restrictTo('admin', 'superadmin'), AnnouncementController.createAnnouncement);
router.get('/', AnnouncementController.getAllAnnouncements);
router.patch('/', authController.protect, authController.restrictTo('admin', 'superadmin'), AnnouncementController.updateAnnouncement);
router.delete('/', authController.protect, authController.restrictTo('admin', 'superadmin'), AnnouncementController.deleteAnnouncement);

module.exports = router