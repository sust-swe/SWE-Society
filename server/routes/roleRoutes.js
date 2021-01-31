const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const authController = require('../controllers/authController');

router.post('/',authController.protect, authController.restrictTo('admin', 'superadmin'), roleController.addMemberToCommittee);
router.delete('/',authController.protect, authController.restrictTo('admin', 'superadmin'), roleController.removeMember);
router.patch('/', authController.protect, authController.restrictTo('admin', 'superadmin'), roleController.updateRole);

module.exports = router;