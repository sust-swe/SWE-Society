const express = require('express');
const app = require('../app');
const router = express.Router();
const achievementController = require('../controllers/achievementController');
const authController = require('../controllers/authController');


router.post('/',authController.protect, achievementController.addAchievement);
router.delete('/:id',authController.protect, achievementController.deleteAchievement);
router.get('/user/:reg_no', achievementController.getSpecificUserAchievements);
router.get('/:id', achievementController.getSingleAchievement);
router.get('/', achievementController.getAllAchievement);

module.exports = router;