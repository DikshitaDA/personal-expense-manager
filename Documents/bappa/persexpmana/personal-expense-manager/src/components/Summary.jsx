import React from 'react';

const Summary = ({ totalAmount, totalCount, activeCategory }) => {
  return (
    <div className="summary-grid">
      <div className="summary-card">
        <h4>Total Expenses</h4>
        <div className="amount">
          ₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
      <div className="summary-card">
        <h4>Total Transactions</h4>
        <div className="amount">{totalCount}</div>
      </div>
      <div className="summary-card">
        <h4>Active Filter</h4>
        <div className="amount" style={{ fontSize: '1.25rem', color: '#CBD5E1' }}>
          {activeCategory === 'All' ? 'All Categories' : activeCategory}
        </div>
      </div>
    </div>
  );
};

export default Summary;