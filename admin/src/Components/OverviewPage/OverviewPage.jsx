import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import './OverviewPage.css'


const OverviewPage = () => {

  const { transactions, users } = useContext(StoreContext)

  return (
    <main className="dashboard-content">
      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Users</h3>
          </div>
          <p className="stat-value"> {users.length} </p>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Transactions</h3>
          </div>
          <p className="stat-value">{transactions.length}</p>

        </div>
      </div>
    </main>
  );
};

export default OverviewPage;