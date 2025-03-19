import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

const router = express.Router();

// Multer Storage (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Max file size: 2MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only .jpg, .jpeg, and .png files are allowed!'), false);
        }
        cb(null, true);
    }
});

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        // Validation: Check if file exists
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload_stream(
            { folder: 'profile_pictures' },
            (error, cloudinaryResult) => {
                if (error) {
                    return res.status(500).json({ error: 'Upload to Cloudinary failed' });
                }
                res.json({ imageUrl: cloudinaryResult.secure_url , success:true, message: "Profile Photo Uploaded"});
            }
        ).end(req.file.buffer); // Upload from memory

    } catch (error) {
        res.status(500).json({ error: error.message || 'Upload failed' });
    }
});

export default router;
