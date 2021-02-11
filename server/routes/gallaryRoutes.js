const express = require('express');
const router = express.Router();
const gallaryController = require('../controllers/gallaryController');
const authController = require('../controllers/authController');

router.post('/', authController.protect, authController.restrictTo('admin', 'superadmin'), gallaryController.addContent);
router.delete('/:id', authController.protect, authController.restrictTo('admin', 'superadmin'), gallaryController.deleteContent);
router.patch('/:id', authController.protect, authController.restrictTo('admin', 'superadmin'), gallaryController.updateContent);
router.get('/:id', gallaryController.getSingleContent);
router.get('/', gallaryController.getALLContent);

module.exports = router;