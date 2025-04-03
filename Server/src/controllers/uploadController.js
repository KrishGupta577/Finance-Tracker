import cloudinary from '../config/cloudinary.js';
import userModel from '../models/userModel.js';

const uploadProfilePhoto = async (req, res) => {

    const { userId } = req.body

    try {

        if (!userId) {
            return res.status(400).json({ success: false, message: "Not authorized" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Validation: Check if file exists before accessing buffer
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Upload image to Cloudinary using a Promise
        const uploadToCloudinary = () => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'profile_pictures' },
                    (error, cloudinaryResult) => {
                        if (error) return reject(error);
                        resolve(cloudinaryResult);
                    }
                );
                uploadStream.end(req.file.buffer); // Upload from memory
            });
        };

        // Wait for Cloudinary upload to complete
        const cloudinaryResult = await uploadToCloudinary();

        // Send success response
        // res.json({
        //     success: true,
        //     message: "Profile Photo Uploaded",
        //     imageUrl: cloudinaryResult.secure_url
        // });

        user.profile_picture_url = cloudinaryResult.secure_url;
        await user.save();

        if (!user) {
            return res.json({ success: false, message: 'Profile Photo Not Updated' })
        }

        res.json({ success: true, message: 'Profile Photo Updated' })

    } catch (error) {
        return res.json({ success: false, message: 'Error' })
        console.log(error)
    }
};

export { uploadProfilePhoto }


