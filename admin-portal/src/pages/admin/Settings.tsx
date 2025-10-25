import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    platformName: 'Tilbod',
    platformDescription: 'The ultimate marketplace for offers and gift cards',
    supportEmail: 'support@tilboo.com',
    adminEmail: 'admin@tilboo.com',
    timezone: 'UTC',
    currency: 'USD',
    language: 'en',
    
    // Commission Settings
    activeOfferCommission: 5.0,
    weekdaysOfferCommission: 4.0,
    happyHourOfferCommission: 10.0,
    giftCardCommission: 5.0,
    seasonalOfferCommission: 6.0,
    
    // Approval Settings
    autoApprovalEnabled: false,
    approvalTimeLimit: 30, // minutes
    maxRevisionAttempts: 3,
    requireAdminApproval: true,
    
    // Payment Settings
    paymentWindow: 2, // hours
    autoDeactivationEnabled: true,
    paymentMethods: ['credit_card', 'paypal', 'stripe'],
    invoiceGenerationEnabled: true,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    notificationFrequency: 'immediate',
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30, // minutes
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireEmailVerification: true,
    
    // API Settings
    apiRateLimit: 1000, // requests per hour
    webhookUrl: '',
    apiKey: 'sk_live_...',
    sandboxMode: false
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedSettings, setEditedSettings] = useState(settings);

  const handleSave = () => {
    setSettings(editedSettings);
    setIsEditing(false);
    console.log('Settings saved:', editedSettings);
  };

  const handleCancel = () => {
    setEditedSettings(settings);
    setIsEditing(false);
  };

  const handleChange = (key: string, value: any) => {
    setEditedSettings({ ...editedSettings, [key]: value });
  };

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'commissions', name: 'Commissions', icon: '💳' },
    { id: 'approvals', name: 'Approvals', icon: '✅' },
    { id: 'payments', name: 'Payments', icon: '💰' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'api', name: 'API', icon: '🔌' }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Platform Name</label>
          <input
            type="text"
            value={editedSettings.platformName}
            onChange={(e) => handleChange('platformName', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Currency</label>
          <select
            value={editedSettings.currency}
            onChange={(e) => handleChange('currency', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="ISK">ISK</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Platform Description</label>
        <textarea
          value={editedSettings.platformDescription}
          onChange={(e) => handleChange('platformDescription', e.target.value)}
          disabled={!isEditing}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Support Email</label>
          <input
            type="email"
            value={editedSettings.supportEmail}
            onChange={(e) => handleChange('supportEmail', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Admin Email</label>
          <input
            type="email"
            value={editedSettings.adminEmail}
            onChange={(e) => handleChange('adminEmail', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Timezone</label>
          <select
            value={editedSettings.timezone}
            onChange={(e) => handleChange('timezone', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="Europe/London">London</option>
            <option value="Europe/Paris">Paris</option>
            <option value="Asia/Tokyo">Tokyo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Language</label>
          <select
            value={editedSettings.language}
            onChange={(e) => handleChange('language', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
          >
            <option value="en">English</option>
            <option value="is">Icelandic</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderCommissionSettings = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-yellow-400 dark:text-yellow-300">⚠️</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Commission Rate Changes</h3>
            <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
              Changes to commission rates will affect all new offers. Existing offers will maintain their current rates.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Active Offer Commission (%)</label>
          <input
            type="number"
            step="0.1"
            value={editedSettings.activeOfferCommission}
            onChange={(e) => handleChange('activeOfferCommission', parseFloat(e.target.value))}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Weekdays Offer Commission (%)</label>
          <input
            type="number"
            step="0.1"
            value={editedSettings.weekdaysOfferCommission}
            onChange={(e) => handleChange('weekdaysOfferCommission', parseFloat(e.target.value))}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Happy Hour Offer Commission (%)</label>
          <input
            type="number"
            step="0.1"
            value={editedSettings.happyHourOfferCommission}
            onChange={(e) => handleChange('happyHourOfferCommission', parseFloat(e.target.value))}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Gift Card Commission (%)</label>
          <input
            type="number"
            step="0.1"
            value={editedSettings.giftCardCommission}
            onChange={(e) => handleChange('giftCardCommission', parseFloat(e.target.value))}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Seasonal Offer Commission (%)</label>
          <input
            type="number"
            step="0.1"
            value={editedSettings.seasonalOfferCommission}
            onChange={(e) => handleChange('seasonalOfferCommission', parseFloat(e.target.value))}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
        </div>
      </div>
    </div>
  );

  const renderApprovalSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Approval Time Limit (minutes)</label>
          <input
            type="number"
            value={editedSettings.approvalTimeLimit}
            onChange={(e) => handleChange('approvalTimeLimit', parseInt(e.target.value))}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Max Revision Attempts</label>
          <input
            type="number"
            value={editedSettings.maxRevisionAttempts}
            onChange={(e) => handleChange('maxRevisionAttempts', parseInt(e.target.value))}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="autoApprovalEnabled"
            checked={editedSettings.autoApprovalEnabled}
            onChange={(e) => handleChange('autoApprovalEnabled', e.target.checked)}
            disabled={!isEditing}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-slate-600 rounded disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
          <label htmlFor="autoApprovalEnabled" className="ml-2 block text-sm text-gray-900 dark:text-slate-100">
            Enable Auto-Approval
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="requireAdminApproval"
            checked={editedSettings.requireAdminApproval}
            onChange={(e) => handleChange('requireAdminApproval', e.target.checked)}
            disabled={!isEditing}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-slate-600 rounded disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
          <label htmlFor="requireAdminApproval" className="ml-2 block text-sm text-gray-900 dark:text-slate-100">
            Require Admin Approval for All Offers
          </label>
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Payment Window (hours)</label>
          <input
            type="number"
            value={editedSettings.paymentWindow}
            onChange={(e) => handleChange('paymentWindow', parseInt(e.target.value))}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            value={editedSettings.sessionTimeout}
            onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="autoDeactivationEnabled"
            checked={editedSettings.autoDeactivationEnabled}
            onChange={(e) => handleChange('autoDeactivationEnabled', e.target.checked)}
            disabled={!isEditing}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-slate-600 rounded disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
          <label htmlFor="autoDeactivationEnabled" className="ml-2 block text-sm text-gray-900 dark:text-slate-100">
            Auto-deactivate offers after payment window expires
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="invoiceGenerationEnabled"
            checked={editedSettings.invoiceGenerationEnabled}
            onChange={(e) => handleChange('invoiceGenerationEnabled', e.target.checked)}
            disabled={!isEditing}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-slate-600 rounded disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
          <label htmlFor="invoiceGenerationEnabled" className="ml-2 block text-sm text-gray-900 dark:text-slate-100">
            Enable automatic invoice generation
          </label>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Payment Methods</label>
        <div className="space-y-2">
          {['credit_card', 'paypal', 'stripe', 'apple_pay', 'google_pay'].map(method => (
            <div key={method} className="flex items-center">
              <input
                type="checkbox"
                id={method}
                checked={editedSettings.paymentMethods.includes(method)}
                onChange={(e) => {
                  const methods = e.target.checked
                    ? [...editedSettings.paymentMethods, method]
                    : editedSettings.paymentMethods.filter(m => m !== method);
                  handleChange('paymentMethods', methods);
                }}
                disabled={!isEditing}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-slate-600 rounded disabled:bg-gray-100 dark:disabled:bg-slate-600"
              />
              <label htmlFor={method} className="ml-2 block text-sm text-gray-900 dark:text-slate-100 capitalize">
                {method.replace('_', ' ')}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="emailNotifications"
            checked={editedSettings.emailNotifications}
            onChange={(e) => handleChange('emailNotifications', e.target.checked)}
            disabled={!isEditing}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-slate-600 rounded disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
          <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900 dark:text-slate-100">
            Email Notifications
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="smsNotifications"
            checked={editedSettings.smsNotifications}
            onChange={(e) => handleChange('smsNotifications', e.target.checked)}
            disabled={!isEditing}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-slate-600 rounded disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
          <label htmlFor="smsNotifications" className="ml-2 block text-sm text-gray-900 dark:text-slate-100">
            SMS Notifications
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="pushNotifications"
            checked={editedSettings.pushNotifications}
            onChange={(e) => handleChange('pushNotifications', e.target.checked)}
            disabled={!isEditing}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-slate-600 rounded disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
          <label htmlFor="pushNotifications" className="ml-2 block text-sm text-gray-900 dark:text-slate-100">
            Push Notifications
          </label>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Notification Frequency</label>
        <select
          value={editedSettings.notificationFrequency}
          onChange={(e) => handleChange('notificationFrequency', e.target.value)}
          disabled={!isEditing}
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
        >
          <option value="immediate">Immediate</option>
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Max Login Attempts</label>
          <input
            type="number"
            value={editedSettings.maxLoginAttempts}
            onChange={(e) => handleChange('maxLoginAttempts', parseInt(e.target.value))}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Password Min Length</label>
          <input
            type="number"
            value={editedSettings.passwordMinLength}
            onChange={(e) => handleChange('passwordMinLength', parseInt(e.target.value))}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="twoFactorAuth"
            checked={editedSettings.twoFactorAuth}
            onChange={(e) => handleChange('twoFactorAuth', e.target.checked)}
            disabled={!isEditing}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-slate-600 rounded disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
          <label htmlFor="twoFactorAuth" className="ml-2 block text-sm text-gray-900 dark:text-slate-100">
            Enable Two-Factor Authentication
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="requireEmailVerification"
            checked={editedSettings.requireEmailVerification}
            onChange={(e) => handleChange('requireEmailVerification', e.target.checked)}
            disabled={!isEditing}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-slate-600 rounded disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
          <label htmlFor="requireEmailVerification" className="ml-2 block text-sm text-gray-900 dark:text-slate-100">
            Require Email Verification for New Users
          </label>
        </div>
      </div>
    </div>
  );

  const renderApiSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">API Rate Limit (requests/hour)</label>
          <input
            type="number"
            value={editedSettings.apiRateLimit}
            onChange={(e) => handleChange('apiRateLimit', parseInt(e.target.value))}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">API Key</label>
          <input
            type="password"
            value={editedSettings.apiKey}
            onChange={(e) => handleChange('apiKey', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Webhook URL</label>
        <input
          type="url"
          value={editedSettings.webhookUrl}
          onChange={(e) => handleChange('webhookUrl', e.target.value)}
          disabled={!isEditing}
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
          placeholder="https://your-domain.com/webhook"
        />
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="sandboxMode"
          checked={editedSettings.sandboxMode}
          onChange={(e) => handleChange('sandboxMode', e.target.checked)}
          disabled={!isEditing}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-slate-600 rounded disabled:bg-gray-100 dark:disabled:bg-slate-600"
        />
        <label htmlFor="sandboxMode" className="ml-2 block text-sm text-gray-900 dark:text-slate-100">
          Enable Sandbox Mode
        </label>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'commissions': return renderCommissionSettings();
      case 'approvals': return renderApprovalSettings();
      case 'payments': return renderPaymentSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
      case 'api': return renderApiSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Platform Settings</h1>
          <p className="mt-2 text-gray-600 dark:text-slate-400">
            Configure platform-wide settings and preferences
          </p>
        </div>
        <div className="flex space-x-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
            >
              Edit Settings
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="bg-gray-300 dark:bg-slate-600 text-gray-700 dark:text-slate-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400 dark:hover:bg-slate-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 dark:hover:bg-green-800"
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-slate-700">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 dark:text-slate-300 hover:text-gray-700 dark:hover:text-slate-100 hover:border-gray-300 dark:hover:border-slate-600'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;