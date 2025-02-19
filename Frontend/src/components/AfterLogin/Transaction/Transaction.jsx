import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Edit, Trash2 } from 'lucide-react';
import './Transaction.css';
import { useContext, useState } from 'react';
import AddTransaction from '../EditTransactionPopUp/addTransaction';
import { StoreContext } from "../../../context/StoreContext"
import axios from 'axios';
import { toast } from 'react-toastify';

function Transaction() {

  const { url, token, transactions, refreshTransactions } = useContext(StoreContext)
  const [showAddTran, setShowAddTran] = useState(false);

  const handleTransactionDelete = async (id) => {
    try {
      const response = await axios.post(url + "/api/transaction/delete", { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        refreshTransactions()
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleTransactionEdit = async (id) => {
    try {
      const response = await axios.post(url + "/api/transaction/edit", { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        refreshTransactions()
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="transactions-container"
    >
      {showAddTran && <AddTransaction setShowAddTran={setShowAddTran} />}
      <div className="transactions-header">
        <h1 className="transactions-title">Transactions</h1>
        <button className="add-transaction-button" onClick={() => setShowAddTran(true)}>
          Add Transaction
        </button>
      </div>
      <div className="transactions-table-container">
        <div className="transactions-table-wrapper">
          <table className="transactions-table">
            <thead className="transactions-table-header">
              <tr>
                <th className="table-header-cell">Date</th>
                <th className="table-header-cell">Description</th>
                <th className="table-header-cell">Category</th>
                <th className="table-header-cell">Expense Category</th>
                <th className="table-header-cell">Amount</th>
                <th className="table-header-cell">Buttons</th>
              </tr>
            </thead>
            <tbody className="transactions-table-body">
              {transactions.map((transaction, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: '#F9FAFB' }}
                  className="transaction-row"
                >
                  <td className="table-cell date-cell">
                    {transaction.createdAt.substring(0, 10)}
                  </td>
                  <td className="table-cell description-cell">
                    {transaction.comment}
                  </td>
                  <td className="table-cell category-cell">
                    {transaction.category}
                  </td>
                  <td className="table-cell category-cell">
                    {transaction.expense_category}
                  </td>
                  <td className="table-cell amount-cell">
                    <div className="amount-container">
                      {transaction.category === 'income' ? (
                        <ArrowUpRight className="income-icon" />
                      ) : (
                        <ArrowDownRight className="expense-icon" />
                      )}
                      <span className={transaction.category === 'income' ? 'income-amount' : 'expense-amount'}>
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell action-cell">
                    <div
                      className="action-buttons"
                    >
                      <button
                        className="edit-button"
                        onClick={() => { handleTransactionEdit(transaction._id) }}
                        title="Edit transaction"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleTransactionDelete(transaction._id)}
                        title="Delete transaction"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export default Transaction;