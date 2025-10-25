import React from 'react';
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

const AdminDashboard: React.FC = () => {
  // Dummy data
  const stats = {
    totalCompanies: 156,
    pendingApprovals: 12,
    activeOffers: 342,
    totalRevenue: 45680,
    newUsers: 89,
    commissionEarned: 4568
  };

  const recentActivities = [
    { id: 1, type: 'approval', message: 'New company "TechCorp" submitted for approval', time: '2 min ago', status: 'pending' },
    { id: 2, type: 'offer', message: 'Offer "Summer Sale" approved and went live', time: '15 min ago', status: 'approved' },
    { id: 3, type: 'payment', message: 'Payment received from "Restaurant ABC" - $120', time: '1 hour ago', status: 'completed' },
    { id: 4, type: 'rejection', message: 'Company "FakeCorp" rejected - Invalid documents', time: '2 hours ago', status: 'rejected' },
    { id: 5, type: 'user', message: 'New user "john@example.com" registered', time: '3 hours ago', status: 'new' }
  ];

  const chartData = {
    revenue: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Revenue ($)',
        data: [12000, 15000, 18000, 22000, 19000, 25000],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2
      }]
    },
    offers: {
      labels: ['Active', 'Pending', 'Rejected', 'Expired'],
      datasets: [{
        data: [342, 12, 8, 45],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(107, 114, 128, 0.8)'
        ]
      }]
    },
    companies: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'New Companies',
        data: [12, 19, 8, 15],
        borderColor: 'rgba(168, 85, 247, 1)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4
      }]
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-slate-400 mt-2">Welcome back! Here's what's happening on Tilbod today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <span className="text-2xl">🏢</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Total Companies</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100">{stats.totalCompanies}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400">
              <span className="text-2xl">⏰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Pending Approvals</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100">{stats.pendingApprovals}</p>
              <p className="text-xs text-red-600 dark:text-red-400">30 min SLA</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Active Offers</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100">{stats.activeOffers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100">${stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">New Users (30d)</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100">{stats.newUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
              <span className="text-2xl">💎</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Commission Earned</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100">${stats.commissionEarned.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Revenue Trend</h3>
          <Bar data={chartData.revenue} options={{
            responsive: true,
            plugins: {
              legend: {
                display: false
              }
            }
          }} />
        </div>

        {/* Offers Distribution */}
        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Offers Distribution</h3>
          <Doughnut data={chartData.offers} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }} />
        </div>
      </div>

      {/* Companies Growth Chart */}
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">New Companies This Month</h3>
        <Line data={chartData.companies} options={{
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          }
        }} />
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  activity.status === 'pending' ? 'bg-yellow-400' :
                  activity.status === 'approved' ? 'bg-green-400' :
                  activity.status === 'completed' ? 'bg-blue-400' :
                  activity.status === 'rejected' ? 'bg-red-400' : 'bg-gray-400'
                }`}></div>
                <span className="text-sm text-gray-900 dark:text-slate-100">{activity.message}</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-slate-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;