import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'approval' | 'payment' | 'registration' | 'extension' | 'system' | 'customer' | 'offer' | 'commission' | 'purchase' | 'welcome';
  time: string;
  unread: boolean;
}

interface NotificationProps {
  className?: string;
  userRole?: 'admin' | 'company_user' | 'end_user';
}

const Notification: React.FC<NotificationProps> = ({ className = '', userRole = 'admin' }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Role-specific notification data
  const getNotificationsByRole = (role: string): Notification[] => {
    switch (role) {
      case 'admin':
        return [
          {
            id: '1',
            title: 'New Offer Approval Required',
            message: 'Summer Fashion Sale - 50% Off needs your approval',
            type: 'approval',
            time: '2 minutes ago',
            unread: true
          },
          {
            id: '2',
            title: 'Company Registration Pending',
            message: 'New company "Tech Solutions Ltd" is waiting for approval',
            type: 'registration',
            time: '15 minutes ago',
            unread: true
          },
          {
            id: '3',
            title: 'Payment Received',
            message: 'Commission payment of $25.99 received',
            type: 'payment',
            time: '1 hour ago',
            unread: false
          },
          {
            id: '4',
            title: 'System Maintenance',
            message: 'Scheduled maintenance will occur tonight at 2 AM',
            type: 'system',
            time: '3 hours ago',
            unread: false
          },
          {
            id: '5',
            title: 'High Volume Alert',
            message: 'Unusual spike in offer submissions detected',
            type: 'system',
            time: '4 hours ago',
            unread: false
          }
        ];

      case 'company_user':
        return [
          {
            id: '1',
            title: 'Offer Approved',
            message: 'Your "Summer Fashion Sale" offer has been approved',
            type: 'approval',
            time: '5 minutes ago',
            unread: true
          },
          {
            id: '2',
            title: 'Payment Received',
            message: 'Payment of $25.99 received for Happy Hour Offer',
            type: 'payment',
            time: '30 minutes ago',
            unread: true
          },
          {
            id: '3',
            title: 'New Customer Purchase',
            message: 'John Doe purchased your Pizza Deal offer',
            type: 'customer',
            time: '1 hour ago',
            unread: false
          },
          {
            id: '4',
            title: 'Offer Extension Available',
            message: 'Your Pizza Deal offer can be extended by 7 days',
            type: 'extension',
            time: '2 hours ago',
            unread: false
          },
          {
            id: '5',
            title: 'Company Profile Updated',
            message: 'Your company profile has been successfully updated',
            type: 'system',
            time: '3 hours ago',
            unread: false
          }
        ];

      case 'end_user':
        return [
          {
            id: '1',
            title: 'New Offers Available',
            message: '5 new offers have been added to your area',
            type: 'system',
            time: '10 minutes ago',
            unread: true
          },
          {
            id: '2',
            title: 'Purchase Confirmed',
            message: 'Your Pizza Deal purchase has been confirmed',
            type: 'purchase',
            time: '1 hour ago',
            unread: true
          },
          {
            id: '3',
            title: 'Gift Card Ready',
            message: 'Your spa gift card is ready for use',
            type: 'payment',
            time: '2 hours ago',
            unread: false
          },
          {
            id: '4',
            title: 'Offer Expiring Soon',
            message: 'Your Fashion Sale offer expires in 2 days',
            type: 'extension',
            time: '1 day ago',
            unread: false
          },
          {
            id: '5',
            title: 'Welcome to Tilbod',
            message: 'Thank you for joining! Explore our latest offers',
            type: 'welcome',
            time: '3 days ago',
            unread: false
          }
        ];

      default:
        return [];
    }
  };

  const notifications = getNotificationsByRole(userRole);

  const unreadCount = notifications.filter(n => n.unread).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'approval':
        return '✅';
      case 'payment':
        return '💰';
      case 'registration':
        return '🏢';
      case 'extension':
        return '⏰';
      case 'system':
        return '⚙️';
      case 'customer':
        return '👤';
      case 'offer':
        return '🎯';
      case 'commission':
        return '💎';
      case 'purchase':
        return '🛒';
      case 'welcome':
        return '🎉';
      default:
        return '🔔';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'approval':
        return 'text-yellow-600 bg-yellow-100';
      case 'payment':
        return 'text-green-600 bg-green-100';
      case 'registration':
        return 'text-blue-600 bg-blue-100';
      case 'extension':
        return 'text-purple-600 bg-purple-100';
      case 'system':
        return 'text-gray-600 bg-gray-100';
      case 'customer':
        return 'text-indigo-600 bg-indigo-100';
      case 'offer':
        return 'text-orange-600 bg-orange-100';
      case 'commission':
        return 'text-emerald-600 bg-emerald-100';
      case 'purchase':
        return 'text-pink-600 bg-pink-100';
      case 'welcome':
        return 'text-cyan-600 bg-cyan-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleMarkAllAsRead = () => {
    // In a real app, this would call an API to mark all notifications as read
    console.log('Marking all notifications as read');
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 rounded-full transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center font-medium"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 z-50"
          >
            <div className="p-4 border-b border-gray-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-slate-400">
                  <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-slate-600" />
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors ${
                      notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                        <span className="text-sm">{getNotificationIcon(notification.type)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${notification.unread ? 'text-gray-900 dark:text-slate-100' : 'text-gray-700 dark:text-slate-300'}`}>
                            {notification.title}
                          </p>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-slate-400 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 dark:border-slate-700">
                <button 
                  onClick={handleMarkAllAsRead}
                  className="w-full text-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                >
                  Mark all as read
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
