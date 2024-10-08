const authMiddleware = require('../middlewares/authMiddleware');
const postController = require('../controllers/postController');
const express = require('express');

const router = express.Router();

router.get('/all',postController.getAll);
router.post('/create', authMiddleware, postController.createPost);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;