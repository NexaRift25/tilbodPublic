import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Eye, Users, DollarSign, ShoppingCart, Download, BarChart3, PieChart, Activity } from 'lucide-react';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  // const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalViews: 15420,
      totalPurchases: 892,
      totalRevenue: 12500000,
      conversionRate: 5.78,
      avgOrderValue: 14013,
      newCustomers: 234,
      returningCustomers: 658,
      bounceRate: 32.4,
      avgSessionDuration: '3:24'
    },
    trends: {
      views: { current: 15420, previous: 12850, change: 20.0 },
      purchases: { current: 892, previous: 756, change: 18.0 },
      revenue: { current: 12500000, previous: 10200000, change: 22.5 },
      conversion: { current: 5.78, previous: 5.89, change: -1.9 }
    },
    topOffers: [
      { id: '1', title: 'Winter Gear Sale', views: 3250, purchases: 189, revenue: 2646000, conversion: 5.8 },
      { id: '2', title: 'Adventure Package Deal', views: 2890, purchases: 134, revenue: 15075000, conversion: 4.6 },
      { id: '3', title: 'Tech Services Bundle', views: 2100, purchases: 89, revenue: 1424000, conversion: 4.2 },
      { id: '4', title: 'Gift Card Special', views: 1890, purchases: 156, revenue: 1326000, conversion: 8.3 }
    ],
    topCategories: [
      { name: 'Outdoor Gear', revenue: 5200000, percentage: 41.6, color: 'bg-blue-500' },
      { name: 'Tourism', revenue: 4500000, percentage: 36.0, color: 'bg-green-500' },
      { name: 'Technology', revenue: 1800000, percentage: 14.4, color: 'bg-purple-500' },
      { name: 'Gift Cards', revenue: 1000000, percentage: 8.0, color: 'bg-pink-500' }
    ],
    monthlyData: [
      { month: 'Jan', views: 12000, purchases: 650, revenue: 9100000 },
      { month: 'Feb', views: 13500, purchases: 720, revenue: 10080000 },
      { month: 'Mar', views: 14200, purchases: 780, revenue: 10920000 },
      { month: 'Apr', views: 15420, purchases: 892, revenue: 12500000 }
    ],
    deviceBreakdown: [
      { device: 'Desktop', percentage: 45.2, users: 6968 },
      { device: 'Mobile', percentage: 38.7, users: 5967 },
      { device: 'Tablet', percentage: 16.1, users: 2485 }
    ],
    trafficSources: [
      { source: 'Direct', percentage: 35.4, users: 5459 },
      { source: 'Google Search', percentage: 28.9, users: 4456 },
      { source: 'Social Media', percentage: 18.2, users: 2806 },
      { source: 'Email Marketing', percentage: 12.1, users: 1865 },
      { source: 'Referrals', percentage: 5.4, users: 834 }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('is-IS', {
      style: 'currency',
      currency: 'ISK'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('is-IS').format(num);
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Analytics</h1>
          <p className="mt-2 text-gray-600 dark:text-slate-400">
            View detailed analytics and performance metrics
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Total Views</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                {formatNumber(analyticsData.overview.totalViews)}
              </p>
              <div className="flex items-center mt-1">
                {getChangeIcon(analyticsData.trends.views.change)}
                <span className={`text-sm font-medium ${getChangeColor(analyticsData.trends.views.change)}`}>
                  {analyticsData.trends.views.change > 0 ? '+' : ''}{analyticsData.trends.views.change}%
                </span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Total Purchases</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                {formatNumber(analyticsData.overview.totalPurchases)}
              </p>
              <div className="flex items-center mt-1">
                {getChangeIcon(analyticsData.trends.purchases.change)}
                <span className={`text-sm font-medium ${getChangeColor(analyticsData.trends.purchases.change)}`}>
                  {analyticsData.trends.purchases.change > 0 ? '+' : ''}{analyticsData.trends.purchases.change}%
                </span>
              </div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                {formatCurrency(analyticsData.overview.totalRevenue)}
              </p>
              <div className="flex items-center mt-1">
                {getChangeIcon(analyticsData.trends.revenue.change)}
                <span className={`text-sm font-medium ${getChangeColor(analyticsData.trends.revenue.change)}`}>
                  {analyticsData.trends.revenue.change > 0 ? '+' : ''}{analyticsData.trends.revenue.change}%
                </span>
              </div>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                {analyticsData.overview.conversionRate}%
              </p>
              <div className="flex items-center mt-1">
                {getChangeIcon(analyticsData.trends.conversion.change)}
                <span className={`text-sm font-medium ${getChangeColor(analyticsData.trends.conversion.change)}`}>
                  {analyticsData.trends.conversion.change > 0 ? '+' : ''}{analyticsData.trends.conversion.change}%
                </span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
              <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">New Customers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{analyticsData.overview.newCustomers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-pink-100 dark:bg-pink-900/20 rounded-lg">
              <Users className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Returning Customers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{analyticsData.overview.returningCustomers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{formatCurrency(analyticsData.overview.avgOrderValue)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
              <Activity className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Bounce Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{analyticsData.overview.bounceRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">Revenue Trend</h3>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300">
                <BarChart3 className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300">
                <PieChart className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="h-64 flex items-end space-x-2">
            {analyticsData.monthlyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-primary-500 rounded-t"
                  style={{ height: `${(data.revenue / Math.max(...analyticsData.monthlyData.map(d => d.revenue))) * 200}px` }}
                ></div>
                <div className="mt-2 text-xs text-gray-500 dark:text-slate-400">{data.month}</div>
                <div className="text-xs font-medium text-gray-900 dark:text-slate-100">
                  {formatCurrency(data.revenue / 1000000)}M
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-4">Revenue by Category</h3>
          <div className="space-y-4">
            {analyticsData.topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{category.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${category.color}`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-slate-100 w-20 text-right">
                    {formatCurrency(category.revenue)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Offers */}
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">Top Performing Offers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Offer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Purchases
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Conversion
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
              {analyticsData.topOffers.map((offer) => (
                <tr key={offer.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{offer.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-slate-100">{formatNumber(offer.views)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-slate-100">{offer.purchases}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-slate-100">{formatCurrency(offer.revenue)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-slate-100">{offer.conversion}%</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Device and Traffic Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-4">Device Breakdown</h3>
          <div className="space-y-4">
            {analyticsData.deviceBreakdown.map((device, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{device.device}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="h-2 bg-primary-500 rounded-full"
                      style={{ width: `${device.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-slate-100 w-16 text-right">
                    {device.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-4">Traffic Sources</h3>
          <div className="space-y-4">
            {analyticsData.trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{source.source}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="h-2 bg-green-500 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-slate-100 w-16 text-right">
                    {source.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;