const express = require('express');
const {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    searchPosts,
} = require('../controller/blogController');
const authMiddleware = require('../middleware/blogMiddleware');

const router = express.Router();

router.post('/posts', createPost);
router.get('/posts', getPosts);
router.get('/posts/:id', getPostById);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);
router.get('/search', searchPosts);

module.exports = router;
