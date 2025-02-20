import transactionModel from "../models/transactionModel.js"

const addTransaction = async (req, res) => {
    try {
        const { userId, amount, category, expenseType, comment } = req.body

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

const editTransaction = async (req, res) => {
    try {
        const { id, data, userId } = req.body
        const { amount, category, expenseType, comment } = data
        console.log(req.body)

        if (category === 'income') {
            const transaction = await transactionModel.findByIdAndUpdate(
                { _id: id },
                {
                    userId,
                    amount: amount,
                    category: category,
                    expense_category: "",
                    comment: comment,
                })
            if (transaction) {
                res.json({ success: true, message: "Transaction Updated." })
            }
            else {
                res.json({ success: false, message: "Transaction Updation Failed" })
            }
        }
        else {
            const transaction = await transactionModel.findByIdAndUpdate(
                { _id: id },
                {
                    userId,
                    amount: amount,
                    category: category,
                    expense_category: expenseType,
                    comment: comment,
                })
            if (transaction) {
                res.json({ success: true, message: "Transaction Updated." })
            }
            else {
                res.json({ success: false, message: "Transaction Updation Failed" })
            }
        }



    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

export { addTransaction, getTransactions, deleteTransaction, editTransaction }