import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/shared/Sidebar';
import Header from '../components/shared/Header';
import BottomNavigation from '../components/shared/BottomNavigation';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-50 dark:bg-slate-900 flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 dark:bg-slate-900 opacity-75"></div>
        </div>
      )}

      {/* Sidebar - Hidden on mobile/tablet */}
      <div className={`hidden lg:block fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 pb-20 lg:pb-6">
          <Outlet />
        </main>
      </div>

      {/* Bottom Navigation - Only visible on mobile/tablet */}
      <BottomNavigation />
    </div>
  );
};

export default DashboardLayout;
