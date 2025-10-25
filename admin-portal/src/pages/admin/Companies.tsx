import React, { useState } from 'react';

// Mock data for companies
const mockCompanies = [
  {
    id: '1',
    name: 'Fashion Forward Ltd',
    email: 'contact@fashionforward.com',
    phone: '+1-555-0123',
    governmentRegistrationNumber: 'REG-2024-001',
    taxIdentityNumber: 'TAX-FF-2024-001',
    category: 'Fashion & Retail',
    status: 'approved',
    registrationDate: '2024-01-15',
    owner: 'John Smith',
    ownerEmail: 'john@fashionforward.com',
    offersCount: 12,
    totalRevenue: 15420.50,
    lastActivity: '2024-01-20'
  },
  {
    id: '2',
    name: 'Mario\'s Pizza',
    email: 'orders@mariospizza.com',
    phone: '+1-555-0124',
    governmentRegistrationNumber: 'REG-2024-002',
    taxIdentityNumber: 'TAX-MP-2024-002',
    category: 'Restaurant',
    status: 'approved',
    registrationDate: '2024-01-16',
    owner: 'Maria Garcia',
    ownerEmail: 'maria@mariospizza.com',
    offersCount: 8,
    totalRevenue: 8920.75,
    lastActivity: '2024-01-19'
  },
  {
    id: '3',
    name: 'The Golden Bar',
    email: 'info@goldenbar.com',
    phone: '+1-555-0125',
    governmentRegistrationNumber: 'REG-2024-003',
    taxIdentityNumber: 'TAX-GB-2024-003',
    category: 'Entertainment',
    status: 'pending',
    registrationDate: '2024-01-18',
    owner: 'David Johnson',
    ownerEmail: 'david@goldenbar.com',
    offersCount: 0,
    totalRevenue: 0,
    lastActivity: '2024-01-18'
  },
  {
    id: '4',
    name: 'Serenity Spa',
    email: 'bookings@serenityspa.com',
    phone: '+1-555-0126',
    governmentRegistrationNumber: 'REG-2024-004',
    taxIdentityNumber: 'TAX-SS-2024-004',
    category: 'Wellness',
    status: 'rejected',
    registrationDate: '2024-01-17',
    owner: 'Sarah Wilson',
    ownerEmail: 'sarah@serenityspa.com',
    offersCount: 0,
    totalRevenue: 0,
    lastActivity: '2024-01-17',
    rejectionReason: 'Incomplete documentation'
  },
  {
    id: '5',
    name: 'Tech Solutions Inc',
    email: 'hello@techsolutions.com',
    phone: '+1-555-0127',
    governmentRegistrationNumber: 'REG-2024-005',
    taxIdentityNumber: 'TAX-TS-2024-005',
    category: 'Technology',
    status: 'approved',
    registrationDate: '2024-01-14',
    owner: 'Michael Brown',
    ownerEmail: 'michael@techsolutions.com',
    offersCount: 5,
    totalRevenue: 3240.00,
    lastActivity: '2024-01-20'
  }
];

const companyCategories = [
  'Fashion & Retail',
  'Restaurant',
  'Entertainment',
  'Wellness',
  'Technology',
  'Healthcare',
  'Education',
  'Automotive',
  'Real Estate',
  'Other'
];

const Companies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || company.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300';
      case 'rejected': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
    }
  };

  const handleViewDetails = (company: any) => {
    setSelectedCompany(company);
    setShowDetailsModal(true);
  };

  const handleApprove = (companyId: string) => {
    console.log('Approving company:', companyId);
    // In real app, this would call the API
  };

  const handleReject = (companyId: string) => {
    console.log('Rejecting company:', companyId);
    // In real app, this would call the API
  };

  const stats = {
    total: mockCompanies.length,
    approved: mockCompanies.filter(c => c.status === 'approved').length,
    pending: mockCompanies.filter(c => c.status === 'pending').length,
    rejected: mockCompanies.filter(c => c.status === 'rejected').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Companies</h1>
          <p className="mt-2 text-gray-600 dark:text-slate-400">
            Manage all registered companies and their verification status
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.total}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Total Companies</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.approved}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Approved</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Pending Review</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.rejected}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Rejected</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search companies..."
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
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
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
              {companyCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-slate-100">Company Directory</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Offers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{company.name}</div>
                      <div className="text-sm text-gray-500 dark:text-slate-400">{company.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900 dark:text-slate-100">{company.owner}</div>
                      <div className="text-sm text-gray-500 dark:text-slate-400">{company.ownerEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-slate-100">
                    {company.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(company.status)}`}>
                      {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-slate-100">
                    {company.offersCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-slate-100">
                    ${company.totalRevenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(company)}
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300"
                      >
                        View
                      </button>
                      {company.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(company.id)}
                            className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(company.id)}
                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Company Details Modal */}
      {showDetailsModal && selectedCompany && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-slate-900 dark:bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border border-gray-200 dark:border-slate-700 w-11/12 max-w-2xl shadow-lg rounded-md bg-white dark:bg-slate-800">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">Company Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <p className="text-sm text-gray-900">{selectedCompany.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedCompany.status)}`}>
                      {selectedCompany.status.charAt(0).toUpperCase() + selectedCompany.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="text-sm text-gray-900">{selectedCompany.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-sm text-gray-900">{selectedCompany.phone}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Government Registration</label>
                    <p className="text-sm text-gray-900">{selectedCompany.governmentRegistrationNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tax ID</label>
                    <p className="text-sm text-gray-900">{selectedCompany.taxIdentityNumber}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <p className="text-sm text-gray-900">{selectedCompany.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Registration Date</label>
                    <p className="text-sm text-gray-900">{selectedCompany.registrationDate}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Owner</label>
                    <p className="text-sm text-gray-900">{selectedCompany.owner}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Owner Email</label>
                    <p className="text-sm text-gray-900">{selectedCompany.ownerEmail}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Offers</label>
                    <p className="text-sm text-gray-900">{selectedCompany.offersCount}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Revenue</label>
                    <p className="text-sm text-gray-900">${selectedCompany.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
                
                {selectedCompany.rejectionReason && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rejection Reason</label>
                    <p className="text-sm text-red-600">{selectedCompany.rejectionReason}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400"
                >
                  Close
                </button>
                {selectedCompany.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(selectedCompany.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(selectedCompany.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
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

export default Companies;
