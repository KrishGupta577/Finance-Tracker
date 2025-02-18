import express from 'express'
import { addTransaction } from '../controllers/transactionController.js'

const transactionRoute = express.Router()

transactionRoute.post('/add',addTransaction)

export default transactionRoute