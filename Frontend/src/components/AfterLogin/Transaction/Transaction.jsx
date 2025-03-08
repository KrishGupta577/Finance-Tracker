import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Edit, Trash2 } from 'lucide-react';
import './Transaction.css';
import { useContext, useState } from 'react';
import AddTransaction from '../EditTransactionPopUp/addTransaction';
import EditTransaction from '../EditTransactionPopUp/EditTransaction';
import { StoreContext } from "../../../context/StoreContext"
import axios from 'axios';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';

function Transaction() {

  const { register, watch,formState: { errors } } = useForm();
  const { url, token, transactions, refreshTransactions } = useContext(StoreContext)
  const [showAddTran, setShowAddTran] = useState(false);
  const [editTransactionId, setEditTransactionId] = useState(null);
  const sortBy = watch('sortBy')
  const sortOrder = watch('sortOrder')

  const sortedTransactions = () => {
    const sortedData = [...transactions];
    if (sortBy && sortOrder) {
      sortedData.sort((a, b) => {
        const fieldA = a[sortBy];
        const fieldB = b[sortBy];

        if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortedData;
  };

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="transactions-container"
    >
      {showAddTran && <AddTransaction setShowAddTran={setShowAddTran} />}

      <div className="transactions-header">
        <div className="sort-controls">
          <div className="sort-group">
            <label htmlFor="sortBy" className="sort-label">
              Sort by:
            </label>
            <select
              id="sortBy"
              name='sortBy' {...register('sortBy')}
              className="sort-select"
            >
              <option value="date">Date</option>
              <option value="comment">Description</option>
              <option value="category">Category</option>
              <option value="expense_category">Expense Category</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="sort-group">
            <label htmlFor="sortOrder" className="sort-label">
              Order:
            </label>
            <select
              id="sortOrder"
              name='sortOrder'  {...register('sortOrder')}
              className="sort-select"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <button className="add-transaction-button" onClick={() => setShowAddTran(true)}>
          Add Transaction
        </button>
      </div>
      <div className="transactions-table-container">
        <div className="transactions-table-wrapper">
          <table className="transactions-table">
            <thead className="transactions-table-header">
              <tr>
                <th className="table-header-cell">Date (M/D/Y)</th>
                <th className="table-header-cell">Description</th>
                <th className="table-header-cell">Category</th>
                <th className="table-header-cell">Expense Category</th>
                <th className="table-header-cell">Amount</th>
                <th className="table-header-cell">Buttons</th>
              </tr>
            </thead>
            <tbody className="transactions-table-body">
              {sortedTransactions().map((transaction, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: '#F9FAFB' }}
                  className="transaction-row"
                >
                  <td className="table-cell date-cell">
                  {new Date(transaction.date).toLocaleDateString()}
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
                        <ArrowUpRight className="income-icon" color='green' />
                      ) : (
                        <ArrowDownRight className="expense-icon" color='red' />
                      )}
                      <span className={transaction.category === 'income' ? 'income-amount' : 'expense-amount'}>
                        &#8377;{Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell action-cell">
                    <div className="action-buttons">
                      <button
                        className="edit-button"
                        onClick={() => setEditTransactionId(transaction._id)}
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
      {editTransactionId && (
        <EditTransaction
          setShowEditTran={() => setEditTransactionId(null)}
          id={editTransactionId}
        />
      )}
    </motion.div>
  );
}

export default Transaction;