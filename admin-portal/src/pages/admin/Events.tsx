import React, { useState } from 'react';

// Mock data for seasonal events
const mockEvents = [
  {
    id: '1',
    name: 'Black Friday 2024',
    description: 'Biggest shopping event of the year with massive discounts',
    type: 'seasonal',
    status: 'upcoming',
    startDate: '2024-11-29T00:00:00Z',
    endDate: '2024-11-30T23:59:59Z',
    offersCount: 0,
    expectedOffers: 150,
    revenue: 0,
    expectedRevenue: 50000,
    createdAt: '2024-01-15T10:30:00Z',
    createdBy: 'Admin User'
  },
  {
    id: '2',
    name: 'Christmas Special 2024',
    description: 'Holiday season offers and gift card promotions',
    type: 'seasonal',
    status: 'upcoming',
    startDate: '2024-12-01T00:00:00Z',
    endDate: '2024-12-25T23:59:59Z',
    offersCount: 0,
    expectedOffers: 200,
    revenue: 0,
    expectedRevenue: 75000,
    createdAt: '2024-01-16T14:20:00Z',
    createdBy: 'Admin User'
  },
  {
    id: '3',
    name: 'New Year Celebration 2025',
    description: 'New Year party offers and entertainment deals',
    type: 'seasonal',
    status: 'upcoming',
    startDate: '2024-12-26T00:00:00Z',
    endDate: '2025-01-02T23:59:59Z',
    offersCount: 0,
    expectedOffers: 80,
    revenue: 0,
    expectedRevenue: 25000,
    createdAt: '2024-01-17T09:15:00Z',
    createdBy: 'Admin User'
  },
  {
    id: '4',
    name: 'Summer Sale 2024',
    description: 'Summer fashion and outdoor activity offers',
    type: 'seasonal',
    status: 'active',
    startDate: '2024-06-01T00:00:00Z',
    endDate: '2024-08-31T23:59:59Z',
    offersCount: 45,
    expectedOffers: 100,
    revenue: 12500,
    expectedRevenue: 30000,
    createdAt: '2024-05-15T10:30:00Z',
    createdBy: 'Admin User'
  },
  {
    id: '5',
    name: 'Valentine\'s Day 2024',
    description: 'Romantic offers and couple deals',
    type: 'seasonal',
    status: 'completed',
    startDate: '2024-02-01T00:00:00Z',
    endDate: '2024-02-14T23:59:59Z',
    offersCount: 32,
    expectedOffers: 50,
    revenue: 8750,
    expectedRevenue: 15000,
    createdAt: '2024-01-20T16:45:00Z',
    createdBy: 'Admin User'
  },
  {
    id: '6',
    name: 'Easter Special 2024',
    description: 'Easter themed offers and family deals',
    type: 'seasonal',
    status: 'completed',
    startDate: '2024-03-25T00:00:00Z',
    endDate: '2024-04-01T23:59:59Z',
    offersCount: 28,
    expectedOffers: 40,
    revenue: 6200,
    expectedRevenue: 12000,
    createdAt: '2024-03-01T11:00:00Z',
    createdBy: 'Admin User'
  }
];

const eventTypes = ['seasonal', 'promotional', 'custom'];
const eventStatuses = ['upcoming', 'active', 'completed', 'cancelled'];

const Events: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    type: 'seasonal',
    startDate: '',
    endDate: '',
    expectedOffers: 0,
    expectedRevenue: 0
  });

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesType = typeFilter === 'all' || event.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300';
      case 'active': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300';
      case 'completed': return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
      case 'cancelled': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'seasonal': return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300';
      case 'promotional': return 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300';
      case 'custom': return 'bg-pink-100 dark:bg-pink-900/20 text-pink-800 dark:text-pink-300';
      default: return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
    }
  };

  const handleAddEvent = () => {
    console.log('Adding new event:', newEvent);
    setNewEvent({
      name: '',
      description: '',
      type: 'seasonal',
      startDate: '',
      endDate: '',
      expectedOffers: 0,
      expectedRevenue: 0
    });
    setShowAddModal(false);
  };

  const handleEditEvent = (event: any) => {
    setEditingEvent(event);
    setNewEvent({
      name: event.name,
      description: event.description,
      type: event.type,
      startDate: event.startDate.split('T')[0],
      endDate: event.endDate.split('T')[0],
      expectedOffers: event.expectedOffers,
      expectedRevenue: event.expectedRevenue
    });
    setShowAddModal(true);
  };

  const handleUpdateEvent = () => {
    console.log('Updating event:', editingEvent.id, newEvent);
    setEditingEvent(null);
    setNewEvent({
      name: '',
      description: '',
      type: 'seasonal',
      startDate: '',
      endDate: '',
      expectedOffers: 0,
      expectedRevenue: 0
    });
    setShowAddModal(false);
  };

  const handleStatusChange = (eventId: string, newStatus: string) => {
    console.log('Changing event status:', eventId, 'to', newStatus);
    // In real app, this would call the API
  };

  const handleDeleteEvent = (eventId: string) => {
    console.log('Deleting event:', eventId);
    // In real app, this would call the API
  };

  const stats = {
    total: mockEvents.length,
    upcoming: mockEvents.filter(e => e.status === 'upcoming').length,
    active: mockEvents.filter(e => e.status === 'active').length,
    completed: mockEvents.filter(e => e.status === 'completed').length,
    totalRevenue: mockEvents.reduce((sum, event) => sum + event.revenue, 0),
    expectedRevenue: mockEvents.reduce((sum, event) => sum + event.expectedRevenue, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Seasonal Events</h1>
          <p className="mt-2 text-gray-600 dark:text-slate-400">
            Manage seasonal events and promotional campaigns
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
        >
          Create Event
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.total}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Total Events</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.upcoming}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Upcoming</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.active}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Active</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-600 dark:text-slate-400">{stats.completed}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Completed</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">${stats.totalRevenue.toLocaleString()}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Total Revenue</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">${stats.expectedRevenue.toLocaleString()}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Expected Revenue</div>
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
              placeholder="Search events..."
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
              {eventStatuses.map(status => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Types</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-slate-100">All Events</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Performance
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
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{event.name}</div>
                      <div className="text-sm text-gray-500 dark:text-slate-400 max-w-xs truncate">{event.description}</div>
                      <div className="text-xs text-gray-400 dark:text-slate-500">Created by {event.createdBy}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-slate-100">
                    <div>{new Date(event.startDate).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">to {new Date(event.endDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-slate-100">
                    <div>{event.offersCount} / {event.expectedOffers} offers</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">
                      {event.expectedOffers > 0 ? `${((event.offersCount / event.expectedOffers) * 100).toFixed(1)}%` : '0%'} of target
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-slate-100">
                    <div>${event.revenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">of ${event.expectedRevenue.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300"
                      >
                        Edit
                      </button>
                      {event.status === 'upcoming' && (
                        <button
                          onClick={() => handleStatusChange(event.id, 'active')}
                          className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                        >
                          Start
                        </button>
                      )}
                      {event.status === 'active' && (
                        <button
                          onClick={() => handleStatusChange(event.id, 'completed')}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                        >
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
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

      {/* Add/Edit Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 dark:bg-slate-900 dark:bg-opacity-50 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border dark:border-slate-700 w-11/12 max-w-2xl shadow-lg rounded-md bg-white dark:bg-slate-800">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingEvent(null);
                    setNewEvent({
                      name: '',
                      description: '',
                      type: 'seasonal',
                      startDate: '',
                      endDate: '',
                      expectedOffers: 0,
                      expectedRevenue: 0
                    });
                  }}
                  className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Event Name</label>
                    <input
                      type="text"
                      value={newEvent.name}
                      onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Event name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Type</label>
                    <select
                      value={newEvent.type}
                      onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {eventTypes.map(type => (
                        <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Description</label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={3}
                    placeholder="Event description"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={newEvent.startDate}
                      onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">End Date</label>
                    <input
                      type="date"
                      value={newEvent.endDate}
                      onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Expected Offers</label>
                    <input
                      type="number"
                      value={newEvent.expectedOffers}
                      onChange={(e) => setNewEvent({ ...newEvent, expectedOffers: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Expected Revenue</label>
                    <input
                      type="number"
                      value={newEvent.expectedRevenue}
                      onChange={(e) => setNewEvent({ ...newEvent, expectedRevenue: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingEvent(null);
                    setNewEvent({
                      name: '',
                      description: '',
                      type: 'seasonal',
                      startDate: '',
                      endDate: '',
                      expectedOffers: 0,
                      expectedRevenue: 0
                    });
                  }}
                  className="bg-gray-300 dark:bg-slate-600 text-gray-700 dark:text-slate-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400 dark:hover:bg-slate-500"
                >
                  Cancel
                </button>
                <button
                  onClick={editingEvent ? handleUpdateEvent : handleAddEvent}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 dark:hover:bg-primary-800"
                >
                  {editingEvent ? 'Update' : 'Create'} Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;