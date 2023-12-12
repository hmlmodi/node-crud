const User = require('../model/users');

const createUser = async (userData) => {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
};

const getUserByEmail = async (email) => {
    return User.findOne({ email });
};

module.exports = {
    createUser,
    getUserByEmail,
};
