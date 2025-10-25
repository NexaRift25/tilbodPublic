import React, { useState } from 'react';

// Mock data for categories
const mockCompanyCategories = [
  { id: '1', name: 'Fashion & Retail', description: 'Clothing, accessories, and fashion items', isActive: true, offersCount: 25, createdAt: '2024-01-01T00:00:00Z' },
  { id: '2', name: 'Restaurant', description: 'Food and dining establishments', isActive: true, offersCount: 18, createdAt: '2024-01-01T00:00:00Z' },
  { id: '3', name: 'Entertainment', description: 'Bars, clubs, and entertainment venues', isActive: true, offersCount: 12, createdAt: '2024-01-01T00:00:00Z' },
  { id: '4', name: 'Wellness', description: 'Spa, fitness, and wellness services', isActive: true, offersCount: 8, createdAt: '2024-01-01T00:00:00Z' },
  { id: '5', name: 'Technology', description: 'Tech gadgets and digital services', isActive: true, offersCount: 15, createdAt: '2024-01-01T00:00:00Z' },
  { id: '6', name: 'Healthcare', description: 'Medical and healthcare services', isActive: false, offersCount: 3, createdAt: '2024-01-01T00:00:00Z' },
  { id: '7', name: 'Education', description: 'Educational services and courses', isActive: true, offersCount: 5, createdAt: '2024-01-01T00:00:00Z' },
  { id: '8', name: 'Automotive', description: 'Car services and automotive products', isActive: true, offersCount: 7, createdAt: '2024-01-01T00:00:00Z' }
];

const mockProductCategories = [
  { id: '1', name: 'Clothing', parentCategory: 'Fashion & Retail', isActive: true, offersCount: 15, createdAt: '2024-01-01T00:00:00Z' },
  { id: '2', name: 'Jewelry', parentCategory: 'Fashion & Retail', isActive: true, offersCount: 8, createdAt: '2024-01-01T00:00:00Z' },
  { id: '3', name: 'Shoes', parentCategory: 'Fashion & Retail', isActive: true, offersCount: 12, createdAt: '2024-01-01T00:00:00Z' },
  { id: '4', name: 'Italian Cuisine', parentCategory: 'Restaurant', isActive: true, offersCount: 6, createdAt: '2024-01-01T00:00:00Z' },
  { id: '5', name: 'Asian Cuisine', parentCategory: 'Restaurant', isActive: true, offersCount: 8, createdAt: '2024-01-01T00:00:00Z' },
  { id: '6', name: 'Fast Food', parentCategory: 'Restaurant', isActive: true, offersCount: 4, createdAt: '2024-01-01T00:00:00Z' },
  { id: '7', name: 'Cocktails', parentCategory: 'Entertainment', isActive: true, offersCount: 5, createdAt: '2024-01-01T00:00:00Z' },
  { id: '8', name: 'Live Music', parentCategory: 'Entertainment', isActive: true, offersCount: 3, createdAt: '2024-01-01T00:00:00Z' },
  { id: '9', name: 'Massage', parentCategory: 'Wellness', isActive: true, offersCount: 4, createdAt: '2024-01-01T00:00:00Z' },
  { id: '10', name: 'Fitness', parentCategory: 'Wellness', isActive: true, offersCount: 4, createdAt: '2024-01-01T00:00:00Z' },
  { id: '11', name: 'Electronics', parentCategory: 'Technology', isActive: true, offersCount: 10, createdAt: '2024-01-01T00:00:00Z' },
  { id: '12', name: 'Software', parentCategory: 'Technology', isActive: true, offersCount: 5, createdAt: '2024-01-01T00:00:00Z' }
];

const Categories: React.FC = () => {
  const [activeTab, setActiveTab] = useState('company');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    parentCategory: '',
    isActive: true
  });

  const currentCategories = activeTab === 'company' ? mockCompanyCategories : mockProductCategories;
  
  const filteredCategories = currentCategories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ('description' in category && category.description?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         ('parentCategory' in category && category.parentCategory?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && category.isActive) ||
                         (statusFilter === 'inactive' && !category.isActive);
    
    return matchesSearch && matchesStatus;
  });

  const handleAddCategory = () => {
    console.log('Adding new category:', newCategory);
    setNewCategory({ name: '', description: '', parentCategory: '', isActive: true });
    setShowAddModal(false);
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description || '',
      parentCategory: category.parentCategory || '',
      isActive: category.isActive
    });
    setShowAddModal(true);
  };

  const handleUpdateCategory = () => {
    console.log('Updating category:', editingCategory.id, newCategory);
    setEditingCategory(null);
    setNewCategory({ name: '', description: '', parentCategory: '', isActive: true });
    setShowAddModal(false);
  };

  const handleToggleStatus = (categoryId: string) => {
    console.log('Toggling category status:', categoryId);
    // In real app, this would call the API
  };

  const handleDeleteCategory = (categoryId: string) => {
    console.log('Deleting category:', categoryId);
    // In real app, this would call the API
  };

  const stats = {
    totalCompany: mockCompanyCategories.length,
    activeCompany: mockCompanyCategories.filter(c => c.isActive).length,
    totalProduct: mockProductCategories.length,
    activeProduct: mockProductCategories.filter(c => c.isActive).length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Categories Management</h1>
          <p className="mt-2 text-gray-600 dark:text-slate-400">
            Manage company and product categories for the platform
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
        >
          Add Category
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.totalCompany}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Company Categories</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.activeCompany}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Active Company</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.totalProduct}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Product Categories</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.activeProduct}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Active Product</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-slate-700">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('company')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'company'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-slate-300 hover:text-gray-700 dark:hover:text-slate-100 hover:border-gray-300 dark:hover:border-slate-600'
              }`}
            >
              Company Categories
            </button>
            <button
              onClick={() => setActiveTab('product')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'product'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-slate-300 hover:text-gray-700 dark:hover:text-slate-100 hover:border-gray-300 dark:hover:border-slate-600'
              }`}
            >
              Product Categories
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Filters */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Search</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search categories..."
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
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              {activeTab === 'product' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Parent Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="all">All Parent Categories</option>
                    {mockCompanyCategories.map(category => (
                      <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Categories Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    Name
                  </th>
                  {activeTab === 'product' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                      Parent Category
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    Offers
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{category.name}</div>
                    </td>
                    {activeTab === 'product' && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-slate-100">
                        {'parentCategory' in category ? category.parentCategory : '-'}
                      </td>
                    )}
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-slate-100 max-w-xs truncate">
                        {'description' in category ? category.description || '-' : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-slate-100">
                      {category.offersCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        category.isActive ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
                      }`}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-400">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleStatus(category.id)}
                          className={category.isActive ? "text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300" : "text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"}
                        >
                          {category.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 dark:bg-slate-900 dark:bg-opacity-50 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border dark:border-slate-700 w-96 shadow-lg rounded-md bg-white dark:bg-slate-800">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCategory(null);
                    setNewCategory({ name: '', description: '', parentCategory: '', isActive: true });
                  }}
                  className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Category name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Description</label>
                  <textarea
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={3}
                    placeholder="Category description"
                  />
                </div>
                
                {activeTab === 'product' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Parent Category</label>
                    <select
                      value={newCategory.parentCategory}
                      onChange={(e) => setNewCategory({ ...newCategory, parentCategory: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select parent category</option>
                      {mockCompanyCategories.map(category => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={newCategory.isActive}
                    onChange={(e) => setNewCategory({ ...newCategory, isActive: e.target.checked })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-slate-600 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900 dark:text-slate-100">
                    Active
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCategory(null);
                    setNewCategory({ name: '', description: '', parentCategory: '', isActive: true });
                  }}
                  className="bg-gray-300 dark:bg-slate-600 text-gray-700 dark:text-slate-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400 dark:hover:bg-slate-500"
                >
                  Cancel
                </button>
                <button
                  onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 dark:hover:bg-primary-800"
                >
                  {editingCategory ? 'Update' : 'Add'} Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;