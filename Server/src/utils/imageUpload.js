import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Max file size: 2MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type. Only .jpg, .jpeg, and .png are allowed!'));
        }

        cb(null, true);
    }
}).single("profile_picture"); // Single file upload

export default upload