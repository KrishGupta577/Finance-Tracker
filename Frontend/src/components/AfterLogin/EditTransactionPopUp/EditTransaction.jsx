import { IndianRupee, MessageSquare, Tag, X } from "lucide-react"
import "./addTransaction.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { StoreContext } from "../../../context/StoreContext"

const EditTransaction = ({ setShowEditTran, id }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { url, token, refreshTransactions, transactions } = useContext(StoreContext);

    const transaction = transactions.find(transaction => transaction._id === id);

    const { register, watch, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            amount: Math.abs(transaction.amount),
            category: transaction.category,
            ...(transaction.category === 'expense' && {
                expenseType: transaction.expense_category
            }),
            comment: transaction.comment,
        }
    });

    const selectedCategory = watch("category");

    const editTransactionValidation = {
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

    const onHandleError = (error) => {
        console.log(error);
    }

    const onHandleSubmit = async (data) => {
        setIsLoading(true)
        try {
            const response = await axios.post(url + "/api/transaction/edit", { data, id }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                await refreshTransactions()
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setShowEditTran(false)
            }, 1000);
        }
    }

    return (
        <div className="add-transaction-backdrop">
            <div className="add-transaction-popup">
                <div className="add-transaction-header">
                    <h2>Edit Transaction</h2>
                    <button
                        onClick={() => setShowEditTran(false)}
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
                                {...register("amount", editTransactionValidation.amount)}
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
                                        {...register("category", editTransactionValidation.category)}
                                        value="expense"
                                    />
                                    <label htmlFor="expense">Expense</label>
                                </div>
                                <div className="radio-option">
                                    <input
                                        type="radio"
                                        id="income"
                                        {...register("category", editTransactionValidation.category)}
                                        value="income"
                                    />
                                    <label htmlFor="income">Income</label>
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
                                    {...register("expenseType", editTransactionValidation.expenseType)}
                                >
                                    <option value="">Select category</option>
                                    {expenseCategories.map((category) => (
                                        <option
                                            key={category}
                                            value={category.toLowerCase()}
                                        >
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="form-group">
                        <div className="input-icon">
                            <MessageSquare size={20} color="purple" />
                        </div>
                        <div className="input-container">
                            <label htmlFor="comment">Comment</label>
                            <textarea
                                id="comment"
                                {...register("comment", editTransactionValidation.comment)}
                                placeholder="Add a comment (optional)"
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
                                'Update Transaction'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTransaction;