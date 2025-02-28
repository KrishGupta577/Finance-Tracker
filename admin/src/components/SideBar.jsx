import { useState } from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="logo-container">
        {!collapsed && <h2>FinTrack</h2>}
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            <span className="icon">📊</span>
            {!collapsed && <span>Dashboard</span>}
          </li>
          <li className={activeTab === 'transactions' ? 'active' : ''} onClick={() => setActiveTab('transactions')}>
            <span className="icon">💸</span>
            {!collapsed && <span>Transactions</span>}
          </li>
          <li className={activeTab === 'budgets' ? 'active' : ''} onClick={() => setActiveTab('budgets')}>
            <span className="icon">📝</span>
            {!collapsed && <span>Budgets</span>}
          </li>
          <li className={activeTab === 'goals' ? 'active' : ''} onClick={() => setActiveTab('goals')}>
            <span className="icon">🎯</span>
            {!collapsed && <span>Goals</span>}
          </li>
          <li className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')}>
            <span className="icon">📈</span>
            {!collapsed && <span>Reports</span>}
          </li>
          <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
            <span className="icon">⚙️</span>
            {!collapsed && <span>Settings</span>}
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        {!collapsed && <p>FinTrack Pro v1.0</p>}
      </div>
    </aside>
  );
};

export default Sidebar;