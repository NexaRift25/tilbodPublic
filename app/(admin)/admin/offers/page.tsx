"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Tag,
  Eye,
  Edit,
  MoreVertical,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Filter,
  Search,
  Users,
  Building2,
  ExternalLink
} from "lucide-react";
import Pagination from "@/components/ui/Pagination";

interface Offer {
  id: string;
  title: string;
  type: "active" | "weekdays" | "happy_hour" | "gift_card";
  companyName: string;
  category: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  status: "active" | "pending" | "approved" | "expired" | "rejected";
  startDate: string;
  endDate: string;
  createdAt: string;
  views: number;
  purchases: number;
  revenue: number;
  extensionCount: number;
}

export default function AdminOffersPage() {
  const [offers] = useState<Offer[]>([
    {
      id: "1",
      title: "Weekend Getaway Package",
      type: "active",
      companyName: "Hotel Aurora",
      category: "Hotels & Accommodation",
      originalPrice: 50000,
      discountPrice: 35000,
      discountPercentage: 30,
      status: "active",
      startDate: "2025-01-01",
      endDate: "2025-01-31",
      createdAt: "2024-12-15",
      views: 245,
      purchases: 12,
      revenue: 420000,
      extensionCount: 1,
    },
    {
      id: "2",
      title: "Happy Hour Special",
      type: "happy_hour",
      companyName: "Reykjavik Bar & Lounge",
      category: "Food & Dining",
      originalPrice: 1500,
      discountPrice: 1000,
      discountPercentage: 33,
      status: "pending",
      startDate: "2025-01-15",
      endDate: "2025-02-15",
      createdAt: "2024-12-20",
      views: 0,
      purchases: 0,
      revenue: 0,
      extensionCount: 0,
    },
    {
      id: "3",
      title: "Tuesday Restaurant Special",
      type: "weekdays",
      companyName: "Nordic Spa & Wellness",
      category: "Food & Dining",
      originalPrice: 2500,
      discountPrice: 2000,
      discountPercentage: 20,
      status: "approved",
      startDate: "2025-01-10",
      endDate: "2025-03-10",
      createdAt: "2024-12-18",
      views: 156,
      purchases: 8,
      revenue: 16000,
      extensionCount: 0,
    },
    {
      id: "4",
      title: "Spa & Wellness Gift Card",
      type: "gift_card",
      companyName: "Blue Lagoon Spa",
      category: "Wellness & Spa",
      originalPrice: 10000,
      discountPrice: 8500,
      discountPercentage: 15,
      status: "expired",
      startDate: "2024-11-01",
      endDate: "2024-12-31",
      createdAt: "2024-10-25",
      views: 89,
      purchases: 15,
      revenue: 127500,
      extensionCount: 2,
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || offer.status === statusFilter;
    const matchesType = typeFilter === "all" || offer.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = filteredOffers.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="text-green-500" size={20} />;
      case "approved":
        return <CheckCircle className="text-blue-500" size={20} />;
      case "pending":
        return <Clock className="text-yellow-500" size={20} />;
      case "expired":
        return <XCircle className="text-gray-500" size={20} />;
      case "rejected":
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Clock className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500";
      case "approved":
        return "bg-blue-500/10 text-blue-500";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "expired":
        return "bg-gray-500/10 text-gray-500";
      case "rejected":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-400";
    }
  };

  const getStatusTextClass = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-500";
      case "approved":
        return "text-blue-500";
      case "pending":
        return "text-yellow-500";
      case "expired":
        return "text-gray-500";
      case "rejected":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "active":
        return <Tag className="text-blue-500" size={16} />;
      case "weekdays":
        return <Calendar className="text-green-500" size={16} />;
      case "happy_hour":
        return <Clock className="text-purple-500" size={16} />;
      case "gift_card":
        return <DollarSign className="text-orange-500" size={16} />;
      default:
        return <Tag className="text-gray-500" size={16} />;
    }
  };

  const stats = {
    total: offers.length,
    active: offers.filter(o => o.status === "active").length,
    pending: offers.filter(o => o.status === "pending").length,
    totalViews: offers.reduce((sum, o) => sum + o.views, 0),
    totalPurchases: offers.reduce((sum, o) => sum + o.purchases, 0),
    totalRevenue: offers.reduce((sum, o) => sum + o.revenue, 0),
  };

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
              Offers Management
            </h1>
            <p className="text-gray-400 text-sm">
              Monitor and manage all platform offers
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-card-background border border-primary rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Offers</p>
              <p className="text-white text-2xl font-bold">{stats.total}</p>
            </div>
            <Tag className="text-primary" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-green-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active</p>
              <p className="text-white text-2xl font-bold">{stats.active}</p>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-yellow-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending</p>
              <p className="text-white text-2xl font-bold">{stats.pending}</p>
            </div>
            <Clock className="text-yellow-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-blue-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Views</p>
              <p className="text-white text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
            </div>
            <Eye className="text-blue-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-purple-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Purchases</p>
              <p className="text-white text-2xl font-bold">{stats.totalPurchases}</p>
            </div>
            <Users className="text-purple-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-orange-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Revenue</p>
              <p className="text-white text-2xl font-bold">{stats.totalRevenue.toLocaleString()} kr.</p>
            </div>
            <DollarSign className="text-orange-500" size={24} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card-background border border-primary rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search offers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-background border border-primary/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="expired">Expired</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-background border border-primary/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-primary"
            >
              <option value="all">All Types</option>
              <option value="active">Active Offer</option>
              <option value="weekdays">Weekdays Offer</option>
              <option value="happy_hour">Happy Hour</option>
              <option value="gift_card">Gift Card</option>
            </select>
          </div>
        </div>
      </div>

      {/* Offers List */}
      <div className="space-y-4">
        {filteredOffers.length === 0 ? (
          <div className="bg-card-background border border-primary rounded-2xl p-8 text-center">
            <Tag className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">No offers found</h3>
            <p className="text-gray-400">
              {searchTerm || statusFilter !== "all" || typeFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No offers have been created yet"
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="pb-3 text-left text-sm font-medium text-gray-400 px-2">Offer</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-400 px-2">Type</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-400 px-2">Status</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-400 px-2">Price</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-400 px-2">Duration</th>
                  <th className="pb-3 text-center text-sm font-medium text-gray-400 px-2">Views</th>
                  <th className="pb-3 text-center text-sm font-medium text-gray-400 px-2">Purchases</th>
                  <th className="pb-3 text-center text-sm font-medium text-gray-400 px-2">Revenue</th>
                  <th className="pb-3 text-center text-sm font-medium text-gray-400 px-2">Actions</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {currentPageItems.map((offer) => (
                  <tr key={offer.id} className="border-b border-primary/10 hover:bg-primary/5">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(offer.type)}
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-white truncate">{offer.title}</div>
                          <div className="text-sm text-gray-400 truncate">{offer.companyName}</div>
                          <div className="text-xs text-gray-500 truncate">{offer.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        offer.type === "active" ? "bg-blue-500/10 text-blue-500" :
                        offer.type === "weekdays" ? "bg-green-500/10 text-green-500" :
                        offer.type === "happy_hour" ? "bg-purple-500/10 text-purple-500" :
                        "bg-orange-500/10 text-orange-500"
                      }`}>
                        {offer.type.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {getStatusIcon(offer.status)}
                        <span className={`text-sm font-medium truncate ${getStatusTextClass(offer.status)}`}>
                          {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="min-w-0">
                        <div className="font-bold text-white text-sm">{offer.discountPrice.toLocaleString()} kr.</div>
                        <div className="text-xs text-gray-400 line-through">{offer.originalPrice.toLocaleString()} kr.</div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="min-w-0">
                        <div className="font-medium text-white text-sm">{offer.startDate}</div>
                        <div className="text-xs text-gray-400">to {offer.endDate}</div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center text-sm">{offer.views}</td>
                    <td className="py-4 px-2 text-center text-sm">{offer.purchases}</td>
                    <td className="py-4 px-2 text-center text-sm">{offer.revenue.toLocaleString()} kr.</td>
                    <td className="py-4 px-2">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded transition-all">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded transition-all">
                          <Edit size={14} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded transition-all">
                          <MoreVertical size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredOffers.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredOffers.length)} of {filteredOffers.length} offers
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Platform Insights */}
      <div className="bg-card-background border border-primary rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Platform Insights</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-green-500 font-bold mb-1">Offer Performance</h4>
                <p className="text-sm text-gray-300">
                  Gift cards have the highest conversion rate at {offers.filter(o => o.type === "gift_card").reduce((sum, o) => sum + o.purchases, 0) > 0 ? "16.9%" : "0%"} across {offers.filter(o => o.type === "gift_card").length} active offers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-blue-500 font-bold mb-1">Top Companies</h4>
                <p className="text-sm text-gray-300">
                  {(() => {
                    const companyStats = offers.reduce((acc, offer) => {
                      acc[offer.companyName] = (acc[offer.companyName] || 0) + offer.revenue;
                      return acc;
                    }, {} as Record<string, number>);
                    const topCompany = Object.entries(companyStats).sort(([,a], [,b]) => b - a)[0];
                    return topCompany ? `${topCompany[0]} leads with ${topCompany[1].toLocaleString()} kr. in revenue.` : "No data available.";
                  })()}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Tag className="text-purple-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-purple-500 font-bold mb-1">Offer Types Distribution</h4>
                <p className="text-sm text-gray-300">
                  {(() => {
                    const typeCounts = offers.reduce((acc, offer) => {
                      acc[offer.type] = (acc[offer.type] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>);
                    return Object.entries(typeCounts).map(([type, count]) =>
                      `${count} ${type.replace("_", " ")} offers`
                    ).join(", ");
                  })()}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="text-orange-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-orange-500 font-bold mb-1">Customer Engagement</h4>
                <p className="text-sm text-gray-300">
                  Total platform engagement: {stats.totalViews.toLocaleString()} views, {stats.totalPurchases} purchases, {Math.round(stats.totalRevenue / Math.max(stats.totalPurchases, 1)).toLocaleString()} kr. average order value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

