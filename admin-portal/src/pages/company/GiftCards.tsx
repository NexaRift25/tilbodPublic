import React, { useState } from 'react';
import { Plus, Gift, DollarSign, Users, TrendingUp, Eye, Edit, Download, QrCode } from 'lucide-react';

const GiftCards: React.FC = () => {
  const [selectedGiftCard, setSelectedGiftCard] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data for gift cards
  const giftCards = [
    {
      id: '1',
      title: 'Holiday Gift Card Special',
      company: 'Nordic Retail Co.',
      value: 10000,
      bonusValue: 1500,
      totalValue: 11500,
      status: 'active',
      sold: 156,
      revenue: 1560000,
      remaining: 44,
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      expiryDate: '2024-12-31',
      description: 'Holiday gift card with 15% bonus value. Perfect for gifting outdoor gear and clothing.',
      terms: 'Gift cards valid for 12 months from purchase date. Cannot be combined with other offers.',
      category: 'Retail',
      image: '/api/placeholder/300/200'
    },
    {
      id: '2',
      title: 'Adventure Experience Card',
      company: 'Arctic Adventures',
      value: 50000,
      bonusValue: 5000,
      totalValue: 55000,
      status: 'active',
      sold: 34,
      revenue: 1700000,
      remaining: 16,
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      expiryDate: '2025-03-31',
      description: 'Experience gift card for guided tours and adventure packages with 10% bonus value.',
      terms: 'Valid for all adventure packages. Booking required 48 hours in advance.',
      category: 'Tourism',
      image: '/api/placeholder/300/200'
    },
    {
      id: '3',
      title: 'Tech Services Gift Card',
      company: 'Tech Solutions Ltd.',
      value: 25000,
      bonusValue: 0,
      totalValue: 25000,
      status: 'pending',
      sold: 0,
      revenue: 0,
      remaining: 100,
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      expiryDate: '2025-04-30',
      description: 'Gift card for IT consulting and development services.',
      terms: 'Valid for all tech services. Minimum 3-month engagement required.',
      category: 'Technology',
      image: '/api/placeholder/300/200'
    },
    {
      id: '4',
      title: 'Valentine\'s Day Special',
      company: 'Nordic Retail Co.',
      value: 5000,
      bonusValue: 1000,
      totalValue: 6000,
      status: 'expired',
      sold: 89,
      revenue: 445000,
      remaining: 11,
      startDate: '2024-02-01',
      endDate: '2024-02-14',
      expiryDate: '2025-02-14',
      description: 'Valentine\'s Day gift card with 20% bonus value for romantic gifts.',
      terms: 'Valid for Valentine\'s Day collection. Cannot be combined with other offers.',
      category: 'Retail',
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
      case 'sold_out':
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
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

  const filteredGiftCards = giftCards.filter(card => 
    filterStatus === 'all' || card.status === filterStatus
  );

  const totalSold = giftCards.reduce((sum, card) => sum + card.sold, 0);
  const totalRevenue = giftCards.reduce((sum, card) => sum + card.revenue, 0);
  const activeCards = giftCards.filter(card => card.status === 'active').length;
  // const totalValue = giftCards.reduce((sum, card) => sum + (card.totalValue * card.sold), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Gift Cards</h1>
          <p className="mt-2 text-gray-600 dark:text-slate-400">
            Manage your gift card offers and track sales
          </p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Create Gift Card</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Gift className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Total Cards</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{giftCards.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Active Cards</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{activeCards}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Cards Sold</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{totalSold}</p>
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

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-4">Filter Gift Cards</h3>
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
              <option value="sold_out">Sold Out</option>
            </select>
            <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Gift Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGiftCards.map((card) => (
          <div key={card.id} className="bg-white dark:bg-slate-800 shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center relative">
              <div className="text-center text-white">
                <Gift className="h-16 w-16 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold">{formatCurrency(card.value)}</div>
                {card.bonusValue > 0 && (
                  <div className="text-sm opacity-90">+ {formatCurrency(card.bonusValue)} bonus</div>
                )}
              </div>
              <div className="absolute top-4 right-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(card.status)}`}>
                  {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 line-clamp-2">
                  {card.title}
                </h3>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600 dark:text-slate-400">{card.company}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{card.category}</span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-4 line-clamp-2">
                {card.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-slate-400">Base Value:</span>
                  <span className="text-gray-900 dark:text-slate-100">{formatCurrency(card.value)}</span>
                </div>
                {card.bonusValue > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-slate-400">Bonus Value:</span>
                    <span className="text-green-600 dark:text-green-400">+{formatCurrency(card.bonusValue)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-gray-500 dark:text-slate-400">Total Value:</span>
                  <span className="text-primary-600 dark:text-primary-400">{formatCurrency(card.totalValue)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-slate-400">Valid Until:</span>
                  <span className="text-gray-900 dark:text-slate-100">{new Date(card.endDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-slate-100">{card.sold}</div>
                  <div className="text-xs text-gray-500 dark:text-slate-400">Sold</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-slate-100">{card.remaining}</div>
                  <div className="text-xs text-gray-500 dark:text-slate-400">Remaining</div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedGiftCard(card.id)}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-1"
                >
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </button>
                <button className="px-3 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-md hover:bg-gray-50 dark:hover:bg-slate-700">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="px-3 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-md hover:bg-gray-50 dark:hover:bg-slate-700">
                  <QrCode className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gift Card Details Modal */}
      {selectedGiftCard && (
        <div className="fixed inset-0 bg-gray-600 dark:bg-slate-900 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-slate-800">
            <div className="mt-3">
              {(() => {
                const card = giftCards.find(c => c.id === selectedGiftCard);
                if (!card) return null;
                
                return (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">
                        {card.title}
                      </h3>
                      <button
                        onClick={() => setSelectedGiftCard(null)}
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
                          <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{card.company}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Category</label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{card.category}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Status</label>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(card.status)}`}>
                            {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                          </span>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Base Value</label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{formatCurrency(card.value)}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Bonus Value</label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">
                            {card.bonusValue > 0 ? `+${formatCurrency(card.bonusValue)}` : 'None'}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Total Value</label>
                          <p className="mt-1 text-sm font-bold text-primary-600 dark:text-primary-400">{formatCurrency(card.totalValue)}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Valid Until</label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{new Date(card.endDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Expires</label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{new Date(card.expiryDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Description</label>
                        <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{card.description}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Terms & Conditions</label>
                        <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{card.terms}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{card.sold}</p>
                          <p className="text-sm text-gray-500 dark:text-slate-400">Cards Sold</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{card.remaining}</p>
                          <p className="text-sm text-gray-500 dark:text-slate-400">Remaining</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{formatCurrency(card.revenue)}</p>
                          <p className="text-sm text-gray-500 dark:text-slate-400">Revenue</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                            {card.sold > 0 ? ((card.sold / (card.sold + card.remaining)) * 100).toFixed(1) : 0}%
                          </p>
                          <p className="text-sm text-gray-500 dark:text-slate-400">Sold Out</p>
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

export default GiftCards;