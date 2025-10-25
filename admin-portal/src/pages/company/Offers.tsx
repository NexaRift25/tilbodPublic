import React, { useState } from 'react';
import { Plus, Filter, Search, Eye, Edit, Trash2, DollarSign, Users, TrendingUp, CheckCircle } from 'lucide-react';

const Offers: React.FC = () => {
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for offers
  const offers = [
    {
      id: '1',
      title: 'Winter Gear Sale',
      company: 'Nordic Retail Co.',
      type: 'discount',
      status: 'active',
      discount: 30,
      originalPrice: 50000,
      discountedPrice: 35000,
      category: 'Outdoor Gear',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      views: 1250,
      purchases: 89,
      revenue: 3115000,
      description: 'Up to 30% off on all winter outdoor gear including jackets, boots, and accessories.',
      terms: 'Valid until February 15th. Cannot be combined with other offers.',
      image: '/api/placeholder/300/200'
    },
    {
      id: '2',
      title: 'Adventure Package Deal',
      company: 'Arctic Adventures',
      type: 'package',
      status: 'active',
      discount: 25,
      originalPrice: 150000,
      discountedPrice: 112500,
      category: 'Tourism',
      startDate: '2024-01-20',
      endDate: '2024-03-20',
      views: 890,
      purchases: 34,
      revenue: 3825000,
      description: 'Complete adventure package including guided tours, equipment, and accommodation.',
      terms: 'Package includes 3-day tour with all equipment provided. Booking required 48 hours in advance.',
      image: '/api/placeholder/300/200'
    },
    {
      id: '3',
      title: 'Tech Services Bundle',
      company: 'Tech Solutions Ltd.',
      type: 'service',
      status: 'pending',
      discount: 20,
      originalPrice: 200000,
      discountedPrice: 160000,
      category: 'Technology',
      startDate: '2024-02-01',
      endDate: '2024-04-01',
      views: 0,
      purchases: 0,
      revenue: 0,
      description: 'Complete IT consulting and development services package.',
      terms: 'Minimum 3-month engagement required. Custom solutions available.',
      image: '/api/placeholder/300/200'
    },
    {
      id: '4',
      title: 'Gift Card Special',
      company: 'Nordic Retail Co.',
      type: 'gift_card',
      status: 'expired',
      discount: 15,
      originalPrice: 10000,
      discountedPrice: 8500,
      category: 'Gift Cards',
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      views: 2100,
      purchases: 156,
      revenue: 1326000,
      description: 'Holiday gift card promotion with bonus value.',
      terms: 'Gift cards valid for 12 months from purchase date.',
      image: '/api/placeholder/300/200'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300';
      case 'expired':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300';
      case 'draft':
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'discount':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300';
      case 'package':
        return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300';
      case 'service':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300';
      case 'gift_card':
        return 'bg-pink-100 dark:bg-pink-900/20 text-pink-800 dark:text-pink-300';
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

  const filteredOffers = offers.filter(offer => {
    const matchesStatus = filterStatus === 'all' || offer.status === filterStatus;
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = offers.reduce((sum, offer) => sum + offer.revenue, 0);
  const totalViews = offers.reduce((sum, offer) => sum + offer.views, 0);
  // const totalPurchases = offers.reduce((sum, offer) => sum + offer.purchases, 0);
  const activeOffers = offers.filter(offer => offer.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">My Offers</h1>
          <p className="mt-2 text-gray-600 dark:text-slate-400">
            Manage your offers and track their performance
          </p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Create Offer</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Total Offers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{offers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Active Offers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{activeOffers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Total Views</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{totalViews.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search offers..."
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
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
              <option value="draft">Draft</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-md hover:bg-gray-50 dark:hover:bg-slate-600 flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => (
          <div key={offer.id} className="bg-white dark:bg-slate-800 shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-4xl font-bold">{offer.discount}%</div>
                <div className="text-sm opacity-90">OFF</div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 line-clamp-2">
                  {offer.title}
                </h3>
                <div className="flex space-x-1 ml-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(offer.status)}`}>
                    {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600 dark:text-slate-400">{offer.company}</span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(offer.type)}`}>
                  {offer.type.replace('_', ' ').charAt(0).toUpperCase() + offer.type.replace('_', ' ').slice(1)}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-4 line-clamp-2">
                {offer.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-slate-400">Original Price:</span>
                  <span className="text-gray-900 dark:text-slate-100 line-through">{formatCurrency(offer.originalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-gray-500 dark:text-slate-400">Discounted Price:</span>
                  <span className="text-primary-600 dark:text-primary-400">{formatCurrency(offer.discountedPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-slate-400">Valid Until:</span>
                  <span className="text-gray-900 dark:text-slate-100">{new Date(offer.endDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-slate-100">{offer.views.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 dark:text-slate-400">Views</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-slate-100">{offer.purchases}</div>
                  <div className="text-xs text-gray-500 dark:text-slate-400">Purchases</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-slate-100">{formatCurrency(offer.revenue)}</div>
                  <div className="text-xs text-gray-500 dark:text-slate-400">Revenue</div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedOffer(offer.id)}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-1"
                >
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </button>
                <button className="px-3 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-md hover:bg-gray-50 dark:hover:bg-slate-700">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="px-3 py-2 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-300 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Offer Details Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 bg-gray-600 dark:bg-slate-900 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-slate-800">
            <div className="mt-3">
              {(() => {
                const offer = offers.find(o => o.id === selectedOffer);
                if (!offer) return null;
                
                return (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">
                        {offer.title}
                      </h3>
                      <button
                        onClick={() => setSelectedOffer(null)}
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
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Company</label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{offer.company}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Category</label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{offer.category}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Type</label>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(offer.type)}`}>
                            {offer.type.replace('_', ' ').charAt(0).toUpperCase() + offer.type.replace('_', ' ').slice(1)}
                          </span>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Status</label>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(offer.status)}`}>
                            {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                          </span>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Start Date</label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{new Date(offer.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">End Date</label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{new Date(offer.endDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Description</label>
                        <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{offer.description}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Terms & Conditions</label>
                        <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{offer.terms}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{offer.views.toLocaleString()}</p>
                          <p className="text-sm text-gray-500 dark:text-slate-400">Total Views</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{offer.purchases}</p>
                          <p className="text-sm text-gray-500 dark:text-slate-400">Purchases</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{formatCurrency(offer.revenue)}</p>
                          <p className="text-sm text-gray-500 dark:text-slate-400">Revenue</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                            {offer.views > 0 ? ((offer.purchases / offer.views) * 100).toFixed(1) : 0}%
                          </p>
                          <p className="text-sm text-gray-500 dark:text-slate-400">Conversion</p>
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

export default Offers;