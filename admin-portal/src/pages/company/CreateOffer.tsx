import React, { useState } from 'react';
import { ChevronDown, Info, Edit, Calendar, Upload, RefreshCw, ArrowRight } from 'lucide-react';

interface OfferFormData {
  offerType: string;
  title: string;
  type: 'discount' | 'offer';
  discountType: 'percentage' | 'fixed';
  discountValue: string;
  description: string;
  companies: string;
  customers: string;
  validFrom: string;
  validTo: string;
  price: string;
}

const CreateOffer: React.FC = () => {
  const [formData, setFormData] = useState<OfferFormData>({
    offerType: 'active_offer',
    title: '',
    type: 'discount',
    discountType: 'percentage',
    discountValue: '',
    description: '',
    companies: '',
    customers: '',
    validFrom: '',
    validTo: '',
    price: '36,000 kr.'
  });

  const [showOfferTypeDropdown, setShowOfferTypeDropdown] = useState(false);
  // const [showMobilePreview, setShowMobilePreview] = useState(false);

  const offerTypes = [
    { value: 'active_offer', label: 'Active offers' },
    { value: 'weekdays_offer', label: 'Weekdays offers' },
    { value: 'happy_hour_offer', label: 'Happy hour offers' },
    { value: 'gift_card', label: 'Gift cards' },
    { value: 'seasonal_offer', label: 'Seasonal offers' }
  ];

  const handleInputChange = (field: keyof OfferFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateDaysLeft = () => {
    if (!formData.validTo) return 'X';
    const today = new Date();
    const endDate = new Date(formData.validTo);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Left Side - Form */}
        <div className="flex-1 bg-white dark:bg-slate-800 p-4 sm:p-6 lg:p-6 xl:p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-6 lg:space-y-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Create a new offer
            </h1>

            <form className="space-y-4 sm:space-y-6">
              {/* Select type of offer */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Select type of offer
                  </label>
                  <Info className="h-4 w-4 text-slate-400" />
                </div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowOfferTypeDropdown(!showOfferTypeDropdown)}
                    className="w-full flex items-center justify-between px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 touch-manipulation"
                  >
                    <span className="text-left">{offerTypes.find(type => type.value === formData.offerType)?.label}</span>
                    <ChevronDown className="h-5 w-5 flex-shrink-0" />
                  </button>
                  {showOfferTypeDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl shadow-lg">
                      {offerTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => {
                            handleInputChange('offerType', type.value);
                            setShowOfferTypeDropdown(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-600 first:rounded-t-xl last:rounded-b-xl touch-manipulation"
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  )}
            </div>
          </div>

              {/* Offer title */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Offer title
                  </label>
                  <Info className="h-4 w-4 text-slate-400" />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="What are you going to put on offer?"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 pr-10 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Edit className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
          </div>

              {/* Type of offer */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Type of offer
                  </label>
                  <Info className="h-4 w-4 text-slate-400" />
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    onClick={() => handleInputChange('type', 'discount')}
                    className={`px-4 sm:px-6 py-3 rounded-xl font-medium transition-colors touch-manipulation ${
                      formData.type === 'discount'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Discount
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('type', 'offer')}
                    className={`px-4 sm:px-6 py-3 rounded-xl font-medium transition-colors touch-manipulation ${
                      formData.type === 'offer'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Offer
              </button>
            </div>
          </div>

              {/* Amount of discount */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Amount of discount
                  </label>
                  <Info className="h-4 w-4 text-slate-400" />
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <button
                    type="button"
                    onClick={() => handleInputChange('discountType', 'percentage')}
                    className={`flex items-center justify-center px-3 sm:px-4 py-3 rounded-xl font-medium transition-colors touch-manipulation ${
                      formData.discountType === 'percentage'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="mr-2">%</span>
                    <span className="hidden sm:inline">Discount</span>
                    <span className="sm:hidden">%</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('discountType', 'fixed')}
                    className={`flex items-center justify-center px-3 sm:px-4 py-3 rounded-xl font-medium transition-colors touch-manipulation ${
                      formData.discountType === 'fixed'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="mr-2">$</span>
                    <span className="hidden sm:inline">Fixed amount</span>
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Enter discount value"
                  value={formData.discountValue}
                  onChange={(e) => handleInputChange('discountValue', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Text in offer box */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Text in offer box
                  </label>
                  <Info className="h-4 w-4 text-slate-400" />
                </div>
                <textarea
                  placeholder="Further explanation of the offer"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Companies */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Companies for which the discount is available
                  </label>
                  <Info className="h-4 w-4 text-slate-400" />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Company"
                    value={formData.companies}
                    onChange={(e) => handleInputChange('companies', e.target.value)}
                    className="w-full px-4 py-3 pr-10 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Customers */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Discounts for customers only
                  </label>
                  <Info className="h-4 w-4 text-slate-400" />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Company customers"
                    value={formData.customers}
                    onChange={(e) => handleInputChange('customers', e.target.value)}
                    className="w-full px-4 py-3 pr-10 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Valid from/to */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Discount valid from time to time
                  </label>
                  <Info className="h-4 w-4 text-slate-400" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">From</label>
                    <input
                      type="date"
                      value={formData.validFrom}
                      onChange={(e) => handleInputChange('validFrom', e.target.value)}
                      className="w-full px-4 py-3 pr-10 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">To</label>
                    <input
                      type="date"
                      value={formData.validTo}
                      onChange={(e) => handleInputChange('validTo', e.target.value)}
                      className="w-full px-4 py-3 pr-10 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Upload photo */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Upload a photo for a quote
                  </label>
                  <Info className="h-4 w-4 text-slate-400" />
                </div>
                <button
                  type="button"
                  className="w-full px-4 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <Upload className="h-5 w-5 mx-auto mb-2" />
                  Upload a photo
              </button>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Price
                  </label>
                  <Info className="h-4 w-4 text-slate-400" />
                </div>
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {formData.price}
            </div>
          </div>

              {/* Confirm button */}
              <button
                type="submit"
                className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-4 px-6 rounded-xl font-semibold hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors flex items-center justify-center touch-manipulation"
              >
                Confirm offer and pay
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="flex-1 bg-slate-100 dark:bg-slate-900 p-4 sm:p-6 lg:p-6 xl:p-8 overflow-y-auto">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                Your offer
              </h2>
              <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            {/* Offer Preview Card */}
            <div className="bg-slate-200 dark:bg-slate-700 rounded-2xl overflow-hidden shadow-lg">
              {/* Image placeholder */}
              <div className="h-24 sm:h-28 md:h-32 lg:h-32 bg-slate-300 dark:bg-slate-600 flex items-center justify-center">
                <span className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                  {formData.type === 'discount' ? 'Discount/offer' : 'Offer'}
                </span>
              </div>

              {/* Days left badge */}
              <div className="px-3 sm:px-4 py-2 text-center">
                <span className="inline-block bg-slate-400 dark:bg-slate-600 text-white text-xs font-medium px-2 sm:px-3 py-1 rounded-full">
                  {calculateDaysLeft()} days left
                </span>
          </div>

              {/* Offer content */}
              <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                  {formData.companies || 'A company waiting for a discount'}
                </p>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                  {formData.title || 'Offer title'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                  {formData.description || 'Explanatory text'}
                </p>
                <button className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-2 px-3 sm:px-4 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors flex items-center justify-center text-xs sm:text-sm">
                  View offer
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOffer;