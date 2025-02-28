const TransactionTable = () => {
    const transactions = [
      { id: 1, date: '28 Feb 2025', name: 'Grocery Store', category: 'Food', amount: -85.42, status: 'completed' },
      { id: 2, date: '27 Feb 2025', name: 'Salary Deposit', category: 'Income', amount: 3250.00, status: 'completed' },
      { id: 3, date: '26 Feb 2025', name: 'Electric Bill', category: 'Utilities', amount: -124.79, status: 'pending' },
      { id: 4, date: '25 Feb 2025', name: 'Coffee Shop', category: 'Food', amount: -4.50, status: 'completed' },
      { id: 5, date: '24 Feb 2025', name: 'Streaming Service', category: 'Entertainment', amount: -14.99, status: 'completed' },
    ];
    
    return (
      <div className="transaction-table-container">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="transaction-row animate-in" style={{animationDelay: `${transaction.id * 100}ms`}}>
                <td>{transaction.date}</td>
                <td>{transaction.name}</td>
                <td>
                  <span className={`category-tag ${transaction.category.toLowerCase()}`}>
                    {transaction.category}
                  </span>
                </td>
                <td className={transaction.amount > 0 ? 'positive' : 'negative'}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                </td>
                <td>
                  <span className={`status-badge ${transaction.status}`}>
                    {transaction.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn">✏️</button>
                    <button className="delete-btn">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="pagination">
          <button>Previous</button>
          <span>Page 1 of 5</span>
          <button>Next</button>
        </div>
      </div>
    );
  };
  
  export default TransactionTable;