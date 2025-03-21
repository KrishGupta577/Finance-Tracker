import express from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/auth.js';
import { uploadProfilePhoto } from '../controllers/uploadController.js';

const uploadRouter = express.Router();

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

const handleMulterErrors = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Handle Multer-specific errors
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.json({ success: false, message: 'File Size limit 2MB' })
        }
    } else if (err) {
        // Handle custom errors from fileFilter
        return res.json({ success: false, message: err })
    }
    next();
};

uploadRouter.post(
    '/profile-photo',
    (req, res, next) => {
        upload.single('profile_picture')(req, res, (err) => {
            if (err) {
                return handleMulterErrors(err, req, res, next);
            }
            next();
        });
    },
    authMiddleware,
    uploadProfilePhoto
);

export default uploadRouter

