import express from "express"
import { adminLogin, changeTheme, sendAdminInfo, transactionsList, usersList } from "../controllers/adminController.js"
import authMiddleware from '../middlewares/auth.js'

const adminRouter = express.Router()

adminRouter.post('/login', adminLogin)
adminRouter.post('/usersList', authMiddleware, usersList)
adminRouter.post('/transactionsList', authMiddleware, transactionsList)
adminRouter.post('/preferences', authMiddleware, changeTheme)
adminRouter.get('/admin-info', authMiddleware, sendAdminInfo)

export default adminRouter