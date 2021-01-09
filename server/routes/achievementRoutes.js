const express = require('express');
const app = require('../app');
const router = express.Router();
const achievementController = require('../controllers/achievementController');


router.post('/', achievementController.addAchievement);
router.delete('/:achievement_id', achievementController.deleteAchievement);
router.get('/user/:user_id', achievementController.getSpecificUserAchievements);
router.get('/:achievement_id', achievementController.getSingleAchievement);
router.get('/', achievementController.getAllAchievement);

module.exports = router;