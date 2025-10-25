import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to Admin Portal
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Choose your dashboard to get started
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            to="/admin"
            className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-6xl mb-4">🏠</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600">
              Admin Dashboard
            </h2>
            <p className="text-gray-600">
              Manage users, companies, and system-wide operations with comprehensive admin tools.
            </p>
            <div className="mt-4 text-primary-600 font-medium group-hover:text-primary-700">
              Access Admin Dashboard →
            </div>
          </Link>
          
          <Link
            to="/company"
            className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-6xl mb-4">🏢</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600">
              Company Dashboard
            </h2>
            <p className="text-gray-600">
              Manage your company operations, team members, and projects in one place.
            </p>
            <div className="mt-4 text-primary-600 font-medium group-hover:text-primary-700">
              Access Company Dashboard →
            </div>
          </Link>
        </div>
        
        <div className="mt-12 text-sm text-gray-500">
          Built with React, TypeScript, Tailwind CSS, and Vite
        </div>
      </div>
    </div>
  );
};

export default Home;
