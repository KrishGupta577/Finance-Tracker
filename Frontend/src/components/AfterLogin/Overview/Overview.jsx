import { useContext, useEffect, useState } from "react";
import "./Overview.css"
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { StoreContext } from "../../../context/StoreContext"

const Overview = () => {

    const { transactions, userInfo, data } = useContext(StoreContext)

    const totalExpenseAmount = transactions
        .filter(transaction => transaction.category === 'expense')
        .reduce((total, transaction) => total + transaction.amount, 0)


    const totalCredits = transactions
        .filter(transaction => transaction.category === 'income')
        .reduce((total, transaction) => total + transaction.amount, 0)

    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

    return (
        <>
            <main className="dashboard-content">
                {/* Quick Stats */}
                <div className="quick-stats">
                    <div className="stat-card">
                        <div className="stat-header">
                            <h3>Monthly Income</h3>
                        </div>
                        <p className="stat-value">&#8377; {userInfo.monthly_income}</p>
                    </div>
                    <div className="stat-card">
                        <div className="stat-header">
                            <h3>Expense</h3>
                        </div>
                        <p className="stat-value">&#8377; {totalExpenseAmount}</p>
                        <p className="stat-change positive">
                            +4.3% from last month
                        </p>
                    </div>
                    <div className="stat-card">
                        <div className="stat-header">
                            <h3>Total Credits + Monthly Income</h3>
                        </div>
                        <p className="stat-value">&#8377; {userInfo.monthly_income + totalCredits}</p>
                    </div>
                    <div className="stat-card">
                        <div className="stat-header">
                            <h3>Saving</h3>
                        </div>
                        <p className="stat-value">&#8377; {userInfo.monthly_income - totalExpenseAmount}</p>
                        <p className="stat-change negative">
                            -1.8% from last month
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Overview