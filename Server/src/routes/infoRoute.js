import express from "express"
import authMiddleware from "../middlewares/auth.js"
import { getInfo, sendInfo } from "../controllers/InfoController.js"

const infoRoute = express.Router()

infoRoute.get('/info',authMiddleware,sendInfo)
infoRoute.post('/getInfo',authMiddleware,getInfo)

export default infoRoute