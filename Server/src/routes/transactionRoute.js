import express from 'express'
import { addTransaction, getTransactions } from '../controllers/transactionController.js'
import authMiddleware from '../middlewares/auth.js'

const transactionRoute = express.Router()

transactionRoute.post('/add',authMiddleware,addTransaction)
transactionRoute.get('/get',authMiddleware,getTransactions)

export default transactionRoute