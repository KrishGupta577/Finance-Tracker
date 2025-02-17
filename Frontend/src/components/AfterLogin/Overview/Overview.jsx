import "./Overview.css"
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Overview = () => {

    const recentTransactions = [
        { id: 1, type: 'expense', amount: -85.50, description: 'Grocery Shopping - Whole Foods', date: '2025-02-16', category: 'Groceries' },
        { id: 2, type: 'income', amount: 2500.00, description: 'Salary Deposit - Tech Corp', date: '2025-02-15', category: 'Income' },
        { id: 3, type: 'expense', amount: -45.99, description: 'Netflix Subscription', date: '2025-02-14', category: 'Entertainment' },
        { id: 4, type: 'expense', amount: -128.75, description: 'Electric Bill - February', date: '2025-02-13', category: 'Utilities' },
        { id: 5, type: 'income', amount: 150.00, description: 'Freelance Payment', date: '2025-02-12', category: 'Side Income' }
    ];

    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

    const data = [{ name: 'Emergency Fund', value: 40 },
    { name: 'Retirement', value: 30 },
    { name: 'Investment', value: 20 },
    { name: 'Goals', value: 10 }]

    return (
        <>
            <main className="dashboard-content">
                {/* Quick Stats */}
                <div className="quick-stats">
                    <div className="stat-card">
                        <div className="stat-header">
                            <h3>Total Balance</h3>
                            <i className="fa-solid fa-wallet"></i>
                        </div>
                        <p className="stat-value">$24,850.75</p>
                        <p className="stat-change positive">
                            <i className="fa-solid fa-arrow-up"></i>
                            +2.5% from last month
                        </p>
                    </div>
                    <div className="stat-card">
                        <div className="stat-header">
                            <h3>Monthly Income</h3>
                            <i className="fa-solid fa-arrow-trend-up"></i>
                        </div>
                        <p className="stat-value">$5,240.00</p>
                        <p className="stat-change positive">
                            <i className="fa-solid fa-arrow-up"></i>
                            +4.3% from last month
                        </p>
                    </div>
                    <div className="stat-card">
                        <div className="stat-header">
                            <h3>Monthly Expenses</h3>
                            <i className="fa-solid fa-arrow-trend-down"></i>
                        </div>
                        <p className="stat-value">$3,850.25</p>
                        <p className="stat-change negative">
                            <i className="fa-solid fa-arrow-down"></i>
                            -1.8% from last month
                        </p>
                    </div>
                    <div className="stat-card">
                        <div className="stat-header">
                            <h3>Savings Goal</h3>
                            <i className="fa-solid fa-piggy-bank"></i>
                        </div>
                        <p className="stat-value">75%</p>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: '75%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="charts-section">
                    <div className="chart-card">
                        <h3 className="chart-title">Expense Trend</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={[{ month: 'Jan', value: 1500 }, { month: 'Feb', value: 2300 }, { month: 'Mar', value: 1800 }, { month: 'Apr', value: 2100 }, { month: 'May', value: 1750 }, { month: 'Jun', value: 2450 }]}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#4CAF50" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="chart-card">
                        <h3 className="chart-title">Savings Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Tooltip/>
                                <Pie data={data} dataKey="value" innerRadius="40%" outerRadius="70%">
                                    {data.map((entry, index) => (
                                        <Cell key={index} fill={colors[index % colors.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Transactions & Category Spending */}
                <div className="transactions-section">
                    <div className="transactions-card">
                        <div className="transactions-header">
                            <h3>Recent Transactions</h3>
                            <button className="view-all-btn">View All</button>
                        </div>
                        <div className="transactions-list">
                            {recentTransactions.map((transaction) => (
                                <div key={transaction.id} className="transaction-item">
                                    <div className="transaction-info">
                                        <div className="transaction-details">
                                            <p className="transaction-description">{transaction.description}</p>
                                            <p className="transaction-category">{transaction.category}</p>
                                        </div>
                                    </div>
                                    <div className="transaction-amount">
                                        <p className={`transaction-value ${transaction.type === 'expense' ? 'expense' : 'income'}`}>
                                            {transaction.type === 'expense' ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                                        </p>
                                        <p className="transaction-date">{transaction.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="chart-card">
                        <h3 className="chart-title">Category Spending</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={[{ category: 'Food', value: 450 }, { category: 'Transport', value: 250 }, { category: 'Shopping', value: 350 }, { category: 'Bills', value: 750 }, { category: 'Entertainment', value: 280 }]}>
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Overview