import React, { useState } from 'react';

// Mock data for reports
const mockReports = {
  revenue: {
    total: 45680.50,
    thisMonth: 12340.25,
    lastMonth: 9876.30,
    growth: 24.9
  },
  commissions: {
    total: 2284.03,
    thisMonth: 617.01,
    lastMonth: 493.82,
    growth: 24.9
  },
  offers: {
    total: 156,
    active: 89,
    pending: 12,
    expired: 55
  },
  users: {
    total: 1247,
    newThisMonth: 89,
    active: 892,
    inactive: 355
  },
  companies: {
    total: 45,
    approved: 38,
    pending: 4,
    rejected: 3
  }
};

const monthlyData = [
  { month: 'Jan', revenue: 8500, commissions: 425, offers: 12, users: 45 },
  { month: 'Feb', revenue: 9200, commissions: 460, offers: 15, users: 52 },
  { month: 'Mar', revenue: 10800, commissions: 540, offers: 18, users: 61 },
  { month: 'Apr', revenue: 12340, commissions: 617, offers: 22, users: 89 },
];

const topCompanies = [
  { name: 'Fashion Forward Ltd', revenue: 15420.50, offers: 12, commission: 771.03 },
  { name: 'Mario\'s Pizza', revenue: 8920.75, offers: 8, commission: 446.04 },
  { name: 'Tech Solutions Inc', revenue: 3240.00, offers: 5, commission: 162.00 },
  { name: 'Serenity Spa', revenue: 1800.00, offers: 1, commission: 90.00 },
  { name: 'The Golden Bar', revenue: 0, offers: 0, commission: 0 }
];

const topOffers = [
  { title: 'Summer Fashion Sale - 50% Off', views: 1250, purchases: 89, revenue: 2314.11 },
  { title: 'Tuesday 2-for-1 Pizza Deal', views: 890, purchases: 45, revenue: 584.55 },
  { title: 'Tech Gadgets Bundle', views: 2100, purchases: 156, revenue: 12478.44 },
  { title: 'Luxury Spa Gift Card', views: 450, purchases: 12, revenue: 1800.00 },
  { title: 'Happy Hour Cocktails - 30% Off', views: 0, purchases: 0, revenue: 0 }
];

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('this_month');
  const [selectedReport, setSelectedReport] = useState('overview');

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600 dark:text-green-400';
    if (growth < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-slate-400';
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return '↗️';
    if (growth < 0) return '↘️';
    return '➡️';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Reports & Analytics</h1>
          <p className="mt-2 text-gray-600 dark:text-slate-400">
            Comprehensive platform analytics and performance metrics
          </p>
        </div>
        <div className="flex space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="this_month">This Month</option>
            <option value="last_month">Last Month</option>
            <option value="last_3_months">Last 3 Months</option>
            <option value="last_6_months">Last 6 Months</option>
            <option value="this_year">This Year</option>
          </select>
          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="overview">Overview</option>
            <option value="revenue">Revenue</option>
            <option value="commissions">Commissions</option>
            <option value="offers">Offers</option>
            <option value="users">Users</option>
          </select>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">Total Revenue</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100">${mockReports.revenue.total.toLocaleString()}</p>
              <p className={`text-sm ${getGrowthColor(mockReports.revenue.growth)}`}>
                {getGrowthIcon(mockReports.revenue.growth)} {mockReports.revenue.growth}% vs last month
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">💳</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">Total Commissions</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100">${mockReports.commissions.total.toLocaleString()}</p>
              <p className={`text-sm ${getGrowthColor(mockReports.commissions.growth)}`}>
                {getGrowthIcon(mockReports.commissions.growth)} {mockReports.commissions.growth}% vs last month
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
              <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">Total Offers</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100">{mockReports.offers.total}</p>
              <p className="text-sm text-gray-500 dark:text-slate-400">{mockReports.offers.active} active</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">Total Users</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100">{mockReports.users.total.toLocaleString()}</p>
              <p className="text-sm text-gray-500 dark:text-slate-400">{mockReports.users.newThisMonth} new this month</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">🏢</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">Total Companies</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100">{mockReports.companies.total}</p>
              <p className="text-sm text-gray-500 dark:text-slate-400">{mockReports.companies.approved} approved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-4">Revenue Trend</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex flex-col items-center space-y-2">
                <div 
                  className="bg-blue-500 rounded-t w-12"
                  style={{ height: `${(data.revenue / Math.max(...monthlyData.map(d => d.revenue))) * 200}px` }}
                ></div>
                <span className="text-xs text-gray-600 dark:text-slate-400">{data.month}</span>
                <span className="text-xs font-medium text-gray-900 dark:text-slate-100">${data.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Commissions Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-4">Commissions Trend</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex flex-col items-center space-y-2">
                <div 
                  className="bg-green-500 rounded-t w-12"
                  style={{ height: `${(data.commissions / Math.max(...monthlyData.map(d => d.commissions))) * 200}px` }}
                ></div>
                <span className="text-xs text-gray-600 dark:text-slate-400">{data.month}</span>
                <span className="text-xs font-medium text-gray-900 dark:text-slate-100">${data.commissions.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Companies */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">Top Performing Companies</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-slate-700">
            {topCompanies.map((company, index) => (
              <div key={company.name} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-slate-600 flex items-center justify-center">
                        <span className="text-gray-600 dark:text-slate-300 font-medium text-sm">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{company.name}</div>
                      <div className="text-sm text-gray-500 dark:text-slate-400">{company.offers} offers</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-slate-100">${company.revenue.toLocaleString()}</div>
                    <div className="text-sm text-gray-500 dark:text-slate-400">${company.commission.toFixed(2)} commission</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Offers */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">Top Performing Offers</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-slate-700">
            {topOffers.map((offer, index) => (
              <div key={offer.title} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-slate-600 flex items-center justify-center">
                        <span className="text-gray-600 dark:text-slate-300 font-medium text-sm">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-slate-100 truncate max-w-xs">{offer.title}</div>
                      <div className="text-sm text-gray-500 dark:text-slate-400">{offer.views} views, {offer.purchases} purchases</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-slate-100">${offer.revenue.toLocaleString()}</div>
                    <div className="text-sm text-gray-500 dark:text-slate-400">
                      {offer.purchases > 0 ? `${((offer.purchases / offer.views) * 100).toFixed(1)}%` : '0%'} conversion
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">Detailed Statistics</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-2">Revenue Breakdown</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-slate-400">This Month:</span>
                  <span className="font-medium text-gray-900 dark:text-slate-100">${mockReports.revenue.thisMonth.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-slate-400">Last Month:</span>
                  <span className="font-medium text-gray-900 dark:text-slate-100">${mockReports.revenue.lastMonth.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-slate-400">Growth:</span>
                  <span className={`font-medium ${getGrowthColor(mockReports.revenue.growth)}`}>
                    {mockReports.revenue.growth}%
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-2">Commission Breakdown</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-slate-400">This Month:</span>
                  <span className="font-medium text-gray-900 dark:text-slate-100">${mockReports.commissions.thisMonth.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-slate-400">Last Month:</span>
                  <span className="font-medium text-gray-900 dark:text-slate-100">${mockReports.commissions.lastMonth.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-slate-400">Growth:</span>
                  <span className={`font-medium ${getGrowthColor(mockReports.commissions.growth)}`}>
                    {mockReports.commissions.growth}%
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-2">Offer Status</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-slate-400">Active:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">{mockReports.offers.active}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-slate-400">Pending:</span>
                  <span className="font-medium text-yellow-600 dark:text-yellow-400">{mockReports.offers.pending}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-slate-400">Expired:</span>
                  <span className="font-medium text-gray-600 dark:text-slate-400">{mockReports.offers.expired}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-2">User Activity</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-slate-400">Active Users:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">{mockReports.users.active}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-slate-400">Inactive Users:</span>
                  <span className="font-medium text-gray-600 dark:text-slate-400">{mockReports.users.inactive}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-slate-400">New This Month:</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">{mockReports.users.newThisMonth}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;