const express = require('express');
const router = express.Router();
const educationController = require('../controllers/educationController');
const authController = require('../controllers/authController');

router.post('/', authController.protect, educationController.createEducation);
router.get('/:reg_no', educationController.getEducationDetails);
router.patch('/:id', authController.protect, educationController.updateEducation);
router.delete('/:id', authController.protect, educationController.deleteEducation);

module.exports = router