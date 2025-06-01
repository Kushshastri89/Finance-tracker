
import React from 'react';
import { motion } from 'framer-motion';
import { useFinance } from '../../contexts/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowUp, ArrowDown, Wallet } from 'lucide-react';

const SummaryCards = () => {
  const { transactions, currency } = useFinance();
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const balance = totalIncome - totalExpenses;

  const cards = [
    {
      title: 'Total Balance',
      value: balance,
      icon: Wallet,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    },
    {
      title: 'Total Income',
      value: totalIncome,
      icon: ArrowUp,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    },
    {
      title: 'Total Expenses',
      value: totalExpenses,
      icon: ArrowDown,
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className={`bg-gradient-to-r ${card.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-full bg-gradient-to-r ${card.color}`}>
                <card.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'}
                {Math.abs(card.value).toLocaleString()}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {card.title === 'Total Balance' && balance >= 0 ? '+' : ''}
                {card.title === 'Total Expenses' ? '-' : '+'}
                {(Math.random() * 10).toFixed(1)}% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default SummaryCards;
