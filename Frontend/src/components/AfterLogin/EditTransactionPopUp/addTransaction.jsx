import { IndianRupee, MessageSquare, Tag, X } from "lucide-react"
import "./addTransaction.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext, useState } from "react";
import { useForm } from "react-hook-form"
import { StoreContext } from "../../../context/StoreContext"

const Transaction = ({ setShowAddTran }) => {

    const [isLoading, setIsLoading] = useState(false);
    const { url, token } = useContext(StoreContext)
    const { register, watch, handleSubmit, formState: { errors } } = useForm();

    const selectedCategory = watch("category");

    const addTransactionValidation = {
        amount: {
            required: "Amount is Required",
        },
        category: {
            required: "Category is Required",
        },
        comment: {},
        expenseType: {
            required: "Expense Category is required"
        },
    }

    const expenseCategories = [
        "Entertainment",
        "Food",
        "Transportation",
        "Shopping",
        "Bills",
        "Healthcare",
        "Education",
        "Other"
    ];

    const onHandleError = (error) => { console.log(error) }

    const onHandleSubmit = async (data) => {
        setIsLoading(false)
        console.log(token)
        try {
            const response = await axios.post(url + "/api/transaction/add", data, { headers: {token} })
            console.log(response)
        } catch (error) {

        }
    }

    return (
        <div className="add-transaction-backdrop">
            <div className="add-transaction-popup">
                <div className="add-transaction-header">
                    <h2> new Trnsaction</h2>
                    <button onClick={() => { setShowAddTran(false) }}
                        className="close-button"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onHandleSubmit, onHandleError)}>
                    <div className="form-group">
                        <div className="input-icon">
                            <IndianRupee size={20} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="amount">Amount</label>
                            <input
                                type="number"
                                id="amount"
                                name="amount" {...register("amount", addTransactionValidation.amount)}
                                placeholder="Enter amount"
                                required
                                step="1"
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-icon">
                            <Tag size={20} color="blue" />
                        </div>
                        <div className="input-container">
                            <label htmlFor="category">Category</label>
                            <div className="radio-group">
                                <div className="radio-option">
                                    <input
                                        type="radio"
                                        id="expense"
                                        name="category" {...register("category", addTransactionValidation.category)}
                                        value="expense"
                                    />
                                    <label htmlFor="expense">
                                        Expense
                                    </label>
                                </div>
                                <div className="radio-option">
                                    <input
                                        type="radio"
                                        id="income"
                                        name="category" {...register("category", addTransactionValidation.category)}
                                        value="income"
                                    />
                                    <label htmlFor="income">
                                        Income
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {selectedCategory === "expense" && (
                        <div className="form-group">
                            <div className="input-icon">
                                <Tag size={20} />
                            </div>
                            <div className="input-container">
                                <label>Expense Category</label>
                                <select
                                    className="form-select"
                                    {...register("expenseType", addTransactionValidation.expenseType)}
                                >
                                    <option value="">Select category</option>
                                    {expenseCategories.map((category) => (
                                        <option key={category} value={category.toLowerCase()}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>)}


                    <div className="form-group">
                        <div className="input-icon">
                            <MessageSquare size={20} color="purple" />
                        </div>
                        <div className="input-container">
                            <label htmlFor="comment">Comment</label>
                            <textarea
                                id="comment"
                                name="comment" {...register("comment", addTransactionValidation.comment)}
                                placeholder=" a comment (optional)"
                                rows="2"
                                className="form-textarea"
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="loading-spinner" />
                            ) : (
                                'Add Transaction'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Transaction 