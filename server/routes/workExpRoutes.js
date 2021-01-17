
const express = require('express');
const router = express.Router();
const workExpController = require('../controllers/workExpController');
const authController = require('../controllers/authController');

router.patch('/:workexp_id',authController.protect, workExpController.leaveWork);
router.post('/',authController.protect, workExpController.addWorkExp);
router.delete('/:workexp_id',authController.protect, workExpController.deleteWork);




module.exports = router;