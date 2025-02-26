import React, { useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download } from 'lucide-react';
import {StoreContext} from '../../../context/StoreContext';
import './Reports.css';

const Reports = () => {
  const {transactions} = useContext(StoreContext);

  // Generate Income vs Expenses Data
  const monthlyData = useMemo(() => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    // Initialize data structure
    const dataMap = {};
    months.forEach(month => {
      dataMap[month] = { month, income: 0, expenses: 0 };
    });

    // Populate data from transactions
    transactions.forEach(txn => {
      const txnMonth = months[new Date(txn.date).getMonth()]; 
      if (txn.category === "income") {
        dataMap[txnMonth].income += txn.amount;
      } else if (txn.category === "expense") {
        dataMap[txnMonth].expenses += txn.amount;
      }
    });

    return Object.values(dataMap);
  }, [transactions]);

  const totalIncome = monthlyData.reduce((sum, entry) => sum + entry.income, 0);
  const totalExpenses = monthlyData.reduce((sum, entry) => sum + entry.expenses, 0);
  const netSavings = totalIncome - totalExpenses;
  const avgIncome = (totalIncome / 6).toFixed(2);
  const avgExpenses = (totalExpenses / 6).toFixed(2);

  const highestIncomeMonth = monthlyData.reduce((max, entry) => entry.income > max.income ? entry : max, { month: "", income: 0 }).month;
  const highestExpenseMonth = monthlyData.reduce((max, entry) => entry.expenses > max.expenses ? entry : max, { month: "", expenses: 0 }).month;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="reports-container"
    >
      <div className="reports-header">
        <h1 className="reports-title">Financial Reports</h1>
        <button className="export-button">
          <Download className="export-icon" />
          Export Report
        </button>
      </div>

      <div className="reports-grid">
        <motion.div className="chart-card">
          <h2 className="card-title">Income vs Expenses</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#3B82F6" name="Income" />
                <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div className="summary-grid">
          <div className="summary-card">
            <h3 className="card-title">Summary</h3>
            <div className="summary-content">
              <div className="summary-item">
                <p className="summary-label">Total Credits</p>
                <p className="income-value">&#8377; {totalIncome.toLocaleString()}</p>
              </div>
              <div className="summary-item">
                <p className="summary-label">Total Expenses</p>
                <p className="expense-value">&#8377; {totalExpenses.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="summary-card">
            <h3 className="card-title">Trends</h3>
            <div className="trends-content">
              <div className="trend-item">
                <span className="trend-label">Average Monthly Income</span>
                <span className="trend-value">&#8377; {avgIncome}</span>
              </div>
              <div className="trend-item">
                <span className="trend-label">Average Monthly Expenses</span>
                <span className="trend-value">&#8377; {avgExpenses}</span>
              </div>
              <div className="trend-item">
                <span className="trend-label">Highest Income Month</span>
                <span className="trend-value">{highestIncomeMonth || "N/A"}</span>
              </div>
              <div className="trend-item">
                <span className="trend-label">Highest Expense Month</span>
                <span className="trend-value">{highestExpenseMonth || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="summary-card">
            <h3 className="card-title">Recommendations</h3>
            <ul className="recommendations-list">
              {totalExpenses > totalIncome && (
                <li className="recommendation-item">
                  <span className="recommendation-marker red-marker"></span>
                  <span>Review expenses - spending exceeds income</span>
                </li>
              )}
              {highestExpenseMonth && (
                <li className="recommendation-item">
                  <span className="recommendation-marker yellow-marker"></span>
                  <span>Review {highestExpenseMonth} expenses - higher than usual</span>
                </li>
              )}
              {netSavings < 0 && (
                <li className="recommendation-item">
                  <span className="recommendation-marker red-marker"></span>
                  <span>Consider increasing savings or reducing expenses</span>
                </li>
              )}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Reports;
