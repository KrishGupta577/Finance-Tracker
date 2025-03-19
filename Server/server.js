import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from 'cors'
import { connectDB } from "./src/config/db.js"
import userRouter from "./src/routes/userRoutes.js"
import infoRoute from "./src/routes/infoRoute.js"
import transactionRoute from "./src/routes/transactionRoute.js"
import adminRouter from "./src/routes/adminRoute.js"
import uploadRouter from "./src/routes/uploadRoutes.js"

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

connectDB()

app.use("/api/user",userRouter)
app.use("/api/user",infoRoute)
app.use("/api/transaction",transactionRoute)
app.use("/api/admin",adminRouter)
app.use('/api',uploadRouter)

app.get('/',(req,res) => {
    res.send("Welcome to the Finance Tracker")
})

app.listen(PORT,() => {
    console.log(`Server started on http://localhost:${PORT}`);
    
})
