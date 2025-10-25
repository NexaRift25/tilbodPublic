import React, { useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// Mock data for revenue tracking
const mockRevenueData = {
  totalRevenue: 15420.50,
  thisMonthRevenue: 3250.75,
  lastMonthRevenue: 2890.25,
  revenueGrowth: 12.5,
  totalCommissions: 771.03,
  thisMonthCommissions: 162.50,
  lastMonthCommissions: 145.25,
  commissionGrowth: 11.9,
  netRevenue: 14649.47,
  averageOrderValue: 173.26,
  totalOrders: 89,
  refunds: 125.50,
  refundRate: 0.81
};

const mockRevenueByOfferType = [
  { type: 'Active Offers', revenue: 8234.50, percentage: 53.4, count: 45 },
  { type: 'Weekdays Offers', revenue: 4567.25, percentage: 29.6, count: 23 },
  { type: 'Happy Hour Offers', revenue: 1890.75, percentage: 12.3, count: 12 },
  { type: 'Gift Cards', revenue: 728.00, percentage: 4.7, count: 9 }
];

const mockMonthlyRevenue = [
  { month: 'Jan', revenue: 3250, orders: 18, avgOrder: 180.56 },
  { month: 'Dec', revenue: 2890, orders: 16, avgOrder: 180.63 },
  { month: 'Nov', revenue: 2100, orders: 12, avgOrder: 175.00 },
  { month: 'Oct', revenue: 1800, orders: 10, avgOrder: 180.00 },
  { month: 'Sep', revenue: 1650, orders: 9, avgOrder: 183.33 },
  { month: 'Aug', revenue: 1420, orders: 8, avgOrder: 177.50 }
];

const mockRecentTransactions = [
  {
    id: '1',
    offerTitle: 'Summer Fashion Sale - 50% Off',
    customerName: 'John Doe',
    amount: 25.99,
    commission: 1.30,
    netAmount: 24.69,
    date: '2024-01-20T14:30:00Z',
    status: 'completed'
  },
  {
    id: '2',
    offerTitle: 'Tuesday 2-for-1 Pizza Deal',
    customerName: 'Jane Smith',
    amount: 12.99,
    commission: 0.65,
    netAmount: 12.34,
    date: '2024-01-19T18:45:00Z',
    status: 'completed'
  },
  {
    id: '3',
    offerTitle: 'Luxury Spa Gift Card',
    customerName: 'Mike Johnson',
    amount: 150.00,
    commission: 7.50,
    netAmount: 142.50,
    date: '2024-01-18T11:20:00Z',
    status: 'completed'
  },
  {
    id: '4',
    offerTitle: 'Happy Hour Cocktails',
    customerName: 'Sarah Wilson',
    amount: 45.00,
    commission: 2.25,
    netAmount: 42.75,
    date: '2024-01-17T16:15:00Z',
    status: 'completed'
  },
  {
    id: '5',
    offerTitle: 'Weekend Brunch Special',
    customerName: 'David Brown',
    amount: 35.50,
    commission: 1.78,
    netAmount: 33.72,
    date: '2024-01-16T12:30:00Z',
    status: 'refunded'
  }
];

const Revenue: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  // const [selectedOfferType, setSelectedOfferType] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300';
      case 'refunded': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300';
      case 'failed': return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
    }
  };

  const chartData = {
    revenue: {
      labels: mockMonthlyRevenue.map(item => item.month),
      datasets: [{
        label: 'Revenue ($)',
        data: mockMonthlyRevenue.map(item => item.revenue),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        tension: 0.4
      }]
    },
    offerTypes: {
      labels: mockRevenueByOfferType.map(item => item.type),
      datasets: [{
        data: mockRevenueByOfferType.map(item => item.revenue),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(34, 197, 94, 0.8)'
        ],
        borderWidth: 2
      }]
    },
    orders: {
      labels: mockMonthlyRevenue.map(item => item.month),
      datasets: [{
        label: 'Orders',
        data: mockMonthlyRevenue.map(item => item.orders),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
        tension: 0.4
      }]
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Revenue</h1>
          <p className="mt-2 text-gray-600 dark:text-slate-400">
            Track your revenue and financial performance
          </p>
        </div>
        <div className="flex space-x-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors">
            Export Report
          </button>
        </div>
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
              <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100">
                ${mockRevenueData.totalRevenue.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                ↗️ {mockRevenueData.revenueGrowth}% vs last month
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">Net Revenue</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100">
                ${mockRevenueData.netRevenue.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                After commissions & fees
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">🛒</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">Total Orders</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100">
                {mockRevenueData.totalOrders}
              </p>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                ${mockRevenueData.averageOrderValue} avg order
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">💸</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">Commissions Paid</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100">
                ${mockRevenueData.totalCommissions.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                {((mockRevenueData.totalCommissions / mockRevenueData.totalRevenue) * 100).toFixed(1)}% of revenue
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Revenue Trend</h3>
          <Line data={chartData.revenue} options={{
            responsive: true,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function(value) {
                    return '$' + value.toLocaleString();
                  }
                }
              }
            }
          }} />
        </div>

        {/* Revenue by Offer Type */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Revenue by Offer Type</h3>
          <Doughnut data={chartData.offerTypes} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }} />
        </div>
      </div>

      {/* Orders and Revenue Comparison */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Orders vs Revenue</h3>
        <Bar data={{
          labels: chartData.orders.labels,
          datasets: [
            {
              label: 'Revenue ($)',
              data: chartData.revenue.datasets[0].data,
              backgroundColor: 'rgba(59, 130, 246, 0.5)',
              borderColor: 'rgba(59, 130, 246, 1)',
              yAxisID: 'y'
            },
            {
              label: 'Orders',
              data: chartData.orders.datasets[0].data,
              backgroundColor: 'rgba(34, 197, 94, 0.5)',
              borderColor: 'rgba(34, 197, 94, 1)',
              yAxisID: 'y1'
            }
          ]
        }} options={{
          responsive: true,
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              ticks: {
                callback: function(value) {
                  return '$' + value.toLocaleString();
                }
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              grid: {
                drawOnChartArea: false,
              },
            }
          }
        }} />
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Offer Type Details */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Revenue Breakdown</h3>
          <div className="space-y-4">
            {mockRevenueByOfferType.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded mr-3 ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-purple-500' :
                    index === 2 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-slate-100">{item.type}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">{item.count} offers</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">
                    ${item.revenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">{item.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commission Analysis */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Commission Analysis</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-slate-400">This Month:</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                ${mockRevenueData.thisMonthCommissions.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-slate-400">Last Month:</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                ${mockRevenueData.lastMonthCommissions.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-slate-400">Growth:</span>
              <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                +{mockRevenueData.commissionGrowth}%
              </span>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-slate-400">Commission Rate:</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                  {((mockRevenueData.totalCommissions / mockRevenueData.totalRevenue) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Offer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Commission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Net Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
              {mockRecentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-slate-100">
                      {transaction.offerTitle}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-slate-100">
                      {transaction.customerName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900 dark:text-slate-100">
                      ${transaction.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-red-600 dark:text-red-400">
                      -${transaction.commission}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                      ${transaction.netAmount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-slate-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Revenue;