import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://krishnagupta2022:krish67890@cluster0.btmah.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log("DB connected")).catch("error")
}