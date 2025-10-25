import type { NavigationItem } from '../types';

export const navigationConfig: NavigationItem[] = [
  // Admin Navigation
  {
    id: 'admin-dashboard',
    label: 'Dashboard',
    path: '/admin',
    icon: '📊',
    roles: ['admin']
  },
  {
    id: 'admin-approvals',
    label: 'Approvals',
    path: '/admin/approvals',
    icon: '✅',
    roles: ['admin'],
    badge: 0 // Will be updated dynamically
  },
  {
    id: 'admin-companies',
    label: 'Companies',
    path: '/admin/companies',
    icon: '🏢',
    roles: ['admin']
  },
  {
    id: 'admin-offers',
    label: 'Offers',
    path: '/admin/offers',
    icon: '🎯',
    roles: ['admin']
  },
  {
    id: 'admin-users',
    label: 'Users',
    path: '/admin/users',
    icon: '👥',
    roles: ['admin']
  },
  {
    id: 'admin-reports',
    label: 'Reports',
    path: '/admin/reports',
    icon: '📈',
    roles: ['admin']
  },
  {
    id: 'admin-commissions',
    label: 'Commissions',
    path: '/admin/commissions',
    icon: '💰',
    roles: ['admin']
  },
  {
    id: 'admin-categories',
    label: 'Categories',
    path: '/admin/categories',
    icon: '📂',
    roles: ['admin']
  },
  {
    id: 'admin-events',
    label: 'Seasonal Events',
    path: '/admin/events',
    icon: '🎉',
    roles: ['admin']
  },
  {
    id: 'admin-settings',
    label: 'Settings',
    path: '/admin/settings',
    icon: '⚙️',
    roles: ['admin']
  },

  // Company Navigation
  {
    id: 'company-dashboard',
    label: 'Dashboard',
    path: '/company',
    icon: '📊',
    roles: ['company_user']
  },
  {
    id: 'company-companies',
    label: 'My Companies',
    path: '/company/companies',
    icon: '🏢',
    roles: ['company_user']
  },
  {
    id: 'company-offers',
    label: 'My Offers',
    path: '/company/offers',
    icon: '🎯',
    roles: ['company_user']
  },
  {
    id: 'company-create-offer',
    label: 'Create Offer',
    path: '/company/offers/create',
    icon: '➕',
    roles: ['company_user']
  },
  {
    id: 'company-gift-cards',
    label: 'Gift Cards',
    path: '/company/gift-cards',
    icon: '🎁',
    roles: ['company_user']
  },
  {
    id: 'company-analytics',
    label: 'Analytics',
    path: '/company/analytics',
    icon: '📈',
    roles: ['company_user']
  },
  {
    id: 'company-revenue',
    label: 'Revenue',
    path: '/company/revenue',
    icon: '💰',
    roles: ['company_user']
  },
  // {
  //   id: 'company-buyers',
  //   label: 'Buyers',
  //   path: '/company/buyers',
  //   icon: '👥',
  //   roles: ['company_user']
  // },
  {
    id: 'company-profile',
    label: 'Profile',
    path: '/company/profile',
    icon: '👤',
    roles: ['company_user']
  }
];
