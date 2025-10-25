import React, { useState } from 'react';

// Mock data for pending approvals
const mockPendingOffers = [
  {
    id: '1',
    title: 'Summer Fashion Sale - 50% Off',
    description: 'Get 50% off on all summer clothing items. Valid for 30 days.',
    type: 'active_offer',
    pricing: { finalPrice: 25.99, originalPrice: 51.98 },
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    company: 'Fashion Forward Ltd',
    category: 'Clothing',
    status: 'pending',
    timeRemaining: 15
  },
  {
    id: '2',
    title: 'Tuesday 2-for-1 Pizza Deal',
    description: 'Buy one pizza, get one free every Tuesday from 5-9 PM.',
    type: 'weekdays_offer',
    pricing: { finalPrice: 12.99, originalPrice: 25.98 },
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 minutes ago
    company: 'Mario\'s Pizza',
    category: 'Restaurant',
    status: 'pending',
    timeRemaining: 5
  },
  {
    id: '3',
    title: 'Happy Hour Cocktails - 30% Off',
    description: 'Enjoy 30% off all cocktails during happy hour 4-7 PM.',
    type: 'happy_hour_offer',
    pricing: { finalPrice: 8.99, originalPrice: 12.99 },
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
    company: 'The Golden Bar',
    category: 'Bar & Restaurant',
    status: 'pending',
    timeRemaining: 20
  },
  {
    id: '4',
    title: 'Luxury Spa Gift Card',
    description: 'Premium spa experience with massage and facial treatment.',
    type: 'gift_card',
    pricing: { finalPrice: 150.00, originalPrice: 200.00 },
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    company: 'Serenity Spa',
    category: 'Wellness',
    status: 'pending',
    timeRemaining: 25
  }
];

const rejectionReasons = [
  'Inappropriate content',
  'Pricing not competitive',
  'Missing required information',
  'Terms and conditions unclear',
  'Image quality poor',
  'Category mismatch',
  'Duplicate offer',
  'Other'
];

const Approvals: React.FC = () => {
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const handleApprove = (offerId: string) => {
    console.log('Approving offer:', offerId);
    // In real app, this would call the API
  };

  const handleReject = (offerId: string) => {
    setSelectedOffer(offerId);
    setShowRejectModal(true);
  };

  const handleRequestRevision = (offerId: string) => {
    console.log('Requesting revision for offer:', offerId);
    // In real app, this would call the API
  };

  const confirmRejection = () => {
    console.log('Rejecting offer:', selectedOffer, 'Reason:', rejectionReason, 'Custom:', customReason);
    setShowRejectModal(false);
    setRejectionReason('');
    setCustomReason('');
  };

  const getTimeRemainingColor = (minutes: number) => {
    if (minutes <= 5) return 'text-red-600 bg-red-100';
    if (minutes <= 15) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Pending Approvals</h1>
          <p className="mt-2 text-gray-600 dark:text-slate-400">
            Review and approve offers within 30 minutes
          </p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-medium">
          {mockPendingOffers.length} Pending
        </div>
      </div>

      {/* SLA Warning */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <div className="flex items-center">
          <span className="text-red-600 dark:text-red-400 mr-2">⚠️</span>
          <p className="text-red-800 dark:text-red-300 font-medium">
            All reviews must be completed within 30 minutes
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{mockPendingOffers.length}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Total Pending</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {mockPendingOffers.filter(offer => offer.timeRemaining <= 5).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Urgent (≤5 min)</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {mockPendingOffers.filter(offer => offer.timeRemaining > 5 && offer.timeRemaining <= 15).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Warning (6-15 min)</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {mockPendingOffers.filter(offer => offer.timeRemaining > 15).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Safe (&gt;15 min)</div>
        </div>
      </div>

      {/* Pending Offers List */}
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-slate-100">Offers Awaiting Approval</h2>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-slate-700">
          {mockPendingOffers.map((offer) => (
            <div key={offer.id} className="p-6 hover:bg-gray-50 dark:hover:bg-slate-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">{offer.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTimeRemainingColor(offer.timeRemaining)}`}>
                      {offer.timeRemaining} min left
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">{offer.description}</p>
                  <div className="flex items-center space-x-4 mt-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300">
                      {offer.type.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-slate-400">
                      ${offer.pricing.finalPrice} (was ${offer.pricing.originalPrice})
                    </span>
                    <span className="text-sm text-gray-500 dark:text-slate-400">
                      {offer.company}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-slate-400">
                      {offer.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-slate-400">
                      {new Date(offer.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button 
                    onClick={() => handleApprove(offer.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleReject(offer.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => handleRequestRevision(offer.id)}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-700 transition-colors"
                  >
                    Request Revision
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Reject Offer</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for rejection
                </label>
                <select
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select a reason</option>
                  {rejectionReasons.map((reason) => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>
              {rejectionReason === 'Other' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom reason
                  </label>
                  <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={3}
                    placeholder="Please specify the reason..."
                  />
                </div>
              )}
              <div className="flex space-x-3">
                <button
                  onClick={confirmRejection}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Confirm Rejection
                </button>
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Approvals;
