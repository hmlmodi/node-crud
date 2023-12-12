const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const blogRoutes = require('./src/routes/blogRoutes');
const imageRoutes = require('./src/routes/imageRoute');
const crypto = require('crypto');

// // Generate a random string of 32 characters (you can adjust the length as needed)
// const jwtSecret = crypto.randomBytes(32).toString('hex');

// console.log('JWT_SECRET:', jwtSecret);



const app = express();
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/blog', blogRoutes);
app.use('/image', imageRoutes);



// const multer = require('multer');
// const path = require('path');

// // Set up multer to handle file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });


// app.post('/upload', upload.single('file'), (req, res) => {
//     try {
//         // Access the uploaded file using req.file
//         const uploadedFile = req.file;

//         if (!uploadedFile) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }

//         // Process the file as needed
//         // For example, you can save it to disk or upload it to S3

//         // Respond with a success message
//         res.json({ message: 'File uploaded successfully' });
//     } catch (error) {
//         console.error('Error uploading file:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
console.log("🚀 ~ file: app.js:37 ~ PORT:", PORT)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
