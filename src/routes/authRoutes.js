const express = require('express');
const { register, login } = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
    '/register',
    authMiddleware.registerSchema,
    register
);
router.post(
    '/login',
    // authMiddleware.loginSchema,
    login
);

module.exports = router;
