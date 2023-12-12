const blogService = require('../service/blogService');

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = await blogService.createPost({ title, content });
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await blogService.getPosts();
        res.json({ posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await blogService.getPostById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedPost = await blogService.updatePost(id, { title, content });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await blogService.deletePost(id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully', post: deletedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const searchPosts = async (req, res) => {
    try {
        const { title } = req.query;
        const posts = await blogService.searchPosts(title);
        res.json({ posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    searchPosts,
};
