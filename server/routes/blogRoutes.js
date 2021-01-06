
const express = require('express');
const { __esModule } = require('xss-clean/lib/xss');
const router = express.Router();
const blogsController = require('../controllers/blogsController');


router.get('/', blogsController.getAll);
router.get('/:blogId', blogsController.getOne);
router.post('/', blogsController.post);
router.patch('/:blogId', blogsController.patch)
router.delete('/:blogId', blogsController.delete);


module.exports = router;