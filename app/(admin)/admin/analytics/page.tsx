"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  Tag,
  DollarSign,
  Calendar,
  Filter,
  ArrowLeft,
  Download,
  Eye,
  ShoppingBag,
  Activity,
  PieChart,
  LineChart
} from "lucide-react";

interface AnalyticsData {
  period: string;
  users: number;
  companies: number;
  offers: number;
  revenue: number;
  views: number;
  purchases: number;
}

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30");

  // Mock analytics data
  const analyticsData: AnalyticsData[] = [
    { period: "Jan 1-7", users: 45, companies: 12, offers: 89, revenue: 245000, views: 12500, purchases: 156 },
    { period: "Jan 8-14", users: 52, companies: 15, offers: 95, revenue: 312000, views: 14800, purchases: 189 },
    { period: "Jan 15-21", users: 48, companies: 13, offers: 87, revenue: 289000, views: 13200, purchases: 167 },
    { period: "Jan 22-28", users: 61, companies: 18, offers: 112, revenue: 387000, views: 16900, purchases: 223 },
    { period: "Jan 29-31", users: 29, companies: 8, offers: 45, revenue: 156000, views: 7800, purchases: 89 },
  ];

  const currentStats = {
    totalUsers: analyticsData.reduce((sum, item) => sum + item.users, 0),
    totalCompanies: analyticsData.reduce((sum, item) => sum + item.companies, 0),
    totalOffers: analyticsData.reduce((sum, item) => sum + item.offers, 0),
    totalRevenue: analyticsData.reduce((sum, item) => sum + item.revenue, 0),
    totalViews: analyticsData.reduce((sum, item) => sum + item.views, 0),
    totalPurchases: analyticsData.reduce((sum, item) => sum + item.purchases, 0),
    avgConversionRate: Math.round(analyticsData.reduce((sum, item) => sum + (item.purchases / item.views * 100), 0) / analyticsData.length * 10) / 10,
  };

  const offerTypeDistribution = [
    { type: "Active Offers", count: 142, percentage: 42, color: "bg-blue-500" },
    { type: "Weekdays Offers", count: 87, percentage: 26, color: "bg-green-500" },
    { type: "Happy Hour", count: 56, percentage: 17, color: "bg-purple-500" },
    { type: "Gift Cards", count: 57, percentage: 15, color: "bg-orange-500" },
  ];

  const companyCategoryStats = [
    { category: "Hotels & Accommodation", companies: 45, offers: 89, revenue: 1250000 },
    { category: "Food & Dining", companies: 38, offers: 76, revenue: 890000 },
    { category: "Wellness & Spa", companies: 32, offers: 64, revenue: 675000 },
    { category: "Activities", companies: 28, offers: 56, revenue: 445000 },
    { category: "Shopping & Retail", companies: 22, offers: 44, revenue: 312000 },
  ];

  const topPerformingCompanies = [
    { name: "Hotel Aurora", offers: 12, revenue: 245000, growth: 18 },
    { name: "Nordic Spa & Wellness", offers: 8, revenue: 189000, growth: 25 },
    { name: "Blue Lagoon Spa", offers: 15, revenue: 156000, growth: -5 },
    { name: "Reykjavik Bar & Lounge", offers: 6, revenue: 98000, growth: 12 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/dashboard"
            className="p-2 hover:bg-red-500/10 rounded-lg transition-all"
          >
            <ArrowLeft className="text-red-500" size={20} />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Platform Analytics
            </h1>
            <p className="text-gray-400 text-sm">
              Comprehensive platform performance and insights
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-background border border-primary/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-primary"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <button className="p-2 hover:bg-red-500/10 rounded-lg transition-all">
            <Download className="text-red-500" size={20} />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-card-background border border-primary rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-white text-2xl font-bold">{currentStats.totalUsers}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="text-green-500" size={14} />
                <span className="text-green-500 text-xs">+15%</span>
              </div>
            </div>
            <Users className="text-primary" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-blue-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Companies</p>
              <p className="text-white text-2xl font-bold">{currentStats.totalCompanies}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="text-green-500" size={14} />
                <span className="text-green-500 text-xs">+22%</span>
              </div>
            </div>
            <Building2 className="text-blue-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-purple-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Offers</p>
              <p className="text-white text-2xl font-bold">{currentStats.totalOffers}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="text-green-500" size={14} />
                <span className="text-green-500 text-xs">+26%</span>
              </div>
            </div>
            <Tag className="text-purple-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-green-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <p className="text-white text-2xl font-bold">{currentStats.totalRevenue.toLocaleString()} kr.</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="text-green-500" size={14} />
                <span className="text-green-500 text-xs">+28%</span>
              </div>
            </div>
            <DollarSign className="text-green-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-orange-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Views</p>
              <p className="text-white text-2xl font-bold">{currentStats.totalViews.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="text-green-500" size={14} />
                <span className="text-green-500 text-xs">+21%</span>
              </div>
            </div>
            <Eye className="text-orange-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-red-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Purchases</p>
              <p className="text-white text-2xl font-bold">{currentStats.totalPurchases}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="text-green-500" size={14} />
                <span className="text-green-500 text-xs">+24%</span>
              </div>
            </div>
            <ShoppingBag className="text-red-500" size={24} />
          </div>
        </div>
      </div>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card-background border border-primary rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Revenue Trends</h3>

          <div className="space-y-4">
            {analyticsData.map((data, index) => (
              <div key={data.period} className="flex items-center justify-between p-4 bg-background rounded-lg border border-primary/30">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="font-medium text-white">{data.period}</span>
                </div>

                <div className="text-right">
                  <p className="text-white font-bold">{data.revenue.toLocaleString()} kr.</p>
                  <p className="text-gray-400 text-sm">{data.purchases} purchases</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card-background border border-primary rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Offer Type Distribution</h3>

          <div className="space-y-4">
            {offerTypeDistribution.map((item) => (
              <div key={item.type} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 ${item.color} rounded-full`} />
                  <span className="text-white font-medium">{item.type}</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-white font-bold">{item.count}</p>
                    <p className="text-gray-400 text-sm">{item.percentage}%</p>
                  </div>
                  <div className="w-20 bg-background rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Companies */}
      <div className="bg-card-background border border-primary rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Top Performing Companies</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-primary/30">
                <th className="pb-3">Company</th>
                <th className="pb-3">Offers</th>
                <th className="pb-3">Revenue</th>
                <th className="pb-3">Growth</th>
                <th className="pb-3">Performance</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {topPerformingCompanies.map((company, index) => (
                <tr key={company.name} className="border-b border-primary/10 hover:bg-primary/5">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">#{index + 1}</span>
                      </div>
                      <span className="font-medium">{company.name}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <p className="font-medium">{company.offers}</p>
                  </td>
                  <td className="py-4">
                    <p className="font-bold">{company.revenue.toLocaleString()} kr.</p>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1">
                      {company.growth >= 0 ? (
                        <TrendingUp className="text-green-500" size={16} />
                      ) : (
                        <TrendingDown className="text-red-500" size={16} />
                      )}
                      <span className={`font-medium ${company.growth >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {company.growth >= 0 ? "+" : ""}{company.growth}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="w-16 bg-background rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${company.revenue > 200000 ? "bg-green-500" : company.revenue > 150000 ? "bg-yellow-500" : "bg-red-500"}`}
                        style={{ width: `${Math.min((company.revenue / 300000) * 100, 100)}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-card-background border border-primary rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Category Performance</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companyCategoryStats.map((category) => (
            <div key={category.category} className="bg-background border border-primary/30 rounded-lg p-4 hover:border-primary transition-all">
              <h4 className="font-bold text-white mb-3">{category.category}</h4>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Companies</span>
                  <span className="text-white font-medium">{category.companies}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Offers</span>
                  <span className="text-white font-medium">{category.offers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Revenue</span>
                  <span className="text-white font-medium">{category.revenue.toLocaleString()} kr.</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card-background border border-primary rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Platform Health</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-primary/30">
              <div className="flex items-center gap-3">
                <Activity className="text-green-500" size={20} />
                <span className="text-white">Platform Uptime</span>
              </div>
              <span className="text-green-500 font-bold">99.9%</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-primary/30">
              <div className="flex items-center gap-3">
                <Users className="text-blue-500" size={20} />
                <span className="text-white">User Engagement</span>
              </div>
              <span className="text-blue-500 font-bold">High</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-primary/30">
              <div className="flex items-center gap-3">
                <BarChart3 className="text-purple-500" size={20} />
                <span className="text-white">Conversion Rate</span>
              </div>
              <span className="text-purple-500 font-bold">{currentStats.avgConversionRate}%</span>
            </div>
          </div>
        </div>

        <div className="bg-card-background border border-primary rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Key Insights</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-green-500 font-bold mb-1">Revenue Growth</h4>
                <p className="text-sm text-gray-300">
                  Platform revenue increased by 28% compared to last month, driven by increased offer creation and user engagement.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-blue-500 font-bold mb-1">Company Activity</h4>
                <p className="text-sm text-gray-300">
                  Hotels & Accommodation category leads with 45 companies and 1.25M kr. in revenue this month.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Tag className="text-purple-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-purple-500 font-bold mb-1">Offer Performance</h4>
                <p className="text-sm text-gray-300">
                  Active Offers represent 42% of total offers and generate the highest engagement with {currentStats.avgConversionRate}% conversion rate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

