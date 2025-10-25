import React from 'react';

// Mock data for company dashboard
const mockStats = {
  totalOffers: 12,
  activeOffers: 8,
  pendingOffers: 2,
  expiredOffers: 2,
  totalRevenue: 15420.50,
  thisMonthRevenue: 3250.75,
  lastMonthRevenue: 2890.25,
  revenueGrowth: 12.5,
  totalViews: 12500,
  totalPurchases: 89,
  conversionRate: 0.71,
  totalCommissions: 771.03,
  thisMonthCommissions: 162.50,
  lastMonthCommissions: 145.25,
  commissionGrowth: 11.9
};

const mockRecentOffers = [
  {
    id: '1',
    title: 'Summer Fashion Sale - 50% Off',
    type: 'active_offer',
    status: 'active',
    views: 1250,
    purchases: 89,
    revenue: 2314.11,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Tuesday 2-for-1 Pizza Deal',
    type: 'weekdays_offer',
    status: 'active',
    views: 890,
    purchases: 45,
    revenue: 584.55,
    createdAt: '2024-01-16T14:20:00Z'
  },
  {
    id: '3',
    title: 'Happy Hour Cocktails - 30% Off',
    type: 'happy_hour_offer',
    status: 'pending',
    views: 0,
    purchases: 0,
    revenue: 0,
    createdAt: '2024-01-18T09:15:00Z'
  },
  {
    id: '4',
    title: 'Luxury Spa Gift Card',
    type: 'gift_card',
    status: 'active',
    views: 450,
    purchases: 12,
    revenue: 1800.00,
    createdAt: '2024-01-17T16:45:00Z'
  }
];

const mockRecentPurchases = [
  {
    id: '1',
    offerTitle: 'Summer Fashion Sale - 50% Off',
    buyerName: 'John Doe',
    buyerEmail: 'john@example.com',
    amount: 25.99,
    purchaseDate: '2024-01-20T14:30:00Z',
    status: 'completed'
  },
  {
    id: '2',
    offerTitle: 'Tuesday 2-for-1 Pizza Deal',
    buyerName: 'Jane Smith',
    buyerEmail: 'jane@example.com',
    amount: 12.99,
    purchaseDate: '2024-01-19T18:45:00Z',
    status: 'completed'
  },
  {
    id: '3',
    offerTitle: 'Luxury Spa Gift Card',
    buyerName: 'Mike Johnson',
    buyerEmail: 'mike@example.com',
    amount: 150.00,
    purchaseDate: '2024-01-18T11:20:00Z',
    status: 'completed'
  },
  {
    id: '4',
    offerTitle: 'Summer Fashion Sale - 50% Off',
    buyerName: 'Sarah Wilson',
    buyerEmail: 'sarah@example.com',
    amount: 25.99,
    purchaseDate: '2024-01-17T16:15:00Z',
    status: 'pending'
  }
];

const mockPerformanceData = [
  { month: 'Jan', revenue: 3250, offers: 8, views: 12500 },
  { month: 'Dec', revenue: 2890, offers: 6, views: 9800 },
  { month: 'Nov', revenue: 2100, offers: 5, views: 7500 },
  { month: 'Oct', revenue: 1800, offers: 4, views: 6200 }
];

const CompanyDashboard: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300';
      case 'expired': return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
      case 'completed': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300';
      default: return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'active_offer': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300';
      case 'weekdays_offer': return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300';
      case 'happy_hour_offer': return 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300';
      case 'gift_card': return 'bg-pink-100 dark:bg-pink-900/20 text-pink-800 dark:text-pink-300';
      default: return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Company Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-slate-400">
          Welcome back! Here's an overview of your business performance.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">Total Revenue</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100">${mockStats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 dark:text-green-400">
                ↗️ {mockStats.revenueGrowth}% vs last month
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">Active Offers</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100">{mockStats.activeOffers}</p>
              <p className="text-sm text-gray-500 dark:text-slate-400">{mockStats.totalOffers} total offers</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">👁️</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">Total Views</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100">{mockStats.totalViews.toLocaleString()}</p>
              <p className="text-sm text-gray-500 dark:text-slate-400">{mockStats.conversionRate}% conversion rate</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">🛒</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">Total Purchases</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100">{mockStats.totalPurchases}</p>
              <p className="text-sm text-gray-500 dark:text-slate-400">${mockStats.totalRevenue.toLocaleString()} revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue and Commission Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-4">Revenue Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-slate-400">This Month:</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-slate-100">${mockStats.thisMonthRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-slate-400">Last Month:</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-slate-100">${mockStats.lastMonthRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-slate-400">Growth:</span>
              <span className="text-lg font-semibold text-green-600 dark:text-green-400">+{mockStats.revenueGrowth}%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-4">Commission Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-slate-400">This Month:</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-slate-100">${mockStats.thisMonthCommissions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-slate-400">Last Month:</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-slate-100">${mockStats.lastMonthCommissions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-slate-400">Growth:</span>
              <span className="text-lg font-semibold text-green-600 dark:text-green-400">+{mockStats.commissionGrowth}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-4">Performance Trend</h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {mockPerformanceData.map((data) => (
            <div key={data.month} className="flex flex-col items-center space-y-2">
              <div className="flex space-x-1">
                <div 
                  className="bg-blue-500 rounded-t w-8"
                  style={{ height: `${(data.revenue / Math.max(...mockPerformanceData.map(d => d.revenue))) * 150}px` }}
                  title={`Revenue: $${data.revenue}`}
                ></div>
                <div 
                  className="bg-green-500 rounded-t w-8"
                  style={{ height: `${(data.offers / Math.max(...mockPerformanceData.map(d => d.offers))) * 150}px` }}
                  title={`Offers: ${data.offers}`}
                ></div>
              </div>
              <span className="text-xs text-gray-600 dark:text-slate-400">{data.month}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-slate-400">Revenue</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-slate-400">Offers</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Offers */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">Recent Offers</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-slate-700">
            {mockRecentOffers.map((offer) => (
              <div key={offer.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{offer.title}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(offer.type)}`}>
                        {offer.type.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(offer.status)}`}>
                        {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                      {offer.views} views • {offer.purchases} purchases • ${offer.revenue.toFixed(2)} revenue
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Purchases */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">Recent Purchases</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-slate-700">
            {mockRecentPurchases.map((purchase) => (
              <div key={purchase.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{purchase.offerTitle}</div>
                    <div className="text-sm text-gray-500 dark:text-slate-400">{purchase.buyerName} ({purchase.buyerEmail})</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                      {new Date(purchase.purchaseDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-slate-100">${purchase.amount}</div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(purchase.status)}`}>
                      {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-primary-600 text-white px-4 py-3 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors">
            Create New Offer
          </button>
          <button className="bg-green-600 text-white px-4 py-3 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
            View Analytics
          </button>
          <button className="bg-blue-600 text-white px-4 py-3 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
            Manage Companies
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;