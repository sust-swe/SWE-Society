const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

router.post('/', roleController.addMemberToCommittee);
router.delete('/', roleController.removeMember);
// router.get('/:user_id', );

module.exports = router;