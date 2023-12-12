const BlogPost = require('../model/blogPost');

const createPost = async (postData) => {
    const newPost = new BlogPost(postData);
    await newPost.save();
    return newPost;
};

const getPosts = async () => {
    return BlogPost.find();
};

const getPostById = async (postId) => {
    return BlogPost.findById(postId);
};

const updatePost = async (postId, postData) => {
    return BlogPost.findByIdAndUpdate(postId, postData, { new: true });
};

const deletePost = async (postId) => {
    return BlogPost.findByIdAndDelete(postId);
};

const searchPosts = async (title) => {
    return BlogPost.find({ title: { $regex: new RegExp(title, 'i') } });
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    searchPosts,
};
