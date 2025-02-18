import express from "express"
import authMiddleware from "../middlewares/auth.js"
import { sendInfo } from "../controllers/InfoController.js"

const infoRoute = express.Router()

infoRoute.get('/info',authMiddleware,sendInfo)

export default infoRoute