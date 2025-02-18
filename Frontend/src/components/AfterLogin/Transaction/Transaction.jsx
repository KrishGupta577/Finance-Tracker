import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import './Transaction.css';
import { useState } from 'react';
import AddTransaction from '../EditTransactionPopUp/addTransaction';

const transactions = [
  { id: 1, type: 'expense', description: 'Grocery Shopping', amount: -120.50, date: '2024-03-10', category: 'Food' },
  { id: 2, type: 'income', description: 'Salary Deposit', amount: 3000.00, date: '2024-03-09', category: 'Salary' },
  { id: 3, type: 'expense', description: 'Netflix Subscription', amount: -15.99, date: '2024-03-08', category: 'Entertainment' },
  { id: 4, type: 'expense', description: 'Electric Bill', amount: -85.00, date: '2024-03-07', category: 'Utilities' },
  { id: 5, type: 'income', description: 'Freelance Payment', amount: 500.00, date: '2024-03-06', category: 'Freelance' },
];

function Transaction() {
  const [showAddTran, setShowAddTran] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="transactions-container"
    >
      {showAddTran && <AddTransaction setShowAddTran={setShowAddTran}/>}
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
                <th className="table-header-cell">Amount</th>
              </tr>
            </thead>
            <tbody className="transactions-table-body">
              {transactions.map((transaction) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: '#F9FAFB' }}
                  className="transaction-row"
                >
                  <td className="table-cell date-cell">
                    {transaction.date}
                  </td>
                  <td className="table-cell description-cell">
                    {transaction.description}
                  </td>
                  <td className="table-cell category-cell">
                    {transaction.category}
                  </td>
                  <td className="table-cell amount-cell">
                    <div className="amount-container">
                      {transaction.type === 'income' ? (
                        <ArrowUpRight className="income-icon" />
                      ) : (
                        <ArrowDownRight className="expense-icon" />
                      )}
                      <span className={transaction.type === 'income' ? 'income-amount' : 'expense-amount'}>
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </span>
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