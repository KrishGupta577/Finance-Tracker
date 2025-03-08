import express from 'express'
import { changeTheme, registerUser, userDelete, userGoogleLogin, userLogin } from '../controllers/userController.js'
import authMiddleware from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',userLogin)
userRouter.post('/google-login',userGoogleLogin)
userRouter.post('/delete',authMiddleware,userDelete)
userRouter.post('/preferences',authMiddleware,changeTheme)

export default userRouter