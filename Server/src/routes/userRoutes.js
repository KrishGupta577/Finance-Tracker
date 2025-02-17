import express from 'express'
import { registerUser, userGoogleLogin, userLogin } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',userLogin)
userRouter.post('/google-login',userGoogleLogin)

export default userRouter