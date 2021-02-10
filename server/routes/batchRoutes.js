const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const batchController = require('../controllers/batchController');


router.post('/', batchController.createBatch);
//router.get('/:year', batchController.getStudentsOfAbatch);
router.get('/:year', batchController.getSpecificBatchsWithStudents);
router.get('/', batchController.getAllBatches);

router.patch('/:year', batchController.updateBatch);
router.delete('/:year', batchController.deleteBatch);

module.exports = router