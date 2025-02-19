import transactionModel from "../models/transactionModel.js"

const addTransaction = async (req, res) => {
    try {
        const { userId, amount, category, expenseType, comment } = req.body
        console.log(req.body)

        const newTransaction = new transactionModel()

        if (comment) {
            newTransaction.userId = userId
            newTransaction.amount = amount;
            newTransaction.category = category;
            newTransaction.expense_category = expenseType;
            newTransaction.comment = comment;
        }
        else {
            newTransaction.userId = userId
            newTransaction.amount = amount;
            newTransaction.category = category;
            newTransaction.expense_category = expenseType;
        }

        await newTransaction.save()

        res.json({ success: true, message: "Transaction Added." })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

const getTransactions = async (req, res) => {
    try {
        const { userId } = req.body

        const transactions = await transactionModel.find({ userId })

        if (transactions) {
            res.json({ success: true, transactions })
        }

    } catch (error) {

    }
}

const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.body

        const transaction = await transactionModel.findByIdAndDelete({ _id: id })

        if (transaction) {
            res.json({ success: true, message: "Transaction successfully Deleted." })
        }
        else {
            res.json({ success: false, message: "Transaction deletion failed." })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

const editTransaction = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}

export { addTransaction, getTransactions, deleteTransaction, editTransaction }