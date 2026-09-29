import React from 'react';

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  return (
    <div className="expense-item">
      <div className="item-left">
        <span className="item-title">{expense.title}</span>
        <div className="item-meta">
          <span className="badge-cat">{expense.category}</span>
          <span>&bull;</span>
          <span>{expense.date}</span>
        </div>
      </div>

      <div className="item-right">
        <span className="item-amount">
          ₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <button
          className="action-btn edit"
          title="Edit"
          onClick={() => onEdit(expense)}
        >
          ✏️
        </button>
        <button
          className="action-btn delete"
          title="Delete"
          onClick={() => onDelete(expense.id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;