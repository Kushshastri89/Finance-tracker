
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart, CreditCard, PieChart, Settings, User } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart },
  { name: 'Transactions', href: '/transactions', icon: CreditCard },
  { name: 'Budget', href: '/budget', icon: PieChart },
  { name: 'Profile', href: '/profile', icon: Settings },
];

const Sidebar = () => {
  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-white dark:bg-slate-800 shadow-lg border-r border-gray-200 dark:border-slate-700"
    >
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-slate-700">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Finance Tracker
        </h1>
      </div>
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {navigation.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 hover:text-gray-900 dark:hover:text-white'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            </motion.div>
          ))}
        </div>
      </nav>
    </motion.div>
  );
};

export default Sidebar;
