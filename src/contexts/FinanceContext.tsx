
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

export interface Budget {
  category: string;
  limit: number;
  spent: number;
}

interface FinanceContextType {
  transactions: Transaction[];
  budgets: Budget[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateBudget: (category: string, limit: number) => void;
  deleteTransaction: (id: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

const mockTransactions: Transaction[] = [
  { id: '1', date: '2024-01-15', description: 'Salary', amount: 5000, category: 'Income', type: 'income' },
  { id: '2', date: '2024-01-16', description: 'Groceries', amount: -150, category: 'Food', type: 'expense' },
  { id: '3', date: '2024-01-17', description: 'Gas', amount: -80, category: 'Transportation', type: 'expense' },
  { id: '4', date: '2024-01-18', description: 'Netflix', amount: -15, category: 'Entertainment', type: 'expense' },
  { id: '5', date: '2024-01-19', description: 'Coffee', amount: -25, category: 'Food', type: 'expense' },
];

const mockBudgets: Budget[] = [
  { category: 'Food', limit: 500, spent: 175 },
  { category: 'Transportation', limit: 300, spent: 80 },
  { category: 'Entertainment', limit: 200, spent: 15 },
  { category: 'Shopping', limit: 400, spent: 0 },
];

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [currency, setCurrency] = useState('USD');

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update budget spent amount
    if (transaction.type === 'expense') {
      setBudgets(prev => prev.map(budget => 
        budget.category === transaction.category 
          ? { ...budget, spent: budget.spent + Math.abs(transaction.amount) }
          : budget
      ));
    }
  };

  const updateBudget = (category: string, limit: number) => {
    setBudgets(prev => {
      const existing = prev.find(b => b.category === category);
      if (existing) {
        return prev.map(b => b.category === category ? { ...b, limit } : b);
      } else {
        return [...prev, { category, limit, spent: 0 }];
      }
    });
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <FinanceContext.Provider value={{
      transactions,
      budgets,
      addTransaction,
      updateBudget,
      deleteTransaction,
      currency,
      setCurrency
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
