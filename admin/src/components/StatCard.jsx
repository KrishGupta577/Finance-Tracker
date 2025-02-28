const StatCard = ({ title, value, change, icon, positive }) => {
    return (
      <div className="stat-card animate-in">
        <div className="stat-icon">
          {icon === "wallet" && <span>💼</span>}
          {icon === "arrow-up" && <span>📈</span>}
          {icon === "arrow-down" && <span>📉</span>}
          {icon === "piggy-bank" && <span>🐖</span>}
        </div>
        
        <div className="stat-content">
          <h4>{title}</h4>
          <p className="stat-value">{value}</p>
          <p className={`stat-change ${positive ? 'positive' : 'negative'}`}>
            {change}
          </p>
        </div>
      </div>
    );
  };
  
  export default StatCard;