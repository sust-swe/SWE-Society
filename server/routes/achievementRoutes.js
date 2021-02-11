const express = require('express');
const app = require('../app');
const router = express.Router();
const achievementController = require('../controllers/achievementController');
const authController = require('../controllers/authController');


router.post('/', authController.protect, authController.restrictTo('admin', 'superadmin'), achievementController.addAchievement);
router.delete('/:id', authController.protect, authController.restrictTo('admin', 'superadmin'), achievementController.deleteAchievement);
router.get('/', achievementController.getAllAchievements);
router.patch('/:id', authController.protect, authController.restrictTo('admin', 'superadmin'), achievementController.updateAchievement)

module.exports = router;