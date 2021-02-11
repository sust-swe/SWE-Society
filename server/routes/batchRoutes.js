const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const batchController = require('../controllers/batchController');


router.post('/', authController.protect, authController.restrictTo('admin', 'superadmin'), batchController.createBatch);
//router.get('/:year', batchController.getStudentsOfAbatch);
router.get('/:year', batchController.getSpecificBatchsWithStudents);
router.get('/', batchController.getAllBatches);

router.patch('/:year', authController.protect, authController.restrictTo('admin', 'superadmin'), batchController.updateBatch);
router.delete('/:year', authController.protect, authController.restrictTo('admin', 'superadmin'), batchController.deleteBatch);

module.exports = router