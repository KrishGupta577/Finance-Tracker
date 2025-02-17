import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const dbConnectionString = process.env.DB_CONNECTION_STRING

export const connectDB = async () => {
    await mongoose.connect(dbConnectionString).then(() => console.log("DB connected")).catch("error")
}