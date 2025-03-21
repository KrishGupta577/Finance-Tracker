import { IndianRupee, MessageSquare, Tag, X } from "lucide-react";
import "./addTransaction.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { StoreContext } from "../../../context/StoreContext";

const Transaction = ({ setShowAddTran }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { url, token, refreshTransactions, expenseCategories } = useContext(StoreContext);
    const { register, watch, handleSubmit, formState: { errors } } = useForm();

    const selectedCategory = watch("category");

    const addTransactionValidation = {
        amount: { required: "Amount is Required" },
        category: { required: "Category is Required" },
        comment: {},
        expenseType: { required: "Expense Category is required" },
    };

    const onHandleError = (error) => { console.log(error); };

    const onHandleSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(url + "/api/transaction/add", data, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                await refreshTransactions();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => { setShowAddTran(false); }, 1000);
        }
    };

    return (
        <div className="add-transaction-backdrop">
            <div className="add-transaction-popup">
                <div className="add-transaction-header">
                    <h2>New Transaction</h2>
                    <button onClick={() => setShowAddTran(false)} className="add-transaction-close-button">
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
                                {...register("amount", addTransactionValidation.amount)}
                                placeholder="Enter amount"
                                required
                                step="1"
                                className="add-transaction-form-input"
                            />
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
                                    <input type="radio" id="expense" {...register("category", addTransactionValidation.category)} value="expense" />
                                    <label htmlFor="expense">Expense</label>
                                </div>
                                <div className="add-transaction-radio-option">
                                    <input type="radio" id="income" {...register("category", addTransactionValidation.category)} value="income" />
                                    <label htmlFor="income">Income</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {selectedCategory === "expense" && (
                        <div className="add-transaction-form-group">
                            <div className="add-transaction-input-icon">
                                <Tag size={20} />
                            </div>
                            <div className="add-transaction-input-container">
                                <label>Expense Category</label>
                                <select className="add-transaction-form-select" {...register("expenseType", addTransactionValidation.expenseType)}>
                                    <option value="">Select category</option>
                                    {expenseCategories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
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
                                {...register("comment", addTransactionValidation.comment)}
                                placeholder="A comment (optional)"
                                rows="2"
                                className="add-transaction-form-textarea"
                            />
                        </div>
                    </div>

                    <div className="add-transaction-form-actions">
                        <button type="submit" className="add-transaction-submit-button" disabled={isLoading}>
                            {isLoading ? <div className="add-transaction-loading-spinner" /> : 'Add Transaction'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Transaction;