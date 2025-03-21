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
                        className="add-transaction-close-button"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onHandleSubmit, onHandleError)}>
                    <div className="add-transaction-form-group">
                        <div className="add-transaction-input-icon">
                            <IndianRupee size={20} />
                        </div>
                        <div className="add-transaction-input-container">
                            <label htmlFor="amount">Amount</label>
                            <input
                                type="number"
                                id="amount"
                                {...register("amount", editTransactionValidation.amount)}
                                step="1"
                                className="add-transaction-form-input"
                            />
                            {errors.amount && (
                                <div className="add-transaction-error-message">
                                    {errors.amount.message}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="add-transaction-form-group">
                        <div className="add-transaction-input-icon">
                            <Tag size={20} color="blue" />
                        </div>
                        <div className="add-transaction-input-container">
                            <label htmlFor="category">Category</label>
                            <div className="add-transaction-radio-group">
                                <div className="add-transaction-radio-option">
                                    <input
                                        type="radio"
                                        id="expense"
                                        {...register("category", editTransactionValidation.category)}
                                        value="expense"
                                    />
                                    <label htmlFor="expense">Expense</label>
                                </div>
                                <div className="add-transaction-radio-option">
                                    <input
                                        type="radio"
                                        id="income"
                                        {...register("category", editTransactionValidation.category)}
                                        value="income"
                                    />
                                    <label htmlFor="income">Income</label>
                                </div>
                            </div>
                            {errors.category && (
                                <div className="add-transaction-error-message">
                                    {errors.category.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {selectedCategory === "expense" && (
                        <div className="add-transaction-form-group">
                            <div className="add-transaction-input-icon">
                                <Tag size={20} />
                            </div>
                            <div className="add-transaction-input-container">
                                <label>Expense Category</label>
                                <select
                                    className="add-transaction-form-select"
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
                                {errors.expenseType && (
                                    <div className="add-transaction-error-message">
                                        {errors.expenseType.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="add-transaction-form-group">
                        <div className="add-transaction-input-icon">
                            <MessageSquare size={20} color="purple" />
                        </div>
                        <div className="add-transaction-input-container">
                            <label htmlFor="comment">Comment</label>
                            <textarea
                                id="comment"
                                {...register("comment", editTransactionValidation.comment)}
                                placeholder="Add a comment (optional)"
                                rows="2"
                                className="add-transaction-form-textarea"
                            />
                        </div>
                    </div>

                    <div className="add-transaction-form-actions">
                        <button
                            type="submit"
                            className="add-transaction-submit-button"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="add-transaction-loading-spinner" />
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