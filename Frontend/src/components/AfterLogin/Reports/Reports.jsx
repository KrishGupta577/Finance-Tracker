import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download } from 'lucide-react';
import './Reports.css';

const data = [
  { month: 'Jan', income: 4000, expenses: 2400 },
  { month: 'Feb', income: 3000, expenses: 1398 },
  { month: 'Mar', income: 2000, expenses: 9800 },
  { month: 'Apr', income: 2780, expenses: 3908 },
  { month: 'May', income: 1890, expenses: 4800 },
  { month: 'Jun', income: 2390, expenses: 3800 },
];

function Reports() {
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="chart-card"
        >
          <h2 className="card-title">Income vs Expenses</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="summary-grid"
        >
          <div className="summary-card">
            <h3 className="card-title">Summary</h3>
            <div className="summary-content">
              <div className="summary-item">
                <p className="summary-label">Total Income</p>
                <p className="income-value">$16,060</p>
              </div>
              <div className="summary-item">
                <p className="summary-label">Total Expenses</p>
                <p className="expense-value">$26,104</p>
              </div>
              <div className="summary-item">
                <p className="summary-label">Net Savings</p>
                <p className="savings-value">$-10,044</p>
              </div>
            </div>
          </div>

          <div className="summary-card">
            <h3 className="card-title">Trends</h3>
            <div className="trends-content">
              <div className="trend-item">
                <span className="trend-label">Average Monthly Income</span>
                <span className="trend-value">$2,677</span>
              </div>
              <div className="trend-item">
                <span className="trend-label">Average Monthly Expenses</span>
                <span className="trend-value">$4,351</span>
              </div>
              <div className="trend-item">
                <span className="trend-label">Highest Income Month</span>
                <span className="trend-value">January</span>
              </div>
              <div className="trend-item">
                <span className="trend-label">Highest Expense Month</span>
                <span className="trend-value">March</span>
              </div>
            </div>
          </div>

          <div className="summary-card">
            <h3 className="card-title">Recommendations</h3>
            <ul className="recommendations-list">
              <li className="recommendation-item">
                <span className="recommendation-marker red-marker"></span>
                <span>Review March expenses - significantly higher than average</span>
              </li>
              <li className="recommendation-item">
                <span className="recommendation-marker yellow-marker"></span>
                <span>Consider increasing emergency fund due to negative savings</span>
              </li>
              <li className="recommendation-item">
                <span className="recommendation-marker green-marker"></span>
                <span>Look for additional income sources to improve cash flow</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Reports;