import React, { useState } from 'react';
import { Users, Search, Filter, Eye, DollarSign, ShoppingCart, TrendingUp, Download, Star } from 'lucide-react';

const Buyers: React.FC = () => {
  const [selectedBuyer, setSelectedBuyer] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for buyers
  const buyers = [
    {
      id: '1',
      name: 'Anna Jónsdóttir',
      email: 'anna.jonsdottir@email.is',
      phone: '+354 123 4567',
      location: 'Reykjavik, Iceland',
      joinDate: '2023-08-15',
      totalOrders: 12,
      totalSpent: 450000,
      lastOrder: '2024-04-10',
      status: 'active',
      rating: 4.8,
      favoriteCategory: 'Outdoor Gear',
      avgOrderValue: 37500,
      ordersThisMonth: 3,
      lifetimeValue: 450000,
      lastActivity: '2024-04-15',
      notes: 'Prefers winter gear, very satisfied customer'
    },
    {
      id: '2',
      name: 'Erik Magnússon',
      email: 'erik.magnusson@email.is',
      phone: '+354 987 6543',
      location: 'Akureyri, Iceland',
      joinDate: '2023-11-22',
      totalOrders: 8,
      totalSpent: 890000,
      lastOrder: '2024-04-12',
      status: 'active',
      rating: 4.9,
      favoriteCategory: 'Tourism',
      avgOrderValue: 111250,
      ordersThisMonth: 2,
      lifetimeValue: 890000,
      lastActivity: '2024-04-12',
      notes: 'Adventure enthusiast, high-value customer'
    },
    {
      id: '3',
      name: 'Maria Sigurðardóttir',
      email: 'maria.sigurdardottir@email.is',
      phone: '+354 555 1234',
      location: 'Kópavogur, Iceland',
      joinDate: '2024-01-05',
      totalOrders: 5,
      totalSpent: 180000,
      lastOrder: '2024-04-08',
      status: 'active',
      rating: 4.6,
      favoriteCategory: 'Technology',
      avgOrderValue: 36000,
      ordersThisMonth: 1,
      lifetimeValue: 180000,
      lastActivity: '2024-04-08',
      notes: 'Tech services customer, regular buyer'
    },
    {
      id: '4',
      name: 'Ólafur Pétursson',
      email: 'olafur.petursson@email.is',
      phone: '+354 777 8888',
      location: 'Hafnarfjörður, Iceland',
      joinDate: '2023-09-30',
      totalOrders: 15,
      totalSpent: 320000,
      lastOrder: '2024-03-28',
      status: 'inactive',
      rating: 4.2,
      favoriteCategory: 'Gift Cards',
      avgOrderValue: 21333,
      ordersThisMonth: 0,
      lifetimeValue: 320000,
      lastActivity: '2024-03-28',
      notes: 'Gift card buyer, hasn\'t purchased recently'
    },
    {
      id: '5',
      name: 'Helga Guðmundsdóttir',
      email: 'helga.gudmundsdottir@email.is',
      phone: '+354 999 0000',
      location: 'Reykjavik, Iceland',
      joinDate: '2024-02-14',
      totalOrders: 3,
      totalSpent: 75000,
      lastOrder: '2024-04-14',
      status: 'new',
      rating: 5.0,
      favoriteCategory: 'Outdoor Gear',
      avgOrderValue: 25000,
      ordersThisMonth: 2,
      lifetimeValue: 75000,
      lastActivity: '2024-04-14',
      notes: 'New customer, very satisfied with first purchases'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300';
      case 'inactive':
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
      case 'new':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300';
      case 'vip':
        return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('is-IS', {
      style: 'currency',
      currency: 'ISK'
    }).format(amount);
  };

  // const formatNumber = (num: number) => {
  //   return new Intl.NumberFormat('is-IS').format(num);
  // };

  const filteredBuyers = buyers.filter(buyer => {
    const matchesSearch = buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         buyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         buyer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || buyer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalBuyers = buyers.length;
  const activeBuyers = buyers.filter(b => b.status === 'active').length;
  const totalRevenue = buyers.reduce((sum, b) => sum + b.totalSpent, 0);
  const avgOrderValue = buyers.reduce((sum, b) => sum + b.avgOrderValue, 0) / buyers.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Buyers</h1>
          <p className="mt-2 text-gray-600 dark:text-slate-400">
            View information about your customers and buyers
          </p>
        </div>
        <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Total Buyers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{totalBuyers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Active Buyers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{activeBuyers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{formatCurrency(avgOrderValue)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search buyers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="new">New</option>
              <option value="vip">VIP</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-md hover:bg-gray-50 dark:hover:bg-slate-600 flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Buyers Table */}
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">Buyer Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Buyer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Last Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
              {filteredBuyers.map((buyer) => (
                <tr key={buyer.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                            {buyer.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-slate-100">
                          {buyer.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-slate-400">
                          {buyer.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(buyer.status)}`}>
                      {buyer.status.charAt(0).toUpperCase() + buyer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-slate-100">{buyer.totalOrders}</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">{buyer.ordersThisMonth} this month</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900 dark:text-slate-100">
                      {formatCurrency(buyer.totalSpent)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">
                      {formatCurrency(buyer.avgOrderValue)} avg
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-900 dark:text-slate-100">{buyer.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-slate-100">
                      {new Date(buyer.lastOrder).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedBuyer(buyer.id)}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Buyer Details Modal */}
      {selectedBuyer && (
        <div className="fixed inset-0 bg-gray-600 dark:bg-slate-900 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-slate-800">
            <div className="mt-3">
              {(() => {
                const buyer = buyers.find(b => b.id === selectedBuyer);
                if (!buyer) return null;
                
                return (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">
                        {buyer.name}
                      </h3>
                      <button
                        onClick={() => setSelectedBuyer(null)}
                        className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Email</label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{buyer.email}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Phone</label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{buyer.phone}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Location</label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{buyer.location}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Member Since</label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">
                            {new Date(buyer.joinDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Status</label>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(buyer.status)}`}>
                            {buyer.status.charAt(0).toUpperCase() + buyer.status.slice(1)}
                          </span>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Rating</label>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm text-gray-900 dark:text-slate-100">{buyer.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Notes</label>
                        <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{buyer.notes}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{buyer.totalOrders}</p>
                          <p className="text-sm text-gray-500 dark:text-slate-400">Total Orders</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                            {formatCurrency(buyer.totalSpent)}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-slate-400">Total Spent</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                            {formatCurrency(buyer.avgOrderValue)}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-slate-400">Avg Order Value</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                            {buyer.favoriteCategory}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-slate-400">Favorite Category</p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buyers;