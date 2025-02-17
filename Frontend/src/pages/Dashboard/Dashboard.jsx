import "./Dashboard.css"

const Dashboard = () => {
  return (
    <>
      <div class="dashboard">
         {/* Sidebar  */}
        <aside class="sidebar">
          <div class="sidebar-header">
            <h1 class="logo">Finance Tracker</h1>
            <button class="toggle-btn">
              <i class="fas fa-bars"></i>
            </button>
          </div>

          <nav>
            <ul class="nav-links">
              <li class="nav-item">
                <a href="#" class="nav-link active">
                  <i class="fas fa-home"></i>
                  <span>Overview</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fas fa-chart-bar"></i>
                  <span>Analytics</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fas fa-wallet"></i>
                  <span>Transactions</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fas fa-cog"></i>
                  <span>Settings</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content  */}
        <main class="main-content">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-header">
                <div class="stat-icon">
                  <i class="fas fa-wallet"></i>
                </div>
                <h3 class="stat-title">Total Balance</h3>
              </div>
              <p class="stat-value">$12,750</p>
              <span class="stat-trend trend-up">+2.5% this month</span>
            </div>

            <div class="stat-card">
              <div class="stat-header">
                <div class="stat-icon">
                  <i class="fas fa-arrow-up"></i>
                </div>
                <h3 class="stat-title">Total Income</h3>
              </div>
              <p class="stat-value">$8,250</p>
              <span class="stat-trend trend-up">+5.2% this month</span>
            </div>

            <div class="stat-card">
              <div class="stat-header">
                <div class="stat-icon">
                  <i class="fas fa-arrow-down"></i>
                </div>
                <h3 class="stat-title">Total Expenses</h3>
              </div>
              <p class="stat-value">$4,500</p>
              <span class="stat-trend trend-down">-1.8% this month</span>
            </div>
          </div>

          <div class="charts-grid">
            <div class="chart-card">
              <div class="chart-header">
                <h3 class="chart-title">Income vs Expenses</h3>
              </div>
              <div class="chart-content">
                 {/* Chart will be rendered here  */}
              </div>
            </div>

            <div class="chart-card">
              <div class="chart-header">
                <h3 class="chart-title">Spending by Category</h3>
              </div>
              <div class="chart-content">
                 {/* Chart will be rendered here  */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Dashboard