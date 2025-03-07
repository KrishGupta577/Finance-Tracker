import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["expense", "income"]
    },
    comment: {
        type: String,
        default: ""
    },
    expense_category:{
        type:String,
        required:function () {
            this.category === "expense"
        }
    },
    date:{
        type:Date,
        default:Date.now()
    }
}, { timestamps: true })

const transactionModel = mongoose.models.transaction || mongoose.model("transaction",transactionSchema)
export default transactionModel;