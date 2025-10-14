"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Plus,
  Edit,
  Trash2,
  Eye,
  ArrowLeft,
  Clock,
  Users,
  Tag,
  Settings,
  Snowflake,
  Sun,
  Leaf,
  Gift,
  Star,
  Heart,
  Sparkles
} from "lucide-react";

interface Event {
  id: string;
  name: string;
  type: "seasonal" | "holiday" | "custom";
  icon: string;
  startDate: string;
  endDate: string;
  status: "active" | "upcoming" | "ended";
  description: string;
  discountRange: string;
  affectedOffers: number;
  expectedRevenue: number;
  createdAt: string;
  isAutoManaged: boolean;
}

export default function AdminEventsPage() {
  const [events] = useState<Event[]>([
    {
      id: "1",
      name: "Christmas Season",
      type: "holiday",
      icon: "gift",
      startDate: "2024-12-01",
      endDate: "2024-12-31",
      status: "active",
      description: "Holiday season with special Christmas offers and promotions",
      discountRange: "15-30%",
      affectedOffers: 45,
      expectedRevenue: 750000,
      createdAt: "2024-11-01",
      isAutoManaged: true,
    },
    {
      id: "2",
      name: "Black Friday",
      type: "holiday",
      icon: "star",
      startDate: "2024-11-24",
      endDate: "2024-11-27",
      status: "ended",
      description: "Major shopping event with significant discounts",
      discountRange: "20-50%",
      affectedOffers: 67,
      expectedRevenue: 1200000,
      createdAt: "2024-10-15",
      isAutoManaged: true,
    },
    {
      id: "3",
      name: "Summer Season",
      type: "seasonal",
      icon: "sun",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      status: "ended",
      description: "Summer vacation and travel season promotions",
      discountRange: "10-25%",
      affectedOffers: 38,
      expectedRevenue: 580000,
      createdAt: "2024-05-01",
      isAutoManaged: true,
    },
    {
      id: "4",
      name: "Valentine's Day",
      type: "holiday",
      icon: "heart",
      startDate: "2025-02-10",
      endDate: "2025-02-14",
      status: "upcoming",
      description: "Romantic offers for couples and special occasions",
      discountRange: "15-25%",
      affectedOffers: 23,
      expectedRevenue: 320000,
      createdAt: "2024-12-15",
      isAutoManaged: true,
    },
    {
      id: "5",
      name: "Restaurant Week",
      type: "custom",
      icon: "leaf",
      startDate: "2025-03-15",
      endDate: "2025-03-21",
      status: "upcoming",
      description: "Custom event promoting local restaurants and dining",
      discountRange: "20-30%",
      affectedOffers: 18,
      expectedRevenue: 245000,
      createdAt: "2024-12-20",
      isAutoManaged: false,
    }
  ]);

  const getEventIcon = (iconName: string) => {
    const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
      gift: Gift,
      star: Star,
      sun: Sun,
      snowflake: Snowflake,
      heart: Heart,
      leaf: Leaf,
      sparkles: Sparkles,
    };
    const Icon = icons[iconName] || Calendar;
    return <Icon size={20} />;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "holiday":
        return "bg-red-500/10 text-red-500";
      case "seasonal":
        return "bg-blue-500/10 text-blue-500";
      case "custom":
        return "bg-purple-500/10 text-purple-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500";
      case "upcoming":
        return "bg-yellow-500/10 text-yellow-500";
      case "ended":
        return "bg-gray-500/10 text-gray-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const stats = {
    total: events.length,
    active: events.filter(e => e.status === "active").length,
    upcoming: events.filter(e => e.status === "upcoming").length,
    totalOffers: events.reduce((sum, e) => sum + e.affectedOffers, 0),
    expectedRevenue: events.reduce((sum, e) => sum + e.expectedRevenue, 0),
    autoManaged: events.filter(e => e.isAutoManaged).length,
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
              Events & Seasons
            </h1>
            <p className="text-gray-400 text-sm">
              Manage seasonal events and promotional campaigns
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-all">
          <Plus size={20} />
          Create Event
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-card-background border border-primary rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Events</p>
              <p className="text-white text-2xl font-bold">{stats.total}</p>
            </div>
            <Calendar className="text-primary" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-green-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active</p>
              <p className="text-white text-2xl font-bold">{stats.active}</p>
            </div>
            <Clock className="text-green-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-yellow-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Upcoming</p>
              <p className="text-white text-2xl font-bold">{stats.upcoming}</p>
            </div>
            <Calendar className="text-yellow-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-blue-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Offers</p>
              <p className="text-white text-2xl font-bold">{stats.totalOffers}</p>
            </div>
            <Tag className="text-blue-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-purple-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Expected Revenue</p>
              <p className="text-white text-2xl font-bold">{stats.expectedRevenue.toLocaleString()} kr.</p>
            </div>
            <Users className="text-purple-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-orange-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Auto Managed</p>
              <p className="text-white text-2xl font-bold">{stats.autoManaged}</p>
            </div>
            <Settings className="text-orange-500" size={24} />
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-card-background border border-primary rounded-2xl p-6 hover:border-primary/80 transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    event.type === "holiday" ? "bg-red-500/10" :
                    event.type === "seasonal" ? "bg-blue-500/10" :
                    "bg-purple-500/10"
                  }`}>
                    <span className={`${
                      event.type === "holiday" ? "text-red-500" :
                      event.type === "seasonal" ? "text-blue-500" :
                      "text-purple-500"
                    }`}>
                      {getEventIcon(event.icon)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{event.name}</h3>
                    <p className="text-gray-400 text-sm">{event.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Type</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-400">Status</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-400">Duration</p>
                    <p className="text-white font-medium">
                      {event.startDate} - {event.endDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Discount Range</p>
                    <p className="text-white font-medium">{event.discountRange}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3 text-sm">
                  <div>
                    <p className="text-gray-400">Affected Offers</p>
                    <p className="text-white font-medium">{event.affectedOffers}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Expected Revenue</p>
                    <p className="text-white font-medium">{event.expectedRevenue.toLocaleString()} kr.</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Auto Managed</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${event.isAutoManaged ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500"}`}>
                      {event.isAutoManaged ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all">
                  <Eye size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                  <Edit size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Event Management */}
      <div className="bg-card-background border border-primary rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Event Management</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Settings className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-blue-500 font-bold mb-1">Automatic Management</h4>
                <p className="text-sm text-gray-300">
                  Holiday events (Christmas, Black Friday, New Year) are automatically managed by the system with predefined discount ranges and durations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Tag className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-green-500 font-bold mb-1">Custom Events</h4>
                <p className="text-sm text-gray-300">
                  Create custom promotional events like &quot;Restaurant Week&quot; or &quot;Summer Festival&quot; with specific discount ranges and target categories.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="text-purple-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-purple-500 font-bold mb-1">Seasonal Events</h4>
                <p className="text-sm text-gray-300">
                  Summer, Winter, Spring, and Fall seasons with appropriate promotional strategies for each time period.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="text-orange-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-orange-500 font-bold mb-1">Impact Tracking</h4>
                <p className="text-sm text-gray-300">
                  Monitor event performance, affected offers, and revenue impact to optimize future promotional strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Alert */}
      <div className="bg-yellow-500/10 border border-yellow-500 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <Calendar className="text-yellow-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="text-yellow-500 font-bold mb-1">
              Upcoming Events
            </h3>
            <p className="text-sm text-gray-300">
              Valentine&apos;s Day event starts in 11 days. Restaurant Week begins in 44 days.
              Prepare promotional materials and notify companies about upcoming opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

