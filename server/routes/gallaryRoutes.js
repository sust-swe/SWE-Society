const express = require('express');
const router = express.Router();
const gallaryController = require('../controllers/gallaryController');

router.post('/', gallaryController.addContent);
router.delete('/:id', gallaryController.deleteContent);
router.patch('/:id', gallaryController.updateContent);
router.get('/:id', gallaryController.getSingleContent);
router.get('/', gallaryController.getALLContent);

module.exports = router;