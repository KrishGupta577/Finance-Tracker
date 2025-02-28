const DashboardHeader = () => {
    return (
      <header className="dashboard-header">
        <div className="header-title">
          <h1>Financial Dashboard</h1>
          <p>Welcome back, Alex! Here's your financial overview.</p>
        </div>
        
        <div className="header-actions">
          <div className="date-picker">
            <span>February 2025</span>
            <button>📅</button>
          </div>
          
          <button className="add-transaction-btn">+ Add Transaction</button>
          
          <div className="user-profile">
            <div className="notification-icon">
              <span>🔔</span>
              <span className="notification-badge">3</span>
            </div>
            <div className="avatar">A</div>
          </div>
        </div>
      </header>
    );
  };
  
  export default DashboardHeader;