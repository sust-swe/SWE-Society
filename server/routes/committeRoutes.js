const express = require('express');
const router = express.Router();
const committeeController = require('../controllers/committeeController');
const authController = require('../controllers/authController');
const announcementController = require('../controllers/announcementController');


// router.post('/announcement', authController.protect, authController.restrictTo('admin', 'superadmin'), announcementController.createAnnouncement);
// router.patch('/announcement/:id', authController.protect, authController.restrictTo('admin', 'superadmin'), announcementController.updateAnnouncement);
// router.delete('/announcement/:id', authController.protect, authController.restrictTo('admin', 'superadmin'), announcementController.deleteAnnouncement);
// router.get('/announcement/:committee_order', authController.protect, announcementController.getAllAnnouncements);
router.post('/role', authController.protect, authController.restrictTo('admin', 'superadmin'), committeeController.addMemberToCommittee);
router.delete('/role/:reg_no', authController.protect, authController.restrictTo('admin', 'superadmin'), committeeController.removeMember);
router.patch('/role', authController.protect, authController.restrictTo('admin', 'superadmin'), committeeController.updateRole);
router.post('/', authController.protect, authController.restrictTo('superadmin'), committeeController.createCommittee);
router.get('/current', authController.protect, committeeController.getExecutiveMembersOfCurrentCommittee);
router.get('/:committee_order', authController.protect, committeeController.getExecutiveMembersOfACommittee);
router.get('/', authController.protect, committeeController.getCommittees);
router.patch('/', authController.protect, authController.restrictTo('admin', 'superadmin'), committeeController.updateCommittee);

module.exports = router