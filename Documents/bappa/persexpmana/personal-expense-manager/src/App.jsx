import React, { useState, useEffect } from 'react';
import './App.css';
import Summary from './components/Summary';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

const INITIAL_EXPENSES = [
  { id: 1, title: 'Textbooks & Study Material', amount: 1450.0, category: 'Education', date: '2026-09-20' },
  { id: 2, title: 'Metro Smart Card Recharge', amount: 500.0, category: 'Transportation', date: '2026-09-22' },
  { id: 3, title: 'Cafeteria Lunch', amount: 180.0, category: 'Food & Dining', date: '2026-09-25' },
  { id: 4, title: 'Semester Lab Manual', amount: 240.0, category: 'Education', date: '2026-09-27' }
];

export default function App() {
  // Load saved expenses from localStorage on launch, fallback to INITIAL_EXPENSES
  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem('expense_ledger_records');
      return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
    } catch (e) {
      console.error('Failed reading localStorage', e);
      return INITIAL_EXPENSES;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingExpense, setEditingExpense] = useState(null);

  // Automatically sync to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('expense_ledger_records', JSON.stringify(expenses));
  }, [expenses]);

  const handleSaveExpense = (item) => {
    if (editingExpense) {
      setExpenses((prev) => prev.map((e) => (e.id === item.id ? item : e)));
      setEditingExpense(null);
    } else {
      setExpenses((prev) => [item, ...prev]);
    }
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredExpenses = expenses.filter((item) => {
    const matchesTitle = item.title.toLowerCase().includes(searchQuery.trim().toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesTitle && matchesCategory;
  });

  const totalAmount = filteredExpenses.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <div className="app-container">
      <header className="text-center header-box">
        <h1 className="main-title">Expense Manager</h1>
        <p className="sub-text">Record daily transactions, filter categories, and monitor balance.</p>
      </header>

      {/* Summary Cards */}
      <Summary
        totalAmount={totalAmount}
        totalCount={filteredExpenses.length}
        activeCategory={selectedCategory}
      />

      {/* Form */}
      <ExpenseForm
        onSave={handleSaveExpense}
        editingExpense={editingExpense}
        onCancelEdit={() => setEditingExpense(null)}
      />

      {/* Filters and List */}
      <div className="list-wrapper card">
        <div className="filter-bar">
          <div className="search-wrap">
            <input
              type="text"
              className="custom-input"
              placeholder="Search expenses by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="select-wrap">
            <select
              className="custom-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Transportation">Transportation</option>
              <option value="Education">Education</option>
              <option value="Utilities">Utilities</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <ExpenseList
          expenses={filteredExpenses}
          onEdit={handleEditClick}
          onDelete={handleDeleteExpense}
        />
      </div>
    </div>
  );
}