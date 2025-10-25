import React, { useState } from 'react';

// Mock data for offers
const mockOffers = [
  {
    id: '1',
    title: 'Summer Fashion Sale - 50% Off',
    description: 'Get 50% off on all summer clothing items. Valid for 30 days.',
    type: 'active_offer',
    pricing: { finalPrice: 25.99, originalPrice: 51.98, discount: 50 },
    company: 'Fashion Forward Ltd',
    category: 'Clothing',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    validUntil: '2024-02-15T23:59:59Z',
    views: 1250,
    purchases: 89,
    revenue: 2314.11,
    commission: 25.99
  },
  {
    id: '2',
    title: 'Tuesday 2-for-1 Pizza Deal',
    description: 'Buy one pizza, get one free every Tuesday from 5-9 PM.',
    type: 'weekdays_offer',
    pricing: { finalPrice: 12.99, originalPrice: 25.98, discount: 50 },
    company: 'Mario\'s Pizza',
    category: 'Restaurant',
    status: 'active',
    createdAt: '2024-01-16T14:20:00Z',
    validUntil: '2024-03-16T23:59:59Z',
    views: 890,
    purchases: 45,
    revenue: 584.55,
    commission: 4.00
  },
  {
    id: '3',
    title: 'Happy Hour Cocktails - 30% Off',
    description: 'Enjoy 30% off all cocktails during happy hour 4-7 PM.',
    type: 'happy_hour_offer',
    pricing: { finalPrice: 8.99, originalPrice: 12.99, discount: 30 },
    company: 'The Golden Bar',
    category: 'Bar & Restaurant',
    status: 'pending',
    createdAt: '2024-01-18T09:15:00Z',
    validUntil: '2024-04-18T23:59:59Z',
    views: 0,
    purchases: 0,
    revenue: 0,
    commission: 0
  },
  {
    id: '4',
    title: 'Luxury Spa Gift Card',
    description: 'Premium spa experience with massage and facial treatment.',
    type: 'gift_card',
    pricing: { finalPrice: 150.00, originalPrice: 200.00, discount: 25 },
    company: 'Serenity Spa',
    category: 'Wellness',
    status: 'active',
    createdAt: '2024-01-17T16:45:00Z',
    validUntil: '2024-12-31T23:59:59Z',
    views: 450,
    purchases: 12,
    revenue: 1800.00,
    commission: 90.00
  },
  {
    id: '5',
    title: 'Tech Gadgets Bundle',
    description: 'Get 20% off on selected tech gadgets and accessories.',
    type: 'active_offer',
    pricing: { finalPrice: 79.99, originalPrice: 99.99, discount: 20 },
    company: 'Tech Solutions Inc',
    category: 'Technology',
    status: 'expired',
    createdAt: '2024-01-10T11:00:00Z',
    validUntil: '2024-01-25T23:59:59Z',
    views: 2100,
    purchases: 156,
    revenue: 12478.44,
    commission: 79.99
  }
];

const offerTypes = [
  'active_offer',
  'weekdays_offer', 
  'happy_hour_offer',
  'gift_card',
  'seasonal_offer'
];

const offerStatuses = [
  'active',
  'pending',
  'expired',
  'rejected',
  'paused'
];

const categories = [
  'Clothing',
  'Restaurant',
  'Bar & Restaurant',
  'Wellness',
  'Technology',
  'Entertainment',
  'Healthcare',
  'Education',
  'Automotive',
  'Other'
];

const Offers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredOffers = mockOffers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || offer.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || offer.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || offer.category === categoryFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300';
      case 'expired': return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
      case 'rejected': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300';
      case 'paused': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300';
      default: return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'active_offer': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300';
      case 'weekdays_offer': return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300';
      case 'happy_hour_offer': return 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300';
      case 'gift_card': return 'bg-pink-100 dark:bg-pink-900/20 text-pink-800 dark:text-pink-300';
      case 'seasonal_offer': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
    }
  };

  const handleViewDetails = (offer: any) => {
    setSelectedOffer(offer);
    setShowDetailsModal(true);
  };

  const handleStatusChange = (offerId: string, newStatus: string) => {
    console.log('Changing offer status:', offerId, 'to', newStatus);
    // In real app, this would call the API
  };

  const stats = {
    total: mockOffers.length,
    active: mockOffers.filter(o => o.status === 'active').length,
    pending: mockOffers.filter(o => o.status === 'pending').length,
    expired: mockOffers.filter(o => o.status === 'expired').length,
    totalRevenue: mockOffers.reduce((sum, offer) => sum + offer.revenue, 0),
    totalCommission: mockOffers.reduce((sum, offer) => sum + offer.commission, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Offers Management</h1>
          <p className="mt-2 text-gray-600 dark:text-slate-400">
            Manage all offers across the platform
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.total}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Total Offers</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.active}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Active</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Pending</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-600 dark:text-slate-400">{stats.expired}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Expired</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">${stats.totalRevenue.toLocaleString()}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Total Revenue</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">${stats.totalCommission.toLocaleString()}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Total Commission</div>
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
              placeholder="Search offers..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Types</option>
              {offerTypes.map(type => (
                <option key={type} value={type}>{type.replace('_', ' ').toUpperCase()}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              {offerStatuses.map(status => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Offers Table */}
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-slate-100">All Offers</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Offer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
              {filteredOffers.map((offer) => (
                <tr key={offer.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{offer.title}</div>
                      <div className="text-sm text-gray-500 dark:text-slate-400 truncate max-w-xs">{offer.description}</div>
                      <div className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                        {new Date(offer.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-slate-100">{offer.company}</div>
                    <div className="text-sm text-gray-500 dark:text-slate-400">{offer.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(offer.type)}`}>
                      {offer.type.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(offer.status)}`}>
                      {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-slate-100">${offer.pricing.finalPrice}</div>
                    <div className="text-sm text-gray-500 dark:text-slate-400 line-through">${offer.pricing.originalPrice}</div>
                    <div className="text-xs text-green-600 dark:text-green-400">{offer.pricing.discount}% off</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-slate-100">{offer.views} views</div>
                    <div className="text-sm text-gray-500 dark:text-slate-400">{offer.purchases} purchases</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">${offer.revenue.toFixed(2)} revenue</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(offer)}
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300"
                      >
                        View
                      </button>
                      {offer.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(offer.id, 'active')}
                            className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(offer.id, 'rejected')}
                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {offer.status === 'active' && (
                        <button
                          onClick={() => handleStatusChange(offer.id, 'paused')}
                          className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-900 dark:hover:text-yellow-300"
                        >
                          Pause
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Offer Details Modal */}
      {showDetailsModal && selectedOffer && (
        <div className="fixed inset-0 bg-gray-600 dark:bg-slate-900 dark:bg-opacity-50 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border border-gray-200 dark:border-slate-700 w-11/12 max-w-4xl shadow-lg rounded-md bg-white dark:bg-slate-800">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">Offer Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Title</label>
                    <p className="text-sm text-gray-900 dark:text-slate-100">{selectedOffer.title}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Description</label>
                    <p className="text-sm text-gray-900 dark:text-slate-100">{selectedOffer.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Type</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(selectedOffer.type)}`}>
                        {selectedOffer.type.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOffer.status)}`}>
                        {selectedOffer.status.charAt(0).toUpperCase() + selectedOffer.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Company</label>
                      <p className="text-sm text-gray-900 dark:text-slate-100">{selectedOffer.company}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Category</label>
                      <p className="text-sm text-gray-900 dark:text-slate-100">{selectedOffer.category}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Created</label>
                      <p className="text-sm text-gray-900 dark:text-slate-100">{new Date(selectedOffer.createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Valid Until</label>
                      <p className="text-sm text-gray-900 dark:text-slate-100">{new Date(selectedOffer.validUntil).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-slate-100 mb-3">Pricing</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-slate-400">Original Price:</span>
                        <span className="text-sm text-gray-900 dark:text-slate-100">${selectedOffer.pricing.originalPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-slate-400">Final Price:</span>
                        <span className="text-sm text-gray-900 dark:text-slate-100">${selectedOffer.pricing.finalPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-slate-400">Discount:</span>
                        <span className="text-sm text-green-600 dark:text-green-400">{selectedOffer.pricing.discount}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-slate-100 mb-3">Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-slate-400">Views:</span>
                        <span className="text-sm text-gray-900 dark:text-slate-100">{selectedOffer.views.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-slate-400">Purchases:</span>
                        <span className="text-sm text-gray-900 dark:text-slate-100">{selectedOffer.purchases}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-slate-400">Revenue:</span>
                        <span className="text-sm text-gray-900 dark:text-slate-100">${selectedOffer.revenue.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-slate-400">Commission:</span>
                        <span className="text-sm text-gray-900 dark:text-slate-100">${selectedOffer.commission.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="bg-gray-300 dark:bg-slate-600 text-gray-700 dark:text-slate-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400 dark:hover:bg-slate-500"
                >
                  Close
                </button>
                {selectedOffer.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(selectedOffer.id, 'active')}
                      className="bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 dark:hover:bg-green-800"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedOffer.id, 'rejected')}
                      className="bg-red-600 dark:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 dark:hover:bg-red-800"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offers;