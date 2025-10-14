"use client";

import { Building2, Tag, Users, DollarSign, Clock, AlertTriangle, TrendingUp, CheckCircle } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    {
      name: "Pending Approvals",
      value: "8",
      icon: Clock,
      change: "Review in 30 min",
      changeType: "warning",
      urgent: true,
    },
    {
      name: "Total Companies",
      value: "156",
      icon: Building2,
      change: "+12 this month",
      changeType: "positive",
    },
    {
      name: "Active Offers",
      value: "342",
      icon: Tag,
      change: "+28 this week",
      changeType: "positive",
    },
    {
      name: "Platform Revenue",
      value: "1.2M kr.",
      icon: DollarSign,
      change: "+15%",
      changeType: "positive",
    },
  ];

  const approvalQueue = [
    {
      id: 1,
      type: "Company",
      name: "Nordic Spa & Wellness",
      company: "Nordic Group",
      submittedAt: "5 minutes ago",
      timeRemaining: "25 min",
      priority: "high",
    },
    {
      id: 2,
      type: "Offer",
      name: "Christmas Special - 50% Off",
      company: "Hotel Aurora",
      submittedAt: "12 minutes ago",
      timeRemaining: "18 min",
      priority: "high",
    },
    {
      id: 3,
      type: "Company",
      name: "Reykjavik Bar & Lounge",
      company: "Nightlife Co.",
      submittedAt: "20 minutes ago",
      timeRemaining: "10 min",
      priority: "urgent",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Approved",
      type: "Company",
      name: "Blue Lagoon Spa",
      time: "2 hours ago",
      admin: "Admin",
    },
    {
      id: 2,
      action: "Rejected",
      type: "Offer",
      name: "Invalid Pricing Deal",
      time: "3 hours ago",
      admin: "Admin",
    },
    {
      id: 3,
      action: "Revision Requested",
      type: "Company",
      name: "Mountain Resort",
      time: "5 hours ago",
      admin: "Admin",
    },
  ];

  const platformMetrics = [
    { label: "Active Offer Commission", value: "$1/day", count: "142 offers", color: "primary" },
    { label: "Weekdays Commission", value: "$4/week", count: "87 offers", color: "blue" },
    { label: "Happy Hour Commission", value: "$10/month", count: "56 offers", color: "purple" },
    { label: "Gift Card Commission", value: "% of sale", count: "57 cards", color: "green" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
          Admin Dashboard 🛡️
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Monitor platform activity and manage approvals
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className={`bg-card-background border ${
                stat.urgent ? "border-red-500" : "border-primary"
              } rounded-2xl p-4 sm:p-6 hover:border-opacity-80 transition-all ${
                stat.urgent ? "animate-pulse" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${
                  stat.urgent ? "bg-red-500/10" : "bg-primary/10"
                } rounded-lg flex items-center justify-center`}>
                  <Icon className={stat.urgent ? "text-red-500" : "text-primary"} size={20} />
                </div>
                <span
                  className={`text-xs sm:text-sm font-semibold ${
                    stat.changeType === "positive"
                      ? "text-green-500"
                      : stat.changeType === "warning"
                      ? "text-yellow-500"
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

      {/* Urgent: Approval Queue (30-minute SLA) */}
      <div className="bg-card-background border border-red-500 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-500" size={24} />
            <h2 className="text-lg sm:text-xl font-bold text-white">Approval Queue</h2>
            <span className="bg-red-500/10 text-red-500 px-2 py-1 rounded-full text-xs font-semibold">
              30 min SLA
            </span>
          </div>
          <a href="/admin/approvals" className="text-red-500 hover:text-red-400 font-medium text-xs sm:text-sm">
            Review All
          </a>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {approvalQueue.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-background rounded-lg border ${
                item.priority === "urgent" ? "border-red-500" : "border-primary/30"
              } hover:border-primary transition-all gap-3 sm:gap-0`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-primary text-xs font-semibold">{item.type}</span>
                  {item.priority === "urgent" && (
                    <span className="bg-red-500/10 text-red-500 px-2 py-0.5 rounded text-xs flex items-center gap-1">
                      <AlertTriangle size={12} />
                      Urgent
                    </span>
                  )}
                </div>
                <h3 className="text-white font-semibold mb-1 text-sm sm:text-base truncate">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  {item.company} • Submitted {item.submittedAt}
                </p>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4">
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                  item.priority === "urgent"
                    ? "bg-red-500/10 text-red-500"
                    : "bg-yellow-500/10 text-yellow-500"
                }`}>
                  {item.timeRemaining} left
                </span>
                <a
                  href={`/admin/approvals/${item.id}`}
                  className="px-3 sm:px-4 py-1.5 bg-primary text-dark font-semibold rounded-lg hover:bg-primary/90 transition-all text-xs sm:text-sm"
                >
                  Review
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {platformMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-card-background border border-primary rounded-2xl p-4 sm:p-6"
          >
            <h3 className="text-gray-400 text-xs sm:text-sm mb-2">{metric.label}</h3>
            <p className="text-white text-xl sm:text-2xl font-bold mb-1">{metric.value}</p>
            <p className="text-primary text-xs sm:text-sm">{metric.count}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-card-background border border-primary rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-white">Recent Activity</h2>
          <a href="/admin/activity" className="text-primary hover:text-primary/80 font-medium text-xs sm:text-sm">
            View All
          </a>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 sm:p-4 bg-background rounded-lg border border-primary/30 hover:border-primary transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.action === "Approved"
                    ? "bg-green-500"
                    : activity.action === "Rejected"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-sm sm:text-base ${
                      activity.action === "Approved"
                        ? "text-green-500"
                        : activity.action === "Rejected"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}>
                      {activity.action}
                    </span>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-primary text-xs">{activity.type}</span>
                  </div>
                  <p className="text-white text-sm sm:text-base">{activity.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

