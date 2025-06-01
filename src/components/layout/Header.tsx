
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import ThemeToggle from '../ui/ThemeToggle';
import { Avatar, AvatarFallback } from '../ui/avatar';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-16 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-6"
    >
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Welcome back, {user?.name}!
        </h2>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            {user?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Button
          onClick={logout}
          variant="outline"
          size="sm"
          className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
        >
          Logout
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;
