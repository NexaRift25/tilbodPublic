"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  User,
  Building2,
  Shield,
  Eye,
  Edit,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Filter,
  Search,
  Ban,
  Unlock,
  Crown
} from "lucide-react";
import Pagination from "@/components/ui/Pagination";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: "user" | "company" | "admin";
  status: "active" | "inactive" | "suspended" | "pending";
  isVerified: boolean;
  createdAt: string;
  lastLogin?: string;
  companyCount?: number;
}

export default function AdminUsersPage() {
  const [users] = useState<User[]>([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+354 555 0123",
      role: "company",
      status: "active",
      isVerified: true,
      createdAt: "2024-12-01",
      lastLogin: "2025-01-15",
      companyCount: 3,
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "+354 555 0456",
      role: "user",
      status: "active",
      isVerified: true,
      createdAt: "2024-11-15",
      lastLogin: "2025-01-14",
    },
    {
      id: "3",
      firstName: "Admin",
      lastName: "User",
      email: "admin@tilbod.is",
      role: "admin",
      status: "active",
      isVerified: true,
      createdAt: "2024-10-01",
      lastLogin: "2025-01-15",
    },
    {
      id: "4",
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike.johnson@example.com",
      phone: "+354 555 0789",
      role: "company",
      status: "pending",
      isVerified: false,
      createdAt: "2025-01-10",
      companyCount: 0,
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filteredUsers = users.filter(user => {
    const matchesSearch = `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = filteredUsers.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter]);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="text-red-500" size={16} />;
      case "company":
        return <Building2 className="text-blue-500" size={16} />;
      case "user":
        return <User className="text-green-500" size={16} />;
      default:
        return <User className="text-gray-500" size={16} />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/10 text-red-500";
      case "company":
        return "bg-blue-500/10 text-blue-500";
      case "user":
        return "bg-green-500/10 text-green-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="text-green-500" size={16} />;
      case "inactive":
        return <XCircle className="text-gray-500" size={16} />;
      case "suspended":
        return <Ban className="text-red-500" size={16} />;
      case "pending":
        return <AlertCircle className="text-yellow-500" size={16} />;
      default:
        return <XCircle className="text-gray-400" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500";
      case "inactive":
        return "bg-gray-500/10 text-gray-500";
      case "suspended":
        return "bg-red-500/10 text-red-500";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      default:
        return "bg-gray-500/10 text-gray-400";
    }
  };

  const getStatusTextClass = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-500";
      case "inactive":
        return "text-gray-500";
      case "suspended":
        return "text-red-500";
      case "pending":
        return "text-yellow-500";
      default:
        return "text-gray-400";
    }
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === "active").length,
    pending: users.filter(u => u.status === "pending").length,
    companies: users.filter(u => u.role === "company").length,
    admins: users.filter(u => u.role === "admin").length,
    verified: users.filter(u => u.isVerified).length,
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
              User Management
            </h1>
            <p className="text-gray-400 text-sm">
              Manage all platform users and their permissions
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-card-background border border-primary rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-white text-2xl font-bold">{stats.total}</p>
            </div>
            <Users className="text-primary" size={24} />
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
            <AlertCircle className="text-yellow-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-blue-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Companies</p>
              <p className="text-white text-2xl font-bold">{stats.companies}</p>
            </div>
            <Building2 className="text-blue-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-red-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Admins</p>
              <p className="text-white text-2xl font-bold">{stats.admins}</p>
            </div>
            <Crown className="text-red-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-purple-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Verified</p>
              <p className="text-white text-2xl font-bold">{stats.verified}</p>
            </div>
            <CheckCircle className="text-purple-500" size={24} />
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
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 bg-background border border-primary/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-primary"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="company">Company</option>
              <option value="user">User</option>
            </select>
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
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card-background border border-primary rounded-2xl p-6">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-8">
            <Users className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">No users found</h3>
            <p className="text-gray-400">
              {searchTerm || roleFilter !== "all" || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No users have registered yet"
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-primary/30">
                  <th className="pb-3 px-2">User</th>
                  <th className="pb-3 px-2">Role</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2">Verified</th>
                  <th className="pb-3 px-2">Phone</th>
                  <th className="pb-3 px-2 text-center">Companies</th>
                  <th className="pb-3 px-2">Last Login</th>
                  <th className="pb-3 px-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {currentPageItems.map((user) => (
                  <tr key={user.id} className="border-b border-primary/10 hover:bg-primary/5">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          {user.role === "admin" ? (
                            <Crown className="text-red-500" size={16} />
                          ) : user.role === "company" ? (
                            <Building2 className="text-blue-500" size={16} />
                          ) : (
                            <User className="text-green-500" size={16} />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{user.firstName} {user.lastName}</p>
                          <p className="text-sm text-gray-400 truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {getRoleIcon(user.role)}
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold truncate ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {getStatusIcon(user.status)}
                        <span className={`text-sm font-medium truncate ${getStatusTextClass(user.status)}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {user.isVerified ? (
                          <CheckCircle className="text-green-500 flex-shrink-0" size={14} />
                        ) : (
                          <XCircle className="text-red-500 flex-shrink-0" size={14} />
                        )}
                        <span className={`text-sm font-medium truncate ${user.isVerified ? "text-green-500" : "text-red-500"}`}>
                          {user.isVerified ? "Verified" : "Unverified"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <p className="text-sm truncate">{user.phone || "—"}</p>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <p className="text-sm">{user.companyCount || 0}/10</p>
                    </td>
                    <td className="py-4 px-2">
                      <p className="text-sm truncate">{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}</p>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded transition-all">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded transition-all">
                          <Edit size={14} />
                        </button>
                        {user.status === "active" ? (
                          <button className="px-2 py-1 bg-red-500 text-white font-semibold rounded text-xs hover:bg-red-600 transition-all">
                            Suspend
                          </button>
                        ) : user.status === "suspended" ? (
                          <button className="px-2 py-1 bg-green-500 text-white font-semibold rounded text-xs hover:bg-green-600 transition-all">
                            Activate
                          </button>
                        ) : null}
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
      {filteredUsers.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* User Insights */}
      <div className="bg-card-background border border-primary rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">User Insights</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Users className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-green-500 font-bold mb-1">User Distribution</h4>
                <p className="text-sm text-gray-300">
                  {stats.companies} company users, {users.filter(u => u.role === "user").length} regular users, and {stats.admins} administrators.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-blue-500 font-bold mb-1">Verification Status</h4>
                <p className="text-sm text-gray-300">
                  {stats.verified} verified users ({Math.round(stats.verified / stats.total * 100)}% verification rate).
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="text-purple-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-purple-500 font-bold mb-1">Account Security</h4>
                <p className="text-sm text-gray-300">
                  {users.filter(u => u.status === "active").length} active accounts, {users.filter(u => u.status === "suspended").length} suspended accounts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="text-orange-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-orange-500 font-bold mb-1">Company Activity</h4>
                <p className="text-sm text-gray-300">
                  Company users have registered {users.filter(u => u.role === "company").reduce((sum, u) => sum + (u.companyCount || 0), 0)} total companies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

