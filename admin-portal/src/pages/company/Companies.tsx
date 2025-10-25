import React, { useState } from 'react';
import { Plus, Building2, TrendingUp, Users, DollarSign, Eye, Edit, Trash2 } from 'lucide-react';

const Companies: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  // Mock data for companies
  const companies = [
    {
      id: '1',
      name: 'Nordic Retail Co.',
      industry: 'Retail',
      status: 'active',
      registrationDate: '2024-01-15',
      totalOffers: 24,
      activeOffers: 18,
      totalRevenue: 125000,
      monthlyRevenue: 15000,
      employees: 45,
      location: 'Reykjavik, Iceland',
      description: 'Leading retail company specializing in outdoor gear and clothing.',
      website: 'https://nordicretail.is',
      contactEmail: 'info@nordicretail.is',
      phone: '+354 123 4567'
    },
    {
      id: '2',
      name: 'Arctic Adventures',
      industry: 'Tourism',
      status: 'active',
      registrationDate: '2024-02-20',
      totalOffers: 12,
      activeOffers: 8,
      totalRevenue: 85000,
      monthlyRevenue: 12000,
      employees: 28,
      location: 'Akureyri, Iceland',
      description: 'Premium adventure tourism company offering guided tours and experiences.',
      website: 'https://arcticadventures.is',
      contactEmail: 'bookings@arcticadventures.is',
      phone: '+354 987 6543'
    },
    {
      id: '3',
      name: 'Tech Solutions Ltd.',
      industry: 'Technology',
      status: 'pending',
      registrationDate: '2024-03-10',
      totalOffers: 6,
      activeOffers: 0,
      totalRevenue: 0,
      monthlyRevenue: 0,
      employees: 12,
      location: 'Kópavogur, Iceland',
      description: 'Software development and IT consulting services.',
      website: 'https://techsolutions.is',
      contactEmail: 'hello@techsolutions.is',
      phone: '+354 555 1234'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300';
      case 'suspended':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">My Companies</h1>
          <p className="mt-2 text-gray-600 dark:text-slate-400">
            Manage your registered companies and their performance
          </p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Company</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Total Companies</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{companies.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Active Companies</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                {companies.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                {companies.reduce((sum, c) => sum + c.employees, 0)}
              </p>
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
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                {formatCurrency(companies.reduce((sum, c) => sum + c.totalRevenue, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">Company Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Offers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-lg bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-slate-100">
                          {company.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-slate-400">
                          {company.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-slate-100">{company.industry}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(company.status)}`}>
                      {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-slate-100">
                      {company.activeOffers}/{company.totalOffers}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">active/total</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-slate-100">
                      {formatCurrency(company.monthlyRevenue)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">this month</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedCompany(company.id)}
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Company Details Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-gray-600 dark:bg-slate-900 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-slate-800">
            <div className="mt-3">
              {(() => {
                const company = companies.find(c => c.id === selectedCompany);
                if (!company) return null;
                
                return (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">
                        {company.name}
                      </h3>
                      <button
                        onClick={() => setSelectedCompany(null)}
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
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Industry</label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{company.industry}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Status</label>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(company.status)}`}>
                            {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                          </span>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Location</label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{company.location}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Employees</label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{company.employees}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Website</label>
                          <a href={company.website} className="mt-1 text-sm text-primary-600 dark:text-primary-400 hover:underline">
                            {company.website}
                          </a>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Contact Email</label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{company.contactEmail}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Description</label>
                        <p className="mt-1 text-sm text-gray-900 dark:text-slate-100">{company.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{company.totalOffers}</p>
                          <p className="text-sm text-gray-500 dark:text-slate-400">Total Offers</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{company.activeOffers}</p>
                          <p className="text-sm text-gray-500 dark:text-slate-400">Active Offers</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                            {formatCurrency(company.totalRevenue)}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-slate-400">Total Revenue</p>
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

export default Companies;