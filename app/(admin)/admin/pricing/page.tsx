"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Save,
  ArrowLeft,
  Tag,
  Calendar,
  Clock,
  CreditCard,
  Settings,
  AlertCircle,
  CheckCircle,
  Edit,
  Plus
} from "lucide-react";

interface CommissionRule {
  id: string;
  offerType: string;
  rate: number;
  unit: "day" | "week" | "month" | "percentage";
  description: string;
  isActive: boolean;
  lastUpdated: string;
  updatedBy: string;
}

interface PricingRule {
  id: string;
  name: string;
  type: "discount" | "markup" | "fixed";
  value: number;
  unit: "percentage" | "amount";
  description: string;
  isActive: boolean;
  applicableTo: string[];
  createdAt: string;
}

export default function AdminPricingPage() {
  const [commissionRules, setCommissionRules] = useState<CommissionRule[]>([
    {
      id: "1",
      offerType: "Active Offer",
      rate: 1,
      unit: "day",
      description: "1 kr. per day for active promotional offers",
      isActive: true,
      lastUpdated: "2024-12-01",
      updatedBy: "Admin User"
    },
    {
      id: "2",
      offerType: "Weekdays Offer",
      rate: 4,
      unit: "week",
      description: "4 kr. per week for restaurant and activity specials",
      isActive: true,
      lastUpdated: "2024-12-01",
      updatedBy: "Admin User"
    },
    {
      id: "3",
      offerType: "Happy Hour Offer",
      rate: 10,
      unit: "month",
      description: "10 kr. per month for bar and restaurant time-based promotions",
      isActive: true,
      lastUpdated: "2024-12-01",
      updatedBy: "Admin User"
    },
    {
      id: "4",
      offerType: "Gift Card",
      rate: 5,
      unit: "percentage",
      description: "5% commission on gift card sales",
      isActive: true,
      lastUpdated: "2024-12-01",
      updatedBy: "Admin User"
    }
  ]);

  const [pricingRules, setPricingRules] = useState<PricingRule[]>([
    {
      id: "1",
      name: "Holiday Discount",
      type: "discount",
      value: 15,
      unit: "percentage",
      description: "15% discount applied during holiday seasons",
      isActive: true,
      applicableTo: ["Active Offer", "Weekdays Offer"],
      createdAt: "2024-11-01"
    },
    {
      id: "2",
      name: "Premium Markup",
      type: "markup",
      value: 2000,
      unit: "amount",
      description: "2000 kr. markup for premium hotel offers",
      isActive: true,
      applicableTo: ["Hotels & Accommodation"],
      createdAt: "2024-11-15"
    }
  ]);

  const [editingCommission, setEditingCommission] = useState<string | null>(null);
  const [editingPricing, setEditingPricing] = useState<string | null>(null);

  const handleCommissionEdit = (id: string) => {
    setEditingCommission(id);
  };

  const handlePricingEdit = (id: string) => {
    setEditingPricing(id);
  };

  const handleCommissionSave = (id: string, newRate: number) => {
    setCommissionRules(prev => prev.map(rule =>
      rule.id === id
        ? { ...rule, rate: newRate, lastUpdated: new Date().toISOString().split('T')[0] }
        : rule
    ));
    setEditingCommission(null);
  };

  const handlePricingSave = (id: string, newValue: number) => {
    setPricingRules(prev => prev.map(rule =>
      rule.id === id
        ? { ...rule, value: newValue }
        : rule
    ));
    setEditingPricing(null);
  };

  const toggleCommissionStatus = (id: string) => {
    setCommissionRules(prev => prev.map(rule =>
      rule.id === id
        ? { ...rule, isActive: !rule.isActive }
        : rule
    ));
  };

  const togglePricingStatus = (id: string) => {
    setPricingRules(prev => prev.map(rule =>
      rule.id === id
        ? { ...rule, isActive: !rule.isActive }
        : rule
    ));
  };

  const totalCommission = commissionRules
    .filter(rule => rule.isActive)
    .reduce((sum, rule) => sum + rule.rate, 0);

  const activePricingRules = pricingRules.filter(rule => rule.isActive).length;

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
              Commission & Pricing
            </h1>
            <p className="text-gray-400 text-sm">
              Manage platform commissions and pricing rules
            </p>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card-background border border-primary rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Commissions</p>
              <p className="text-white text-2xl font-bold">{commissionRules.filter(r => r.isActive).length}</p>
            </div>
            <DollarSign className="text-primary" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-green-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Commission</p>
              <p className="text-white text-2xl font-bold">{totalCommission} kr.</p>
            </div>
            <TrendingUp className="text-green-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-blue-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Pricing Rules</p>
              <p className="text-white text-2xl font-bold">{activePricingRules}</p>
            </div>
            <Settings className="text-blue-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-purple-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Categories Affected</p>
              <p className="text-white text-2xl font-bold">
                {new Set(pricingRules.flatMap(r => r.applicableTo)).size}
              </p>
            </div>
            <Tag className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      {/* Commission Rules */}
      <div className="bg-card-background border border-primary rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Commission Rules</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-dark font-semibold rounded-full hover:bg-primary/90 transition-all">
            <Plus size={20} />
            Add Rule
          </button>
        </div>

        <div className="space-y-4">
          {commissionRules.map((rule) => (
            <div
              key={rule.id}
              className="bg-background border border-primary/30 rounded-lg p-6 hover:border-primary transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${rule.isActive ? "bg-green-500" : "bg-gray-500"}`} />
                  <h4 className="font-bold text-white">{rule.offerType}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${rule.isActive ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500"}`}>
                    {rule.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleCommissionStatus(rule.id)}
                    className={`px-3 py-1.5 font-semibold rounded-lg transition-all text-sm ${
                      rule.isActive
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {rule.isActive ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Commission Rate</p>
                  {editingCommission === rule.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        defaultValue={rule.rate}
                        className="px-3 py-2 bg-card-background border border-primary rounded-lg text-white focus:outline-none focus:ring-2 focus:border-primary"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const value = parseFloat((e.target as HTMLInputElement).value);
                            if (!isNaN(value)) {
                              handleCommissionSave(rule.id, value);
                            }
                          }
                        }}
                      />
                      <button
                        onClick={() => handleCommissionSave(rule.id, rule.rate)}
                        className="p-1 hover:bg-primary/10 rounded"
                      >
                        <CheckCircle size={16} className="text-green-500" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <p className="text-white font-bold">
                        {rule.rate} kr. {rule.unit === "percentage" ? "%" : `per ${rule.unit}`}
                      </p>
                      <button
                        onClick={() => handleCommissionEdit(rule.id)}
                        className="p-1 hover:bg-primary/10 rounded"
                      >
                        <Edit size={16} className="text-primary" />
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">Description</p>
                  <p className="text-white text-sm">{rule.description}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">Last Updated</p>
                  <p className="text-white text-sm">{rule.lastUpdated} by {rule.updatedBy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Rules */}
      <div className="bg-card-background border border-primary rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Pricing Rules</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-dark font-semibold rounded-full hover:bg-primary/90 transition-all">
            <Plus size={20} />
            Add Rule
          </button>
        </div>

        <div className="space-y-4">
          {pricingRules.map((rule) => (
            <div
              key={rule.id}
              className="bg-background border border-primary/30 rounded-lg p-6 hover:border-primary transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${rule.isActive ? "bg-green-500" : "bg-gray-500"}`} />
                  <h4 className="font-bold text-white">{rule.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${rule.isActive ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500"}`}>
                    {rule.isActive ? "Active" : "Inactive"}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    rule.type === "discount" ? "bg-blue-500/10 text-blue-500" :
                    rule.type === "markup" ? "bg-orange-500/10 text-orange-500" :
                    "bg-purple-500/10 text-purple-500"
                  }`}>
                    {rule.type}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePricingStatus(rule.id)}
                    className={`px-3 py-1.5 font-semibold rounded-lg transition-all text-sm ${
                      rule.isActive
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {rule.isActive ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Value</p>
                  {editingPricing === rule.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        defaultValue={rule.value}
                        className="px-3 py-2 bg-card-background border border-primary rounded-lg text-white focus:outline-none focus:ring-2 focus:border-primary"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const value = parseFloat((e.target as HTMLInputElement).value);
                            if (!isNaN(value)) {
                              handlePricingSave(rule.id, value);
                            }
                          }
                        }}
                      />
                      <button
                        onClick={() => handlePricingSave(rule.id, rule.value)}
                        className="p-1 hover:bg-primary/10 rounded"
                      >
                        <CheckCircle size={16} className="text-green-500" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <p className="text-white font-bold">
                        {rule.unit === "percentage" ? `${rule.value}%` : `${rule.value.toLocaleString()} kr.`}
                      </p>
                      <button
                        onClick={() => handlePricingEdit(rule.id)}
                        className="p-1 hover:bg-primary/10 rounded"
                      >
                        <Edit size={16} className="text-primary" />
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">Description</p>
                  <p className="text-white text-sm">{rule.description}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">Applicable To</p>
                  <div className="flex flex-wrap gap-1">
                    {rule.applicableTo.map(category => (
                      <span key={category} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commission Calculator */}
      <div className="bg-card-background border border-primary rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Commission Calculator</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <DollarSign className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-green-500 font-bold mb-1">Active Offer Commission</h4>
                <p className="text-sm text-gray-300">
                  1 kr. per day × number of days active
                </p>
                <div className="mt-2 p-3 bg-background rounded-lg border border-primary/30">
                  <p className="text-white font-medium">Example: 30-day offer = 30 kr. commission</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-blue-500 font-bold mb-1">Weekdays Offer Commission</h4>
                <p className="text-sm text-gray-300">
                  4 kr. per week × number of weeks active
                </p>
                <div className="mt-2 p-3 bg-background rounded-lg border border-primary/30">
                  <p className="text-white font-medium">Example: 4-week offer = 16 kr. commission</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="text-purple-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-purple-500 font-bold mb-1">Happy Hour Commission</h4>
                <p className="text-sm text-gray-300">
                  10 kr. per month × number of months active
                </p>
                <div className="mt-2 p-3 bg-background rounded-lg border border-primary/30">
                  <p className="text-white font-medium">Example: 3-month offer = 30 kr. commission</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CreditCard className="text-orange-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-orange-500 font-bold mb-1">Gift Card Commission</h4>
                <p className="text-sm text-gray-300">
                  5% of total gift card sale amount
                </p>
                <div className="mt-2 p-3 bg-background rounded-lg border border-primary/30">
                  <p className="text-white font-medium">Example: 10,000 kr. gift card = 500 kr. commission</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

