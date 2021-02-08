const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');


router.post('/',authController.protect,authController.restrictTo('admin', 'superadmin') ,eventController.createEvent);
router.delete('/:id',authController.protect,authController.restrictTo('admin', 'superadmin') , eventController.deleteEvent);
router.patch('/:id',authController.protect, authController.restrictTo('admin', 'superadmin'), eventController.updateEvent);
router.get('/:id', eventController.getEvent);
router.get('/', eventController.getAllEvents);

module.exports = router;