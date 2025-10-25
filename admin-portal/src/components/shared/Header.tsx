import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, User } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useLogoutMutation } from '../../store/api/authApi';
import { logout } from '../../store/slices/authSlice';
import Notification from './Notification';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [logoutMutation] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      // Even if API call fails, clear local state
      console.error('Logout error:', error);
    } finally {
      dispatch(logout());
      setShowDropdown(false);
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'company_user':
        return 'Company User';
      case 'end_user':
        return 'End User';
      default:
        return 'User';
    }
  };

  const getDashboardTitle = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Admin Dashboard';
      case 'company_user':
        return 'Company Dashboard';
      case 'end_user':
        return 'User Dashboard';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-slate-700">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                {user ? getDashboardTitle(user.role) : 'Welcome to Admin Portal'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                {user ? `Welcome back, ${user.name}` : 'Manage your dashboards'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Notifications */}
            <Notification userRole={user?.role} />

            {/* User Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100 focus:outline-none"
              >
                <div className="w-8 h-8 bg-primary-500 dark:bg-primary-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{user?.name || 'User'}</div>
                  <div className="text-xs text-gray-500 dark:text-slate-400">
                    {user ? getRoleDisplayName(user.role) : 'Guest'}
                  </div>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-slate-700"
                  >
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-slate-300 border-b border-gray-100 dark:border-slate-700">
                      <div className="font-medium">{user?.name}</div>
                      <div className="text-gray-500 dark:text-slate-400">{user?.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                    >
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
