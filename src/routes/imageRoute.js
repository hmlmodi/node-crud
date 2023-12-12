const express = require('express');
const { uploadImage, getImageUrl } = require('../controller/imageController');
// const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/upload', uploadImage);

module.exports = router;
