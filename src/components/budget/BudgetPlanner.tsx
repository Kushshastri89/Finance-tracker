
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFinance } from '../../contexts/FinanceContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Plus } from 'lucide-react';

const BudgetPlanner = () => {
  const { budgets, updateBudget, currency } = useFinance();
  const [newCategory, setNewCategory] = useState('');
  const [newLimit, setNewLimit] = useState('');

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory && newLimit) {
      updateBudget(newCategory, parseFloat(newLimit));
      setNewCategory('');
      setNewLimit('');
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Budget Planner</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="bg-white dark:bg-slate-800 shadow-lg">
          <CardHeader>
            <CardTitle>Add New Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddBudget} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Food, Entertainment"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="limit">Monthly Limit</Label>
                <Input
                  id="limit"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white mt-6"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Budget
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((budget, index) => {
          const percentage = (budget.spent / budget.limit) * 100;
          const isOverBudget = percentage > 100;
          
          return (
            <motion.div
              key={budget.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className={`shadow-lg hover:shadow-xl transition-all duration-300 ${
                isOverBudget 
                  ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10' 
                  : 'bg-white dark:bg-slate-800'
              }`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                    {budget.category}
                  </CardTitle>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>
                      {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'}
                      {budget.spent.toLocaleString()} spent
                    </span>
                    <span>
                      {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'}
                      {budget.limit.toLocaleString()} limit
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Progress
                      value={Math.min(percentage, 100)}
                      className="h-3"
                      style={{
                        '--progress-background': isOverBudget ? '#EF4444' : '#10B981'
                      } as React.CSSProperties}
                    />
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${
                        isOverBudget 
                          ? 'text-red-600 dark:text-red-400' 
                          : 'text-green-600 dark:text-green-400'
                      }`}>
                        {percentage.toFixed(1)}% used
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'}
                        {(budget.limit - budget.spent).toLocaleString()} remaining
                      </span>
                    </div>
                    {isOverBudget && (
                      <div className="text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20 px-2 py-1 rounded">
                        Over budget by {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'}
                        {(budget.spent - budget.limit).toLocaleString()}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {budgets.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No budgets created yet. Add your first budget above!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default BudgetPlanner;
