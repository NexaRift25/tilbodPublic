import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useGetPendingApprovalsQuery } from '../../store/api/offerApi';
import { useLogoutMutation } from '../../store/api/authApi';
import { logout } from '../../store/slices/authSlice';
import { navigationConfig } from '../../config/navigation';
import type { NavigationItem, UserRole } from '../../types';

interface SidebarProps {
  navigationItems?: NavigationItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ navigationItems = [] }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [logoutMutation] = useLogoutMutation();
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

  const navItems = navigationItems.length > 0 
    ? navigationItems.filter(item => 
        !item.roles || (user && item.roles.includes(user.role))
      )
    : user 
      ? getNavigationItems(user.role)
      : [];

  const getPortalTitle = (userRole: UserRole) => {
    switch (userRole) {
      case 'admin':
        return 'Admin Portal';
      case 'company_user':
        return 'Company Portal';
      case 'end_user':
        return 'User Portal';
      default:
        return 'Tilbod Portal';
    }
  };

  return (
    <div className="w-64 bg-white dark:bg-slate-800 shadow-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          {user ? getPortalTitle(user.role) : 'Portal'}
        </h1>
      </div>
      
      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 px-4 py-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-slate-100'
                }`}
              >
                <div className="flex items-center">
                  {item.icon && <span className="mr-3">{item.icon}</span>}
                  {item.label}
                </div>
                {item.badge && item.badge > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200 dark:border-slate-700 flex-shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 rounded-lg transition-colors"
        >
          <span className="mr-3">🚪</span>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
