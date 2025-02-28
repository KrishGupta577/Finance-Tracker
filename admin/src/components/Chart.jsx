const Chart = () => {
    // This would be replaced with an actual chart library like recharts
    return (
      <div className="chart-container">
        <div className="chart-placeholder">
          <div className="chart-bar" style={{height: '60%'}}></div>
          <div className="chart-bar" style={{height: '80%'}}></div>
          <div className="chart-bar" style={{height: '40%'}}></div>
          <div className="chart-bar" style={{height: '70%'}}></div>
          <div className="chart-bar" style={{height: '90%'}}></div>
          <div className="chart-bar" style={{height: '50%'}}></div>
          <div className="chart-bar" style={{height: '65%'}}></div>
        </div>
        
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-color housing"></span>
            <span>Housing</span>
          </div>
          <div className="legend-item">
            <span className="legend-color food"></span>
            <span>Food</span>
          </div>
          <div className="legend-item">
            <span className="legend-color transport"></span>
            <span>Transport</span>
          </div>
          <div className="legend-item">
            <span className="legend-color entertainment"></span>
            <span>Entertainment</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default Chart;