import "./Insights.css";
import { motion } from 'framer-motion';
import { useContext, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { StoreContext } from '../../../context/StoreContext';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#22D3EE', '#A3E635'];

const Insights = () => {
  const { transactions } = useContext(StoreContext);

  const expenseData = useMemo(() => {
    if (!transactions) return [];

    return transactions
      .filter(txn => txn.category === "expense")
      .reduce((result, txn) => {
        const category = txn.expense_category || "Other";

        // Find if category already exists in result
        const existingIndex = result.findIndex(item => item.name === category);

        if (existingIndex >= 0) {
          // Update existing category
          result[existingIndex].value += txn.amount;
        } else {
          // Add new category
          result.push({ name: category, value: txn.amount });
        }

        return result;
      }, []);
  }, [transactions]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="insights-container"
    >
      <h1 className="insights-title">Spending Insights</h1>

      <div className="insights-grid">
        {/* Expense Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="insights-card"
        >
          <h2 className="card-title">Expense Distribution</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  isAnimationActive={true}
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Spending Categories List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="insights-card"
        >
          <h2 className="card-title">Top Spending Categories</h2>
          <div className="category-list">
            {expenseData.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="category-item"
              >
                <div className="category-name">
                  <div
                    className="category-color-indicator"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span>{category.name}</span>
                </div>
                <span className="category-value">&#8377; {category.value.toFixed(2)}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Insights;
