import React, { useState } from 'react';

// Mock data for commissions
const mockCommissions = [
  {
    id: '1',
    offerId: 'OFF-001',
    offerTitle: 'Summer Fashion Sale - 50% Off',
    company: 'Fashion Forward Ltd',
    offerType: 'active_offer',
    basePrice: 25.99,
    commissionRate: 5.0,
    commissionAmount: 1.30,
    status: 'paid',
    paymentDate: '2024-01-20T10:30:00Z',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    offerId: 'OFF-002',
    offerTitle: 'Tuesday 2-for-1 Pizza Deal',
    company: 'Mario\'s Pizza',
    offerType: 'weekdays_offer',
    basePrice: 12.99,
    commissionRate: 4.0,
    commissionAmount: 0.52,
    status: 'paid',
    paymentDate: '2024-01-19T14:20:00Z',
    createdAt: '2024-01-16T14:20:00Z'
  },
  {
    id: '3',
    offerId: 'OFF-003',
    offerTitle: 'Happy Hour Cocktails - 30% Off',
    company: 'The Golden Bar',
    offerType: 'happy_hour_offer',
    basePrice: 8.99,
    commissionRate: 10.0,
    commissionAmount: 0.90,
    status: 'pending',
    paymentDate: null,
    createdAt: '2024-01-18T09:15:00Z'
  },
  {
    id: '4',
    offerId: 'OFF-004',
    offerTitle: 'Luxury Spa Gift Card',
    company: 'Serenity Spa',
    offerType: 'gift_card',
    basePrice: 150.00,
    commissionRate: 5.0,
    commissionAmount: 7.50,
    status: 'paid',
    paymentDate: '2024-01-17T16:45:00Z',
    createdAt: '2024-01-17T16:45:00Z'
  },
  {
    id: '5',
    offerId: 'OFF-005',
    offerTitle: 'Tech Gadgets Bundle',
    company: 'Tech Solutions Inc',
    offerType: 'active_offer',
    basePrice: 79.99,
    commissionRate: 3.0,
    commissionAmount: 2.40,
    status: 'overdue',
    paymentDate: null,
    createdAt: '2024-01-10T11:00:00Z'
  }
];

const commissionRates = {
  active_offer: 5.0,
  weekdays_offer: 4.0,
  happy_hour_offer: 10.0,
  gift_card: 5.0,
  seasonal_offer: 6.0
};

const statusColors = {
  paid: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300',
  pending: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300',
  overdue: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300',
  cancelled: 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300'
};

const Commissions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const filteredCommissions = mockCommissions.filter(commission => {
    const matchesSearch = commission.offerTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.offerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || commission.status === statusFilter;
    const matchesType = typeFilter === 'all' || commission.offerType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalCommissions = mockCommissions.reduce((sum, commission) => sum + commission.commissionAmount, 0);
  const paidCommissions = mockCommissions.filter(c => c.status === 'paid').reduce((sum, commission) => sum + commission.commissionAmount, 0);
  const pendingCommissions = mockCommissions.filter(c => c.status === 'pending').reduce((sum, commission) => sum + commission.commissionAmount, 0);
  const overdueCommissions = mockCommissions.filter(c => c.status === 'overdue').reduce((sum, commission) => sum + commission.commissionAmount, 0);

  const handleMarkAsPaid = (commissionId: string) => {
    console.log('Marking commission as paid:', commissionId);
    // In real app, this would call the API
  };

  const handleExportCommissions = () => {
    console.log('Exporting commissions data');
    // In real app, this would generate and download a CSV/Excel file
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Commissions Management</h1>
          <p className="mt-2 text-gray-600 dark:text-slate-400">
            Track and manage platform commissions from all offers
          </p>
        </div>
        <button
          onClick={handleExportCommissions}
          className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
        >
          Export Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">${totalCommissions.toFixed(2)}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Total Commissions</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">${paidCommissions.toFixed(2)}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Paid</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">${pendingCommissions.toFixed(2)}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Pending</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">${overdueCommissions.toFixed(2)}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Overdue</div>
        </div>
      </div>

      {/* Commission Rates Overview */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-4">Commission Rates by Offer Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Object.entries(commissionRates).map(([type, rate]) => (
            <div key={type} className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-slate-400 mb-1">{type.replace('_', ' ').toUpperCase()}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{rate}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search commissions..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Offer Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Types</option>
              {Object.keys(commissionRates).map(type => (
                <option key={type} value={type}>{type.replace('_', ' ').toUpperCase()}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Time</option>
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
              <option value="last_3_months">Last 3 Months</option>
            </select>
          </div>
        </div>
      </div>

      {/* Commissions Table */}
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-slate-100">Commission Records</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Offer Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Pricing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Commission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Payment Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
              {filteredCommissions.map((commission) => (
                <tr key={commission.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{commission.offerTitle}</div>
                      <div className="text-sm text-gray-500 dark:text-slate-400">ID: {commission.offerId}</div>
                      <div className="text-xs text-gray-400 dark:text-slate-500">
                        Created: {new Date(commission.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-slate-100">
                    {commission.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300">
                      {commission.offerType.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-slate-100">
                    <div>Base Price: ${commission.basePrice}</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">Rate: {commission.commissionRate}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-slate-100">
                    <div className="font-medium">${commission.commissionAmount.toFixed(2)}</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">
                      {commission.commissionRate}% of ${commission.basePrice}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[commission.status as keyof typeof statusColors]}`}>
                      {commission.status.charAt(0).toUpperCase() + commission.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-400">
                    {commission.paymentDate ? new Date(commission.paymentDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {commission.status === 'pending' && (
                      <button
                        onClick={() => handleMarkAsPaid(commission.id)}
                        className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                      >
                        Mark as Paid
                      </button>
                    )}
                    {commission.status === 'overdue' && (
                      <button
                        onClick={() => handleMarkAsPaid(commission.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                      >
                        Mark as Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-4">Commission Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-2">By Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-slate-400">Paid:</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">${paidCommissions.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-slate-400">Pending:</span>
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">${pendingCommissions.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-slate-400">Overdue:</span>
                <span className="text-sm font-medium text-red-600 dark:text-red-400">${overdueCommissions.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-2">By Offer Type</h4>
            <div className="space-y-2">
              {Object.entries(commissionRates).map(([type]) => {
                const typeCommissions = mockCommissions
                  .filter(c => c.offerType === type)
                  .reduce((sum, c) => sum + c.commissionAmount, 0);
                return (
                  <div key={type} className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">{type.replace('_', ' ')}:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-slate-100">${typeCommissions.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-2">Payment Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-slate-400">Total Due:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-slate-100">${totalCommissions.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-slate-400">Paid:</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {((paidCommissions / totalCommissions) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-slate-400">Outstanding:</span>
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  {(((pendingCommissions + overdueCommissions) / totalCommissions) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commissions;