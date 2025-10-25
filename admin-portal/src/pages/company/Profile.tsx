import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Profile</h1>
        <p className="mt-2 text-gray-600 dark:text-slate-400">
          Manage your account profile and settings
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-4">Profile Management</h2>
        <p className="text-gray-600 dark:text-slate-400">Profile management features will be implemented here.</p>
      </div>
    </div>
  );
};

export default Profile;