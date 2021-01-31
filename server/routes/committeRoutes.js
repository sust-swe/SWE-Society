const express = require('express');
const router = express.Router();
const committeeController = require('../controllers/committeeController');
const authController = require('../controllers/authController');
const announcementController = require('../controllers/announcementController');


router.post('/announcement', authController.protect, authController.restrictTo('admin', 'superadmin'), announcementController.createAnnouncement);
router.patch('/announcement/:id', authController.protect, authController.restrictTo('admin', 'superadmin'), announcementController.updateAnnouncement);
router.delete('/announcement/:id', authController.protect, authController.restrictTo('admin', 'superadmin'), announcementController.deleteAnnouncement);
router.get('/announcement/:committee_order', authController.protect,  announcementController.getAllAnnouncements);
router.post('/',authController.protect, authController.restrictTo('admin', 'superadmin'), committeeController.createCommittee);
router.get('/:committee_order',authController.protect, committeeController.getExecutiveMembersOfACommittee);
router.patch('/:committee_order',authController.protect, authController.restrictTo('admin', 'superadmin'), committeeController.updateCommittee);
router.delete('/:committee_order', authController.protect, authController.restrictTo('admin', 'superadmin'), committeeController.deleteCommittee);

module.exports = router