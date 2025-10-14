"use client";

import { ShoppingBag, CreditCard, Heart, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      name: "Total Orders",
      value: "24",
      icon: ShoppingBag,
      change: "+12%",
      changeType: "positive",
    },
    {
      name: "Total Spent",
      value: "142,500 kr.",
      icon: CreditCard,
      change: "+8%",
      changeType: "positive",
    },
    {
      name: "Saved Offers",
      value: "18",
      icon: Heart,
      change: "+3",
      changeType: "positive",
    },
    {
      name: "Active Deals",
      value: "6",
      icon: TrendingUp,
      change: "+2",
      changeType: "positive",
    },
  ];

  const recentOrders = [
    {
      id: 1,
      name: "Romantic Getaway Package",
      date: "2025-10-10",
      amount: "36,890 kr.",
      status: "Completed",
    },
    {
      id: 2,
      name: "Blue Lagoon Spa Experience",
      date: "2025-10-08",
      amount: "25,500 kr.",
      status: "Completed",
    },
    {
      id: 3,
      name: "Gourmet Dining Experience",
      date: "2025-10-05",
      amount: "18,900 kr.",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
          Welcome back, John! 👋
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Here&apos;s what&apos;s happening with your account today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-card-background border border-primary rounded-2xl p-4 sm:p-6 hover:border-primary/80 transition-all"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="text-primary" size={20} />
                </div>
                <span
                  className={`text-xs sm:text-sm font-semibold ${
                    stat.changeType === "positive"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-400 text-xs sm:text-sm mb-1">{stat.name}</h3>
              <p className="text-white text-xl sm:text-2xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-card-background border border-primary rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-white">Recent Orders</h2>
          <button className="text-primary hover:text-primary/80 font-medium text-xs sm:text-sm">
            View All
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-background rounded-lg border border-primary/30 hover:border-primary transition-all gap-3 sm:gap-0"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold mb-1 text-sm sm:text-base truncate">{order.name}</h3>
                <p className="text-gray-400 text-xs sm:text-sm">{order.date}</p>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                <div className="sm:text-right sm:mr-6">
                  <p className="text-white font-bold text-sm sm:text-base">{order.amount}</p>
                </div>
                <div>
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      order.status === "Completed"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary rounded-2xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            Discover New Deals
          </h3>
          <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
            Check out the latest offers and save big on your favorites!
          </p>
          <button className="px-4 sm:px-6 py-2 bg-primary text-dark font-semibold rounded-full hover:bg-primary/90 transition-all text-sm sm:text-base">
            Browse Offers
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500 rounded-2xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            Refer & Earn
          </h3>
          <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
            Invite friends and get rewards for every successful referral!
          </p>
          <button className="px-4 sm:px-6 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all text-sm sm:text-base">
            Invite Friends
          </button>
        </div>
      </div>
    </div>
  );
}

