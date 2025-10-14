"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  Eye,
  Edit,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  ArrowLeft,
  Filter,
  Search,
  MoreVertical,
  Check,
  X,
  AlertTriangle
} from "lucide-react";
import Pagination from "@/components/ui/Pagination";

interface Company {
  id: string;
  name: string;
  registrationNumber: string;
  taxId: string;
  category: string;
  status: "pending" | "approved" | "rejected" | "revision";
  submittedBy: string;
  submittedAt: string;
  revisionCount: number;
  contactEmail: string;
  phone: string;
  description?: string;
}

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: "1",
      name: "Nordic Spa & Wellness",
      registrationNumber: "12345678",
      taxId: "87654321",
      category: "Wellness & Spa",
      status: "pending",
      submittedBy: "John Doe",
      submittedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      revisionCount: 0,
      contactEmail: "info@nordicspa.is",
      phone: "+354 555 0123",
      description: "Premium wellness center offering spa treatments and relaxation services."
    },
    {
      id: "2",
      name: "Hotel Aurora",
      registrationNumber: "23456789",
      taxId: "98765432",
      category: "Hotels & Accommodation",
      status: "approved",
      submittedBy: "Jane Smith",
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      revisionCount: 0,
      contactEmail: "reservations@hotelaurora.is",
      phone: "+354 555 0456",
      description: "Boutique hotel in downtown Reykjavik offering luxury accommodations."
    },
    {
      id: "3",
      name: "Reykjavik Bar & Lounge",
      registrationNumber: "34567890",
      taxId: "09876543",
      category: "Food & Dining",
      status: "revision",
      submittedBy: "Mike Johnson",
      submittedAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
      revisionCount: 1,
      contactEmail: "info@reykjavikbar.is",
      phone: "+354 555 0789",
      description: "Trendy bar and lounge offering cocktails and light dining."
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | "revision">("approve");
  const [rejectionReason, setRejectionReason] = useState("");
  const [revisionMessage, setRevisionMessage] = useState("");

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || company.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = filteredCompanies.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="text-green-500" size={20} />;
      case "rejected":
        return <XCircle className="text-red-500" size={20} />;
      case "revision":
        return <AlertCircle className="text-yellow-500" size={20} />;
      default:
        return <Clock className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-500";
      case "rejected":
        return "bg-red-500/10 text-red-500";
      case "revision":
        return "bg-yellow-500/10 text-yellow-500";
      default:
        return "bg-gray-500/10 text-gray-400";
    }
  };

  const getStatusTextClass = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-500";
      case "rejected":
        return "text-red-500";
      case "revision":
        return "text-yellow-500";
      default:
        return "text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "revision":
        return "Needs Revision";
      default:
        return "Pending Review";
    }
  };

  const handleAction = (company: Company, action: "approve" | "reject" | "revision") => {
    setSelectedCompany(company);
    setActionType(action);
    setShowActionModal(true);

    if (action === "reject") {
      setRejectionReason("");
    } else if (action === "revision") {
      setRevisionMessage("");
    }
  };

  const executeAction = () => {
    if (!selectedCompany) return;

    let updatedStatus: Company["status"] = "pending";
    let newRevisionCount = selectedCompany.revisionCount;

    switch (actionType) {
      case "approve":
        updatedStatus = "approved";
        break;
      case "reject":
        updatedStatus = "rejected";
        break;
      case "revision":
        updatedStatus = "revision";
        newRevisionCount = selectedCompany.revisionCount + 1;
        break;
    }

    setCompanies(prev => prev.map(company =>
      company.id === selectedCompany.id
        ? { ...company, status: updatedStatus, revisionCount: newRevisionCount }
        : company
    ));

    setShowActionModal(false);
    setSelectedCompany(null);
  };

  const stats = {
    total: companies.length,
    pending: companies.filter(c => c.status === "pending").length,
    approved: companies.filter(c => c.status === "approved").length,
    revision: companies.filter(c => c.status === "revision").length,
    rejected: companies.filter(c => c.status === "rejected").length,
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
              Company Management
            </h1>
            <p className="text-gray-400 text-sm">
              Review and manage company registrations
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-all">
          <Plus size={20} />
          Add Company
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-card-background border border-primary rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total</p>
              <p className="text-white text-2xl font-bold">{stats.total}</p>
            </div>
            <Building2 className="text-primary" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-gray-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending</p>
              <p className="text-white text-2xl font-bold">{stats.pending}</p>
            </div>
            <Clock className="text-gray-400" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-green-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Approved</p>
              <p className="text-white text-2xl font-bold">{stats.approved}</p>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-yellow-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Revision</p>
              <p className="text-white text-2xl font-bold">{stats.revision}</p>
            </div>
            <AlertCircle className="text-yellow-500" size={24} />
          </div>
        </div>

        <div className="bg-card-background border border-red-500 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Rejected</p>
              <p className="text-white text-2xl font-bold">{stats.rejected}</p>
            </div>
            <XCircle className="text-red-500" size={24} />
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
                placeholder="Search companies..."
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
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="revision">Needs Revision</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Companies List */}
      <div className="space-y-4">
        {filteredCompanies.length === 0 ? (
          <div className="bg-card-background border border-primary rounded-2xl p-8 text-center">
            <Building2 className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">No companies found</h3>
            <p className="text-gray-400">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No companies have been registered yet"
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="pb-3 text-left text-sm font-medium text-gray-400 px-2">Company</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-400 px-2">Status</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-400 px-2">Category</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-400 px-2">Registration</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-400 px-2">Contact</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-400 px-2">Submitted By</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-400 px-2">Submitted</th>
                  <th className="pb-3 text-center text-sm font-medium text-gray-400 px-2">Actions</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {currentPageItems.map((company) => (
                  <tr key={company.id} className="border-b border-primary/10 hover:bg-primary/5">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <Building2 className="text-primary flex-shrink-0" size={20} />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-white truncate">{company.name}</div>
                          <div className="text-sm text-gray-400 truncate">{company.contactEmail}</div>
                          {company.description && (
                            <div className="text-xs text-gray-500 truncate mt-1">{company.description}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {getStatusIcon(company.status)}
                        <div className="min-w-0 flex-1">
                          <span className={`text-sm font-medium truncate ${getStatusTextClass(company.status)}`}>
                            {getStatusText(company.status)}
                          </span>
                          {company.status === "revision" && (
                            <div className="text-xs text-yellow-500 mt-1">
                              Revision {company.revisionCount}/3
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-sm text-gray-300 truncate">{company.category}</span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="min-w-0">
                        <div className="text-sm text-white truncate">{company.registrationNumber}</div>
                        <div className="text-xs text-gray-400 truncate">Tax: {company.taxId}</div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="min-w-0">
                        <div className="text-sm text-white truncate">{company.contactEmail}</div>
                        <div className="text-xs text-gray-400 truncate">{company.phone}</div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-sm text-gray-300 truncate">{company.submittedBy}</span>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-sm text-gray-300 truncate">
                        {new Date(company.submittedAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded transition-all">
                          <Eye size={14} />
                        </button>
                        {company.status === "pending" && (
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleAction(company, "approve")}
                              className="px-2 py-1 bg-green-500 text-white font-semibold rounded text-xs hover:bg-green-600 transition-all"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleAction(company, "reject")}
                              className="px-2 py-1 bg-red-500 text-white font-semibold rounded text-xs hover:bg-red-600 transition-all"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handleAction(company, "revision")}
                              className="px-2 py-1 bg-yellow-500 text-dark font-semibold rounded text-xs hover:bg-yellow-600 transition-all"
                            >
                              Revision
                            </button>
                          </div>
                        )}
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
      {filteredCompanies.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredCompanies.length)} of {filteredCompanies.length} companies
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Action Modal */}
      {showActionModal && selectedCompany && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card-background border border-primary rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              {actionType === "approve" ? (
                <CheckCircle className="text-green-500" size={24} />
              ) : actionType === "reject" ? (
                <XCircle className="text-red-500" size={24} />
              ) : (
                <AlertTriangle className="text-yellow-500" size={24} />
              )}
              <h3 className="text-xl font-bold text-white">
                {actionType === "approve" ? "Approve" : actionType === "reject" ? "Reject" : "Request Revision"}
              </h3>
            </div>

            <p className="text-gray-400 mb-4">
              {actionType === "approve"
                ? `Approve "${selectedCompany.name}" for platform access?`
                : actionType === "reject"
                ? `Reject "${selectedCompany.name}" registration?`
                : `Request revision for "${selectedCompany.name}"? (Attempt ${selectedCompany.revisionCount + 1}/3)`
              }
            </p>

            {(actionType === "reject" || actionType === "revision") && (
              <div className="mb-4">
                <label className="text-gray-400 text-sm mb-2 block">
                  {actionType === "reject" ? "Rejection Reason" : "Revision Message"}
                </label>
                <textarea
                  value={actionType === "reject" ? rejectionReason : revisionMessage}
                  onChange={(e) => actionType === "reject" ? setRejectionReason(e.target.value) : setRevisionMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-primary transition-all resize-none"
                  placeholder={actionType === "reject" ? "Please provide reason for rejection..." : "Please specify what needs to be revised..."}
                />
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowActionModal(false)}
                className="flex-1 px-4 py-2 bg-background border border-primary/30 text-white font-semibold rounded-lg hover:bg-primary/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={executeAction}
                className={`flex-1 px-4 py-2 font-semibold rounded-lg transition-all ${
                  actionType === "approve"
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : actionType === "reject"
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-yellow-500 text-dark hover:bg-yellow-600"
                }`}
              >
                {actionType === "approve" ? "Approve" : actionType === "reject" ? "Reject" : "Request Revision"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

