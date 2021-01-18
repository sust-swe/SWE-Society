
const express = require('express');
const router = express.Router();
const workExperienceController = require('../controllers/workExperienceController');
const authController = require('../controllers/authController');

router.patch('/:workexp_id', authController.protect, workExperienceController.leaveWork);
router.post('/', authController.protect, workExperienceController.addWorkExp);
router.delete('/:workexp_id', authController.protect, workExperienceController.deleteWork);




module.exports = router;