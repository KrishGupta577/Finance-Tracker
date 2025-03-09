import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    name: {
        type: String,
    },
    phone_number: {
        type: String,
    },
    preferences: {
        theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    }
})

const adminModel = mongoose.models.admin || mongoose.model('admin', adminSchema)

export default adminModel