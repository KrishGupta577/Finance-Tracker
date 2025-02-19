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

}

export { addTransaction, getTransactions }