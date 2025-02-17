import express from "express"
import cors from 'cors'
import dotenv from "dotenv"
import { connectDB } from "./src/config/db.js"
import userRouter from "./src/routes/userRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

connectDB()

app.use("/api/user",userRouter)

app.get('/',(req,res) => {
    res.send("Welcome to the Finance Tracker")
})

app.listen(PORT,() => {
    console.log(`Server started on http://localhost:${PORT}`);
    
})
