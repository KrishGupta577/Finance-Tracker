import React, { useContext } from 'react';
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
} from 'recharts';
import { StoreContext } from '../../Context/StoreContext';
import './TransactionsPage.css'

const Dashboard = () => {

    const { transactions } = useContext(StoreContext)

    const currentYear = new Date().getFullYear();

    const countTransactionsPerMonth = (transactions) => {
        const monthlyTransactionCount = Array.from({ length: 12 }, () => 0);

        transactions.forEach(transaction => {
            const month = new Date(transaction.date).getMonth();
            monthlyTransactionCount[month] += 1;
        });

        return monthlyTransactionCount.map((count, i) => ({
            month: new Date(0, i).toLocaleString('default', { month: 'short' }),
            count
        }));
    };

    const transactionData = countTransactionsPerMonth(transactions);

    return (
        <div className="transaction-container">
            <h1 className="transaction-title">Yearly Transactions - {currentYear}</h1>

            {/* Monthly Overview Chart */}
            <div className="transaction-chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={transactionData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${value} transactions`} contentStyle={{ color: 'black' }} />
                        <Legend />
                        <Bar dataKey="count" fill="green" name="Transactions" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;