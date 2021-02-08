const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const announcementController = require('../controllers/announcementController');

router.post('/', authController.protect, authController.restrictTo('admin', 'superadmin'), announcementController.createAnnouncement);
router.get('/', announcementController.getAllAnnouncements);

router.patch('/:id', authController.protect, authController.restrictTo('admin', 'superadmin'), announcementController.updateAnnouncement);

router.delete('/:id', authController.protect, authController.restrictTo('admin', 'superadmin'), announcementController.deleteAnnouncement);

module.exports = router
