const express = require('express');
const router = express.Router();
const committeeController = require('../controllers/committeeController');
const authController = require('../controllers/authController');
const announcementController = require('../controllers/announcementController');


// router.post('/announcement', authController.protect, authController.restrictTo('admin', 'superadmin'), announcementController.createAnnouncement);
// router.patch('/announcement/:id', authController.protect, authController.restrictTo('admin', 'superadmin'), announcementController.updateAnnouncement);
// router.delete('/announcement/:id', authController.protect, authController.restrictTo('admin', 'superadmin'), announcementController.deleteAnnouncement);
// router.get('/announcement/:committee_order', authController.protect, announcementController.getAllAnnouncements);
router.post('/role', committeeController.addMemberToCommittee);
router.delete('/role', committeeController.removeMember);
router.patch('/role', committeeController.updateRole);
router.post('/', committeeController.createCommittee);
router.get('/:committee_order', committeeController.getExecutiveMembersOfACommittee);
router.get('/', committeeController.getCommittees);
router.patch('/', committeeController.updateCommittee);

module.exports = router