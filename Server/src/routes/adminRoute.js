import express from "express"
import { adminLogin, transactionsList, usersList } from "../controllers/adminController.js"
import authMiddleware from '../middlewares/auth.js'

const adminRouter = express.Router()

adminRouter.post('/login',adminLogin)
adminRouter.post('/usersList',authMiddleware,usersList)
adminRouter.post('/transactionsList',authMiddleware,transactionsList)

export default adminRouter