import React, { useState, useEffect } from 'react';

const CATEGORIES = ['Food & Dining', 'Transportation', 'Entertainment', 'Utilities', 'Education', 'Health', 'Other'];

const ExpenseForm = ({ onSave, editingExpense, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
    } else {
      resetForm();
    }
  }, [editingExpense]);

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setCategory(CATEGORIES[0]);
    setDate(new Date().toISOString().split('T')[0]);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount || Number(amount) <= 0) {
      setError('Please provide a valid title and positive amount.');
      return;
    }

    onSave({
      id: editingExpense ? editingExpense.id : Date.now(),
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      date
    });

    resetForm();
  };

  return (
    <div className="card">
      <h3 style={{ marginBottom: '16px', fontSize: '1.15rem' }}>
        {editingExpense ? 'Edit Expense Record' : 'Record New Expense'}
      </h3>

      {error && <div style={{ color: '#EF4444', fontSize: '0.85rem', marginBottom: '12px' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Expense Title</label>
            <input
              type="text"
              className="custom-input"
              placeholder="e.g. Grocery shopping"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Amount (₹)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              className="custom-input"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              className="custom-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className="custom-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-primary">
          {editingExpense ? 'Update Expense' : 'Add Expense'}
        </button>

        {editingExpense && (
          <button type="button" className="btn-secondary" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default ExpenseForm;