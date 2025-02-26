import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        trim: true,   // Automatically removes leading/trailing whitespace
      },
      password: {
        type: String,
        required: function() {
          return this.login_type === 'email'; // Password is required only if the login_type is "email"
        },
      },
      google_id: {
        type: String,
        required: function() {
          return this.login_type === 'google'; // Google ID is required if login_type is "google"
        },
      },
      name: {
        type: String,
        required: true
      },
      profile_picture_url: {
        type: String, 
        default:"/profile_photo.png"
      },
      login_type: {
        type: String,
        enum: ['email', 'google'], 
        required: true,
      },
      monthly_income:{
        type:Number,
        default:0,
        required:true
      },
      username:{
        type:String,
      },
    },
    {
      timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
    })


const userModel = mongoose.models.user || mongoose.model("user",userSchema)
export default userModel;