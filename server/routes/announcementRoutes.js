const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const AnnouncementController = require('../controllers/announcementController');


router.post('/', authController.protect,authController.restrictTo('admin', 'superadmin') ,AnnouncementController.createAnnouncement);
router.get('/:id', AnnouncementController.getAnnouncement);
router.get('/', AnnouncementController.getAllAnnouncements);
router.patch('/:id', authController.protect, authController.restrictTo('admin', 'superadmin'), AnnouncementController.updateAnnouncement);
router.delete('/:id', authController.protect, authController.restrictTo('admin', 'superadmin'), AnnouncementController.deleteAnnouncement);

module.exports = router
