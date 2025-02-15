import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },

    phoneNumber: {
        type: String,
        default: ''
    },

    // Account Settings
    currency: {
        type: String,
        default: 'INR'
    },
    dateFormat: {
        type: Date,
        default: Date.now()
    },

}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model("user",userSchema)
export default userModel;