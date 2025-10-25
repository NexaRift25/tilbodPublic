import React, { useState } from 'react';

// Mock data for users
const mockUsers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1-555-0123',
    role: 'company_user',
    status: 'verified',
    verificationMethod: 'email',
    createdAt: '2024-01-15T10:30:00Z',
    lastLogin: '2024-01-20T14:25:00Z',
    companiesCount: 2,
    offersCount: 12,
    totalSpent: 1250.50,
    isActive: true
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    phone: '+1-555-0124',
    role: 'company_user',
    status: 'verified',
    verificationMethod: 'google',
    createdAt: '2024-01-16T14:20:00Z',
    lastLogin: '2024-01-19T09:15:00Z',
    companiesCount: 1,
    offersCount: 8,
    totalSpent: 890.75,
    isActive: true
  },
  {
    id: '3',
    name: 'David Johnson',
    email: 'david@example.com',
    phone: '+1-555-0125',
    role: 'company_user',
    status: 'pending',
    verificationMethod: 'email',
    createdAt: '2024-01-18T09:15:00Z',
    lastLogin: '2024-01-18T16:45:00Z',
    companiesCount: 0,
    offersCount: 0,
    totalSpent: 0,
    isActive: false
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    phone: '+1-555-0126',
    role: 'end_user',
    status: 'verified',
    verificationMethod: 'email',
    createdAt: '2024-01-17T16:45:00Z',
    lastLogin: '2024-01-20T11:30:00Z',
    companiesCount: 0,
    offersCount: 0,
    totalSpent: 450.00,
    isActive: true
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '+1-555-0127',
    role: 'end_user',
    status: 'verified',
    verificationMethod: 'google',
    createdAt: '2024-01-14T11:00:00Z',
    lastLogin: '2024-01-20T16:20:00Z',
    companiesCount: 0,
    offersCount: 0,
    totalSpent: 1250.00,
    isActive: true
  },
  {
    id: '6',
    name: 'Admin User',
    email: 'admin@tilboo.com',
    phone: '+1-555-0000',
    role: 'admin',
    status: 'verified',
    verificationMethod: 'email',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-20T17:00:00Z',
    companiesCount: 0,
    offersCount: 0,
    totalSpent: 0,
    isActive: true
  }
];

const userRoles = ['admin', 'company_user', 'end_user'];
const userStatuses = ['verified', 'pending', 'suspended'];
// const verificationMethods = ['email', 'google'];

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300';
      case 'company_user': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300';
      case 'end_user': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300';
      default: return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300';
      case 'suspended': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
    }
  };

  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    console.log('Changing user status:', userId, 'to', newStatus);
    // In real app, this would call the API
  };

  // const handleRoleChange = (userId: string, newRole: string) => {
  //   console.log('Changing user role:', userId, 'to', newRole);
  //   // In real app, this would call the API
  // };

  const stats = {
    total: mockUsers.length,
    admins: mockUsers.filter(u => u.role === 'admin').length,
    companyUsers: mockUsers.filter(u => u.role === 'company_user').length,
    endUsers: mockUsers.filter(u => u.role === 'end_user').length,
    verified: mockUsers.filter(u => u.status === 'verified').length,
    pending: mockUsers.filter(u => u.status === 'pending').length,
    active: mockUsers.filter(u => u.isActive).length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Users Management</h1>
          <p className="mt-2 text-gray-600 dark:text-slate-400">
            Manage all platform users and their permissions
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.total}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Total Users</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.admins}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Admins</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.companyUsers}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Company Users</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.endUsers}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">End Users</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.verified}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Verified</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Pending</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.active}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Active</div>
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
              placeholder="Search users..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Role</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Roles</option>
              {userRoles.map(role => (
                <option key={role} value={role}>{role.replace('_', ' ').toUpperCase()}</option>
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
              {userStatuses.map(status => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-slate-100">All Users</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Verification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-slate-600 flex items-center justify-center">
                          <span className="text-gray-600 dark:text-slate-300 font-medium">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{user.name}</div>
                        <div className="text-sm text-gray-500 dark:text-slate-400">{user.email}</div>
                        <div className="text-xs text-gray-400 dark:text-slate-500">{user.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-slate-100">
                    {user.verificationMethod.charAt(0).toUpperCase() + user.verificationMethod.slice(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-400">
                    <div>Last login: {new Date(user.lastLogin).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-400 dark:text-slate-500">
                      Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-slate-100">
                    <div>Companies: {user.companiesCount}</div>
                    <div>Offers: {user.offersCount}</div>
                    <div>Spent: ${user.totalSpent.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(user)}
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300"
                      >
                        View
                      </button>
                      {user.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(user.id, 'verified')}
                          className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                        >
                          Verify
                        </button>
                      )}
                      {user.status === 'verified' && (
                        <button
                          onClick={() => handleStatusChange(user.id, 'suspended')}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        >
                          Suspend
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

      {/* User Details Modal */}
      {showDetailsModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 dark:bg-slate-900 dark:bg-opacity-50 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border border-gray-200 dark:border-slate-700 w-11/12 max-w-2xl shadow-lg rounded-md bg-white dark:bg-slate-800">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">User Details</h3>
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Name</label>
                    <p className="text-sm text-gray-900 dark:text-slate-100">{selectedUser.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Email</label>
                    <p className="text-sm text-gray-900 dark:text-slate-100">{selectedUser.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Phone</label>
                    <p className="text-sm text-gray-900 dark:text-slate-100">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Role</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(selectedUser.role)}`}>
                      {selectedUser.role.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                      {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Verification Method</label>
                    <p className="text-sm text-gray-900 dark:text-slate-100">{selectedUser.verificationMethod.charAt(0).toUpperCase() + selectedUser.verificationMethod.slice(1)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Created</label>
                    <p className="text-sm text-gray-900 dark:text-slate-100">{new Date(selectedUser.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Last Login</label>
                    <p className="text-sm text-gray-900 dark:text-slate-100">{new Date(selectedUser.lastLogin).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-slate-100 mb-3">Activity Stats</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-slate-400">Companies:</span>
                      <span className="text-sm text-gray-900 dark:text-slate-100 ml-2">{selectedUser.companiesCount}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-slate-400">Offers:</span>
                      <span className="text-sm text-gray-900 dark:text-slate-100 ml-2">{selectedUser.offersCount}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-slate-400">Total Spent:</span>
                      <span className="text-sm text-gray-900 dark:text-slate-100 ml-2">${selectedUser.totalSpent.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-slate-400">Active:</span>
                      <span className={`text-sm ml-2 ${selectedUser.isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {selectedUser.isActive ? 'Yes' : 'No'}
                      </span>
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
                {selectedUser.status === 'pending' && (
                  <button
                    onClick={() => handleStatusChange(selectedUser.id, 'verified')}
                    className="bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 dark:hover:bg-green-800"
                  >
                    Verify User
                  </button>
                )}
                {selectedUser.status === 'verified' && (
                  <button
                    onClick={() => handleStatusChange(selectedUser.id, 'suspended')}
                    className="bg-red-600 dark:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 dark:hover:bg-red-800"
                  >
                    Suspend User
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;