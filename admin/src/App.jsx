import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import StatCard from './components/StatCard';
import TransactionTable from './components/TransactionTable';
import Chart from './components/Chart';
import BudgetProgress from './components/BudgetProgress';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        <DashboardHeader />
        
        {isLoading ? (
          <div className="loading-screen">
            <div className="spinner"></div>
            <p>Loading your financial data...</p>
          </div>
        ) : (
          <>
            <div className="stats-container">
              <StatCard 
                title="Total Balance" 
                value="$24,563.00" 
                change="+2.5%" 
                icon="wallet" 
                positive={true} 
              />
              <StatCard 
                title="Monthly Income" 
                value="$8,350.00" 
                change="+5.2%" 
                icon="arrow-up" 
                positive={true} 
              />
              <StatCard 
                title="Monthly Expenses" 
                value="$4,865.00" 
                change="-1.8%" 
                icon="arrow-down" 
                positive={true} 
              />
              <StatCard 
                title="Savings Rate" 
                value="41.7%" 
                change="+3.6%" 
                icon="piggy-bank" 
                positive={true} 
              />
            </div>
            
            <div className="charts-container">
              <div className="chart-card">
                <h3>Spending Analytics</h3>
                <Chart />
              </div>
              <div className="budget-card">
                <h3>Budget Progress</h3>
                <BudgetProgress />
              </div>
            </div>
            
            <div className="recent-transactions">
              <h3>Recent Transactions</h3>
              <TransactionTable />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;