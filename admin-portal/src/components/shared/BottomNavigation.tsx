import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useGetPendingApprovalsQuery } from '../../store/api/offerApi';
import { useLogoutMutation } from '../../store/api/authApi';
import { logout } from '../../store/slices/authSlice';
import { navigationConfig } from '../../config/navigation';
import type { NavigationItem, UserRole } from '../../types';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [logoutMutation] = useLogoutMutation();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const { data: pendingApprovals } = useGetPendingApprovalsQuery(undefined, {
    skip: !user || user.role !== 'admin'
  });

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(logout());
    }
  };

  const getNavigationItems = (userRole: UserRole): NavigationItem[] => {
    // Filter navigation items based on user role
    const items = navigationConfig.filter(item => 
      !item.roles || item.roles.includes(userRole)
    );

    // Add badge for pending approvals
    if (userRole === 'admin' && pendingApprovals) {
      return items.map(item => {
        if (item.id === 'admin-approvals') {
          return { ...item, badge: pendingApprovals.length };
        }
        return item;
      });
    }

    return items;
  };

  const navItems = user ? getNavigationItems(user.role) : [];

  // For bottom navigation, we'll show only the first 4 items + more button
  const visibleItems = navItems.slice(0, 4);
  const remainingItems = navItems.slice(4);


  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 lg:hidden z-50">
        <div className="flex items-center justify-around py-2">
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
              className="flex-1"
            >
              <Link
                to={item.path}
                className={`flex flex-col items-center justify-center px-3 py-2 text-xs font-medium rounded-lg transition-colors min-w-0 w-full ${
                  location.pathname === item.path
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
                }`}
              >
                <div className="relative">
                  {item.icon && <span className="text-lg mb-1 block">{item.icon}</span>}
                  {item.badge && item.badge > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + (index * 0.1), type: "spring", stiffness: 300 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[16px] text-center"
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </div>
                <span className="truncate max-w-full">{item.label}</span>
              </Link>
            </motion.div>
          ))}
          
          {/* More button */}
          {remainingItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: visibleItems.length * 0.1, type: "spring", stiffness: 200 }}
              className="flex-1"
            >
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className={`flex flex-col items-center justify-center px-3 py-2 text-xs font-medium rounded-lg transition-colors min-w-0 w-full ${
                  showMoreMenu ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
                }`}
              >
                <motion.span 
                  animate={{ rotate: showMoreMenu ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-lg mb-1 block"
                >
                  ⋯
                </motion.span>
                <span className="truncate max-w-full">More</span>
              </button>
            </motion.div>
          )}
          
          {/* Logout button - always visible */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (visibleItems.length + (remainingItems.length > 0 ? 1 : 0)) * 0.1, type: "spring", stiffness: 200 }}
            className="flex-1"
          >
            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center px-3 py-2 text-xs font-medium text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors min-w-0 w-full"
            >
              <span className="text-lg mb-1 block">🚪</span>
              <span className="truncate max-w-full">Logout</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* More Menu Overlay */}
      <AnimatePresence>
        {showMoreMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 lg:hidden z-40"
            onClick={() => setShowMoreMenu(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 200,
                duration: 0.4
              }}
              className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-800 rounded-t-2xl shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Handle bar */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex justify-center pt-3 pb-2"
              >
                <div className="w-12 h-1 bg-gray-300 dark:bg-slate-600 rounded-full"></div>
              </motion.div>
              
              {/* Menu items - List View Scrollable */}
              <div className="px-4 pb-24 max-h-80 overflow-y-auto">
                <div className="space-y-2">
                  {remainingItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.3 + (index * 0.1),
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setShowMoreMenu(false)}
                        className={`flex items-center justify-between p-4 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-slate-700 ${
                          location.pathname === item.path
                            ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                            : 'text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="relative mr-3">
                            {item.icon && <span className="text-xl block">{item.icon}</span>}
                            {item.badge && item.badge > 0 && (
                              <motion.span 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 + (index * 0.1), type: "spring", stiffness: 300 }}
                                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[16px] text-center"
                              >
                                {item.badge}
                              </motion.span>
                            )}
                          </div>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <motion.svg 
                          initial={{ opacity: 0, rotate: -90 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          transition={{ delay: 0.4 + (index * 0.1) }}
                          className="w-4 h-4 text-gray-400 dark:text-slate-500" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BottomNavigation;
