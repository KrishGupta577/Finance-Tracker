import express from 'express'
import { addTransaction, deleteTransaction, editTransaction, getTransactions } from '../controllers/transactionController.js'
import authMiddleware from '../middlewares/auth.js'

const transactionRoute = express.Router()

transactionRoute.post('/add',authMiddleware,addTransaction)
transactionRoute.get('/get',authMiddleware,getTransactions)
transactionRoute.post('/delete',authMiddleware,deleteTransaction)
transactionRoute.post('/edit',authMiddleware,editTransaction)

export default transactionRoute