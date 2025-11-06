"use client";

import { useState } from "react";
import { Camera, Mail, Phone, MapPin, Lock, Bell, CreditCard, User as UserIcon } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function ProfilePage() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+354 123 4567",
    address: "Laugavegur 26, 101 Reykjavík",
    city: "Reykjavík",
    postalCode: "101",
    country: "Iceland",
  });

  const [notifications, setNotifications] = useState({
    emailOffers: true,
    emailUpdates: false,
    smsNotifications: true,
    pushNotifications: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationChange = (key: string) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications],
    });
  };

  const tabs = [
    { id: "personal", name: t('profile.personalInfo'), icon: UserIcon },
    { id: "security", name: t('profile.security'), icon: Lock },
    { id: "notifications", name: t('profile.notifications'), icon: Bell },
    { id: "payment", name: t('profile.paymentMethods'), icon: CreditCard },
  ];

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="px-4 lg:px-0">
        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-1 lg:mb-2">
          {t('profile.profileSettings')}
        </h1>
        <p className="text-gray-400 text-sm lg:text-base">
          {t('profile.manageAccountSettings')}
        </p>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Tabs Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card-background border h-full  border-primary rounded-2xl p-3 lg:p-2 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all text-left text-sm lg:text-base ${
                    activeTab === tab.id
                      ? "bg-primary text-dark"
                      : "text-gray-300 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-card-background border border-primary rounded-2xl p-4 lg:p-6 xl:p-8">
            {/* Personal Info Tab */}
            {activeTab === "personal" && (
              <div className="space-y-6">
                <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6">
                  {t('profile.personalInformation')}
                </h2>

                {/* Profile Picture */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 pb-4 lg:pb-6 border-b border-primary/30">
                  <div className="relative">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-primary rounded-full flex items-center justify-center text-dark text-2xl lg:text-3xl font-bold">
                      JD
                    </div>
                    <button className="absolute bottom-0 right-0 w-6 h-6 lg:w-8 lg:h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-all">
                      <Camera size={14} className="text-dark" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1 text-sm lg:text-base">
                      {t('profile.profilePicture')}
                    </h3>
                    <p className="text-gray-400 text-xs lg:text-sm sm:text-base mb-2">
                      {t('profile.fileSizeLimit')}
                    </p>
                    <button className="text-primary hover:text-primary/80 text-xs sm:text-sm lg:text-base font-medium">
                      {t('profile.uploadNewPhoto')}
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label className="text-gray-400 text-xs sm:text-sm lg:text-base mb-2 block">
                      {t('auth.firstName')}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 lg:px-4 py-2 lg:py-3 bg-background border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary text-sm lg:text-base"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs sm:text-sm lg:text-base mb-2 block">
                      {t('auth.lastName')}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 lg:px-4 py-2 lg:py-3 bg-background border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary text-sm lg:text-base"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs sm:text-sm lg:text-base mb-2 block">
                      <Mail className="inline mr-2" size={14} />
                      {t('auth.emailAddress')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 lg:px-4 py-2 lg:py-3 bg-background border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary text-sm lg:text-base"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs sm:text-sm lg:text-base mb-2 block">
                      <Phone className="inline mr-2" size={14} />
                      {t('auth.phoneNumber')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 lg:px-4 py-2 lg:py-3 bg-background border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary text-sm lg:text-base"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-gray-400 text-xs sm:text-sm lg:text-base mb-2 block">
                      <MapPin className="inline mr-2" size={14} />
                      {t('profile.address')}
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 lg:px-4 py-2 lg:py-3 bg-background border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary text-sm lg:text-base"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs sm:text-sm lg:text-base mb-2 block">
                      {t('profile.city')}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 lg:px-4 py-2 lg:py-3 bg-background border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary text-sm lg:text-base"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs sm:text-sm lg:text-base mb-2 block">
                      {t('profile.postalCode')}
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-3 lg:px-4 py-2 lg:py-3 bg-background border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary text-sm lg:text-base"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-4">
                  <button className="w-full sm:w-auto px-4 lg:px-6 py-2 lg:py-3 bg-primary text-dark font-semibold rounded-full hover:bg-primary/90 transition-all text-sm lg:text-base">
                    {t('profile.saveChanges')}
                  </button>
                  <button className="w-full sm:w-auto px-4 lg:px-6 py-2 lg:py-3 bg-background border border-primary/30 text-gray-300 font-semibold rounded-full hover:border-primary transition-all text-sm lg:text-base">
                    {t('profile.cancel')}
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6">
                  {t('profile.securitySettings')}
                </h2>

                <div className="space-y-4 lg:space-y-6">
                  <div>
                    <label className="text-gray-400 text-xs sm:text-sm lg:text-base mb-2 block">
                      {t('profile.currentPassword')}
                    </label>
                    <input
                      type="password"
                      placeholder={t('profile.enterCurrentPassword')}
                      className="w-full px-3 lg:px-4 py-2 lg:py-3 bg-background border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm lg:text-base"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs sm:text-sm lg:text-base mb-2 block">
                      {t('profile.newPassword')}
                    </label>
                    <input
                      type="password"
                      placeholder={t('profile.enterNewPassword')}
                      className="w-full px-3 lg:px-4 py-2 lg:py-3 bg-background border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm lg:text-base"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs sm:text-sm lg:text-base mb-2 block">
                      {t('profile.confirmNewPassword')}
                    </label>
                    <input
                      type="password"
                      placeholder={t('profile.confirmNewPasswordPlaceholder')}
                      className="w-full px-3 lg:px-4 py-2 lg:py-3 bg-background border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm lg:text-base"
                    />
                  </div>
                </div>

                <div className="bg-background border border-primary/30 rounded-lg p-3 lg:p-4">
                  <h3 className="text-white font-semibold mb-2 text-sm lg:text-base">
                    {t('profile.passwordRequirementsTitle')}
                  </h3>
                  <ul className="text-gray-400 text-xs sm:text-sm lg:text-base space-y-1">
                    <li>{t('profile.atLeast8Characters')}</li>
                    <li>{t('profile.includeUppercaseLowercase')}</li>
                    <li>{t('profile.includeOneNumber')}</li>
                    <li>{t('profile.includeSpecialChar')}</li>
                  </ul>
                </div>

                <div className="flex gap-4 pt-4">
                  <button className="w-full sm:w-auto px-4 lg:px-6 py-2 lg:py-3 bg-primary text-dark font-semibold rounded-full hover:bg-primary/90 transition-all text-sm lg:text-base">
                    {t('profile.updatePassword')}
                  </button>
                </div>

                <div className="border-t border-primary/30 pt-4 lg:pt-6 mt-6 lg:mt-8">
                  <h3 className="text-white font-semibold mb-3 lg:mb-4 text-sm lg:text-base">
                    {t('profile.twoFactorAuth')}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm lg:text-base mb-3 lg:mb-4">
                    {t('profile.addExtraSecurity')}
                  </p>
                  <button className="w-full sm:w-auto px-4 lg:px-6 py-2 lg:py-3 bg-primary/20 text-primary font-semibold rounded-full hover:bg-primary/30 transition-all text-sm lg:text-base">
                    {t('profile.enable2FA')}
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6">
                  {t('profile.notificationPreferences')}
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      key: "emailOffers",
                      title: t('profile.emailOffers'),
                      description: t('profile.receiveExclusiveDeals'),
                    },
                    {
                      key: "emailUpdates",
                      title: t('profile.emailUpdates'),
                      description: t('profile.getOrderUpdates'),
                    },
                    {
                      key: "smsNotifications",
                      title: t('profile.smsNotifications'),
                      description: t('profile.receiveImportantAlerts'),
                    },
                    {
                      key: "pushNotifications",
                      title: t('profile.pushNotifications'),
                      description: t('profile.getRealTimeUpdates'),
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-3 lg:p-4 bg-background rounded-lg border border-primary/30"
                    >
                      <div className="flex-1 pr-4">
                        <h3 className="text-white font-semibold mb-1 text-sm lg:text-base">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
                          {item.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange(item.key)}
                        className={`relative w-12 h-6 lg:w-14 lg:h-7 rounded-full transition-all flex-shrink-0 ${
                          notifications[item.key as keyof typeof notifications]
                            ? "bg-primary"
                            : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 lg:top-1 left-0.5 lg:left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                            notifications[item.key as keyof typeof notifications]
                              ? "translate-x-6 lg:translate-x-7"
                              : ""
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === "payment" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 lg:mb-6 gap-4">
                  <h2 className="text-xl lg:text-2xl font-bold text-white">
                    {t('profile.paymentMethods')}
                  </h2>
                  <button className="w-full sm:w-auto px-4 py-2 bg-primary text-dark font-semibold rounded-full hover:bg-primary/90 transition-all text-sm">
                    {t('profile.addNew')}
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      type: "Visa",
                      last4: "4242",
                      expiry: "12/25",
                      default: true,
                    },
                    {
                      type: "Mastercard",
                      last4: "8888",
                      expiry: "09/26",
                      default: false,
                    },
                  ].map((card, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 lg:p-6 bg-background rounded-lg border border-primary/30 gap-4"
                    >
                      <div className="flex items-center gap-3 lg:gap-4 flex-1">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                          <CreditCard className="text-primary" size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-sm lg:text-base">
                            {card.type} •••• {card.last4}
                          </h3>
                          <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
                            {t('profile.expires', { date: card.expiry })}
                          </p>
                        </div>
                        {card.default && (
                          <span className="px-2 lg:px-3 py-1 bg-primary/20 text-primary text-xs sm:text-sm lg:text-base font-semibold rounded-full">
                            {t('profile.default')}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none px-3 lg:px-4 py-2 text-primary hover:text-primary/80 font-medium text-xs lg:text-sm">
                          {t('profile.edit')}
                        </button>
                        <button className="flex-1 sm:flex-none px-3 lg:px-4 py-2 text-red-500 hover:text-red-400 font-medium text-xs lg:text-sm">
                          {t('profile.remove')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

