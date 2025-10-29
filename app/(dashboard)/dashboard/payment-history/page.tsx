"use client";

import { useState } from "react";
import { Download, Search, Filter, CheckCircle, Clock, XCircle } from "lucide-react";

export default function PaymentHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const transactions = [
    {
      id: "TRX-001",
      name: "Romantic Getaway Package",
      date: "2025-10-10",
      time: "14:32",
      amount: "36,890 kr.",
      status: "completed",
      method: "Credit Card",
      reference: "REF-2025-001",
    },
    {
      id: "TRX-002",
      name: "Blue Lagoon Spa Experience",
      date: "2025-10-08",
      time: "10:15",
      amount: "25,500 kr.",
      status: "completed",
      method: "PayPal",
      reference: "REF-2025-002",
    },
    {
      id: "TRX-003",
      name: "Gourmet Dining Experience",
      date: "2025-10-05",
      time: "18:45",
      amount: "18,900 kr.",
      status: "pending",
      method: "Credit Card",
      reference: "REF-2025-003",
    },
    {
      id: "TRX-004",
      name: "Northern Lights Tour Package",
      date: "2025-09-28",
      time: "09:20",
      amount: "28,500 kr.",
      status: "completed",
      method: "Bank Transfer",
      reference: "REF-2025-004",
    },
    {
      id: "TRX-005",
      name: "Golden Circle VIP Tour",
      date: "2025-09-25",
      time: "16:10",
      amount: "32,000 kr.",
      status: "completed",
      method: "Credit Card",
      reference: "REF-2025-005",
    },
    {
      id: "TRX-006",
      name: "Helicopter Glacier Tour",
      date: "2025-09-20",
      time: "11:30",
      amount: "89,900 kr.",
      status: "failed",
      method: "Credit Card",
      reference: "REF-2025-006",
    },
    {
      id: "TRX-007",
      name: "Whale Watching Premium",
      date: "2025-09-15",
      time: "13:45",
      amount: "22,500 kr.",
      status: "completed",
      method: "PayPal",
      reference: "REF-2025-007",
    },
    {
      id: "TRX-008",
      name: "Ice Cave Exploration",
      date: "2025-09-10",
      time: "08:00",
      amount: "35,900 kr.",
      status: "completed",
      method: "Credit Card",
      reference: "REF-2025-008",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || transaction.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="text-green-500" size={20} />;
      case "pending":
        return <Clock className="text-yellow-500" size={20} />;
      case "failed":
        return <XCircle className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: "bg-green-500/10 text-green-500",
      pending: "bg-yellow-500/10 text-yellow-500",
      failed: "bg-red-500/10 text-red-500",
    };
    return styles[status as keyof typeof styles] || "";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Payment History
          </h1>
          <p className="text-gray-400">
            View and manage all your transaction history
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-dark font-semibold rounded-full hover:bg-primary/90 transition-all w-fit">
          <Download size={20} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card-background border border-primary rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background border border-primary/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" size={20} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-background border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-card-background border border-primary rounded-2xl overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-primary/30">
              <tr>
                <th className="text-left px-6 py-4 text-gray-400 font-semibold text-sm">
                  Transaction ID
                </th>
                <th className="text-left px-6 py-4 text-gray-400 font-semibold text-sm">
                  Description
                </th>
                <th className="text-left px-6 py-4 text-gray-400 font-semibold text-sm">
                  Date & Time
                </th>
                <th className="text-left px-6 py-4 text-gray-400 font-semibold text-sm">
                  Amount
                </th>
                <th className="text-left px-6 py-4 text-gray-400 font-semibold text-sm">
                  Method
                </th>
                <th className="text-left px-6 py-4 text-gray-400 font-semibold text-sm">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/30">
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-background/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-primary font-mono text-sm">
                      {transaction.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">
                        {transaction.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Ref: {transaction.reference}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-300 text-sm">
                      <p>{transaction.date}</p>
                      <p className="text-gray-500">{transaction.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-bold">
                      {transaction.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300 text-sm">
                      {transaction.method}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(transaction.status)}
                      <span
                        className={`px-3 py-1 rounded-full text-xs sm:text-sm lg:text-base font-semibold capitalize ${getStatusBadge(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-primary/30">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white font-semibold mb-1">
                    {transaction.name}
                  </p>
                  <p className="text-primary font-mono text-xs sm:text-sm lg:text-base">
                    {transaction.id}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(transaction.status)}
                  <span
                    className={`px-2 py-1 rounded-full text-xs sm:text-sm lg:text-base font-semibold capitalize ${getStatusBadge(
                      transaction.status
                    )}`}
                  >
                    {transaction.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Amount</span>
                <span className="text-white font-bold">{transaction.amount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Date</span>
                <span className="text-gray-300">
                  {transaction.date} {transaction.time}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Method</span>
                <span className="text-gray-300">{transaction.method}</span>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTransactions.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-400 text-lg">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
}

