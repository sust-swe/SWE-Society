
const express = require('express');
const router = express.Router();
const workExpController = require('../controllers/workExpController');

router.patch('/:workexp_id', workExpController.leaveWork);
router.post('/', workExpController.addWorkExp);
router.delete('/:workexp_id', workExpController.deleteWork);




module.exports = router;