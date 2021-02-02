
const express = require('express');
const router = express.Router();
const workExperienceController = require('../controllers/workExperienceController');
const authController = require('../controllers/authController');

router.patch('/:id', authController.protect, workExperienceController.updateWork);
router.post('/', authController.protect, workExperienceController.addWorkExp);
router.delete('/:id', authController.protect, workExperienceController.deleteWork);
router.get('/:reg_no', authController.protect, workExperienceController.getWorkExperiences);


module.exports = router;