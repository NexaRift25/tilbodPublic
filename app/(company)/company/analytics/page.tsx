"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  ShoppingBag,
  DollarSign,
  Calendar,
  Filter,
  ArrowLeft,
  Download
} from "lucide-react";

interface AnalyticsData {
  period: string;
  views: number;
  purchases: number;
  revenue: number;
  conversionRate: number;
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30");

  // Mock analytics data
  const analyticsData: AnalyticsData[] = [
    { period: "Jan 1-7", views: 245, purchases: 12, revenue: 420000, conversionRate: 4.9 },
    { period: "Jan 8-14", views: 312, purchases: 18, revenue: 630000, conversionRate: 5.8 },
    { period: "Jan 15-21", views: 289, purchases: 15, revenue: 525000, conversionRate: 5.2 },
    { period: "Jan 22-28", views: 356, purchases: 22, revenue: 770000, conversionRate: 6.2 },
    { period: "Jan 29-31", views: 198, purchases: 9, revenue: 315000, conversionRate: 4.5 },
  ];

  const currentMonthStats = {
    totalViews: analyticsData.reduce((sum, item) => sum + item.views, 0),
    totalPurchases: analyticsData.reduce((sum, item) => sum + item.purchases, 0),
    totalRevenue: analyticsData.reduce((sum, item) => sum + item.revenue, 0),
    avgConversionRate: Math.round(analyticsData.reduce((sum, item) => sum + item.conversionRate, 0) / analyticsData.length * 10) / 10,
  };

  const offerPerformance = [
    { name: "Weekend Getaway Package", views: 245, purchases: 12, revenue: 420000, conversionRate: 4.9 },
    { name: "Happy Hour Special", views: 312, purchases: 18, revenue: 18000, conversionRate: 5.8 },
    { name: "Tuesday Restaurant Special", views: 156, purchases: 8, revenue: 16000, conversionRate: 5.1 },
    { name: "Spa & Wellness Gift Card", views: 89, purchases: 15, revenue: 127500, conversionRate: 16.9 },
  ];

  const topPerformingOffers = [...offerPerformance]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/company/dashboard"
            className="p-2 hover:bg-primary/10 rounded-lg transition-all"
          >
            <ArrowLeft className="text-primary" size={20} />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Analytics
            </h1>
            <p className="text-gray-400 text-sm">
              Track your offers&apos; performance and insights
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
          <button className="p-2 hover:bg-primary/10 rounded-lg transition-all">
            <Download className="text-primary" size={20} />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card-background border border-primary rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Views</p>
              <p className="text-white text-2xl font-bold">{currentMonthStats.totalViews.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="text-green-500" size={14} />
                <span className="text-green-500 text-xs">+12%</span>
              </div>
            </div>
            <Eye className="text-primary" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-green-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Purchases</p>
              <p className="text-white text-2xl font-bold">{currentMonthStats.totalPurchases}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="text-green-500" size={14} />
                <span className="text-green-500 text-xs">+18%</span>
              </div>
            </div>
            <ShoppingBag className="text-green-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-blue-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <p className="text-white text-2xl font-bold">{currentMonthStats.totalRevenue.toLocaleString()} kr.</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="text-green-500" size={14} />
                <span className="text-green-500 text-xs">+24%</span>
              </div>
            </div>
            <DollarSign className="text-blue-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-purple-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg Conversion</p>
              <p className="text-white text-2xl font-bold">{currentMonthStats.avgConversionRate}%</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingDown className="text-red-500" size={14} />
                <span className="text-red-500 text-xs">-2%</span>
              </div>
            </div>
            <BarChart3 className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-card-background border border-primary rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Performance Overview</h3>

        <div className="space-y-4">
          {analyticsData.map((data, index) => (
            <div key={data.period} className="flex items-center justify-between p-4 bg-background rounded-lg border border-primary/30">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="font-medium text-white">{data.period}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Views</p>
                    <p className="text-white font-medium">{data.views.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Purchases</p>
                    <p className="text-white font-medium">{data.purchases}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Revenue</p>
                    <p className="text-white font-medium">{data.revenue.toLocaleString()} kr.</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Conversion</p>
                    <p className="text-white font-medium">{data.conversionRate}%</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-white font-bold">{data.revenue.toLocaleString()} kr.</p>
                  <p className="text-gray-400 text-sm">{data.purchases} purchases</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performing Offers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card-background border border-primary rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Top Performing Offers</h3>

          <div className="space-y-4">
            {topPerformingOffers.map((offer, index) => (
              <div key={offer.name} className="flex items-center justify-between p-4 bg-background rounded-lg border border-primary/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{offer.name}</p>
                    <p className="text-sm text-gray-400">{offer.purchases} purchases</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-white font-bold">{offer.revenue.toLocaleString()} kr.</p>
                  <p className="text-gray-400 text-sm">{offer.conversionRate}% conversion</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offer Performance Table */}
        <div className="bg-card-background border border-primary rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Offer Performance Details</h3>

          <div className="space-y-3">
            {offerPerformance.map((offer) => (
              <div key={offer.name} className="flex items-center justify-between py-2 border-b border-primary/20 last:border-b-0">
                <div className="flex-1">
                  <p className="font-medium text-white text-sm">{offer.name}</p>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-gray-400">Views</p>
                    <p className="text-white font-medium">{offer.views}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">Purchases</p>
                    <p className="text-white font-medium">{offer.purchases}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">Revenue</p>
                    <p className="text-white font-medium">{offer.revenue.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">Conversion</p>
                    <p className={`font-medium ${offer.conversionRate > 10 ? 'text-green-500' : 'text-white'}`}>
                      {offer.conversionRate}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-card-background border border-primary rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Key Insights</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-green-500 font-bold mb-1">Strong Performance</h4>
                <p className="text-sm text-gray-300">
                  Your offers are performing well with a {currentMonthStats.avgConversionRate}% conversion rate, above the industry average.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <BarChart3 className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-blue-500 font-bold mb-1">Top Performer</h4>
                <p className="text-sm text-gray-300">
                  {(() => {
                    const giftCardOffer = offerPerformance.find(o => o.name.includes("Gift Card"));
                    return `${giftCardOffer?.name || "Gift Card offer"} has the highest conversion rate at ${giftCardOffer?.conversionRate || 0}%.`;
                  })()}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="text-yellow-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-yellow-500 font-bold mb-1">Peak Days</h4>
                <p className="text-sm text-gray-300">
                  Highest engagement occurs on Tuesdays and Wednesdays. Consider scheduling more offers during these days.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="text-purple-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-purple-500 font-bold mb-1">Customer Behavior</h4>
                <p className="text-sm text-gray-300">
                  Most customers browse in the evening (6-9 PM). Happy Hour offers perform best during this time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

