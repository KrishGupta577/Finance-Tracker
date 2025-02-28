const BudgetProgress = () => {
    const categories = [
      { name: 'Housing', current: 1200, max: 1500, percent: 80 },
      { name: 'Food', current: 450, max: 500, percent: 90 },
      { name: 'Transport', current: 180, max: 300, percent: 60 },
      { name: 'Entertainment', current: 220, max: 200, percent: 110 },
    ];
    
    return (
      <div className="budget-progress-container">
        {categories.map((category, index) => (
          <div key={index} className="budget-item animate-in" style={{animationDelay: `${index * 150}ms`}}>
            <div className="budget-info">
              <p>{category.name}</p>
              <p>${category.current} / ${category.max}</p>
            </div>
            <div className="progress-bar-container">
              <div 
                className={`progress-bar ${category.percent > 100 ? 'exceeded' : ''}`} 
                style={{width: `${Math.min(category.percent, 100)}%`}}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default BudgetProgress;