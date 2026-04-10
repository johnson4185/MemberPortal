"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Filter, Clock, CheckCircle2, XCircle, ClipboardList, Calendar, FileText, DollarSign, Send, ClipboardCheck, RefreshCw, User, Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Claim } from "@/lib/types";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { ROUTES, CLAIM_STATUSES } from "@/lib/constants";
import { Button, Badge, StatCard } from "@/components/ui";
import DataTable from "@/components/tables/DataTable";
import type { Column } from "@/components/tables/DataTable";
import Modal from "@/components/shared/Modal";
import ClaimTimeline from "@/components/shared/ClaimTimeline";
import { claimsApi } from "@/features/claims/claims.api";

export default function ClaimsPage() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [trackClaim, setTrackClaim] = useState<Claim | null>(null);
  const [allClaims, setAllClaims] = useState<Claim[]>([]);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const pageSize = 10;

  // Fetch all claims once for both KPIs and table
  useEffect(() => {
    const fetchAllClaims = async () => {
      try {
        const response = await claimsApi.getList({ 
          page: 1, 
          limit: 1000, // Get all claims
        });
        setAllClaims(response.claims);
      } catch (error) {
        console.error("Failed to fetch all claims:", error);
      }
    };
    
    fetchAllClaims();
  }, []);
  
  // Filter and sort all claims, then paginate on client side
  const filteredClaims = allClaims.filter(claim => {
    // Handle special "pending" status that includes submitted + under_review + rejected
    if (selectedStatus === "pending") {
      if (claim.status !== "submitted" && claim.status !== "under_review" && claim.status !== "rejected") return false;
    }
    else if (selectedStatus !== "all" && claim.status !== selectedStatus) {
      return false;
    }
    
    if (dateFrom) {
      const claimDate = new Date(claim.serviceDate).getTime();
      const fromDate = new Date(dateFrom).getTime();
      if (claimDate < fromDate) return false;
    }
    
    if (dateTo) {
      const claimDate = new Date(claim.serviceDate).getTime();
      const toDate = new Date(dateTo).getTime();
      if (claimDate > toDate) return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Sort by submittedDate - most recent first
    return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
  });
  
  const totalPages = Math.ceil(filteredClaims.length / pageSize);
  const paginatedClaims = filteredClaims.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  const statusDotClass = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-500";
      case "approved":
        return "bg-success";
      case "paid":
        return "bg-info";
      case "rejected":
        return "bg-danger";
      case "under_review":
        return "bg-warning";
      case "withdrawn":
        return "bg-text-muted";
      default:
        return "bg-text-muted";
    }
  };

  const columns: Column<Claim>[] = [
    {
      header: "Claim",
      accessor: "claimNumber",
      cell: (_value: unknown, row: Claim) => (
        <div className="flex items-center gap-2">
          <div>
            <div className="text-[14px] font-semibold text-text-primary">{row.claimNumber}</div>
            <div className="text-[12px] text-text-soft capitalize">{row.type}</div>
          </div>
        </div>
      ),
      className: "min-w-[200px]",
    },
    {
      header: "Provider",
      accessor: "providerName",
      className: "min-w-[180px]",
    },
    {
      header: "Service Date",
      accessor: "serviceDate",
      cell: (value: unknown) => formatDate(value as string),
      className: "min-w-[140px]",
    },
    {
      header: "Amount",
      accessor: "amountBilled",
      cell: (value: unknown) => formatCurrency(value as number),
      className: "min-w-[120px]",
    },
    {
      header: "Status",
      accessor: "status",
      cell: (value: unknown) => (
        <Badge variant="status" status={value as string}>
          {(value as string).replace("_", " ")}
        </Badge>
      ),
      className: "min-w-[120px]",
    },
    {
      header: "",
      accessor: (row: Claim) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push(ROUTES.CLAIM_DETAIL(row.id))}
            onMouseEnter={() => router.prefetch(ROUTES.CLAIM_DETAIL(row.id))}
            className="px-3 py-1.5 rounded-lg border border-border text-[12px] font-semibold text-ocean-base hover:border-ocean-bright hover:text-ocean-bright transition-colors"
          >
            View
          </button>
          <button
            type="button"
            onClick={() => setTrackClaim(row)}
            className="px-3 py-1.5 rounded-lg border border-border text-[12px] font-semibold text-text-mid hover:border-ocean-bright hover:text-ocean-bright transition-colors"
          >
            Track
          </button>
          {row.status === "rejected" && (
            <button
              type="button"
              onClick={() => router.push(`${ROUTES.CLAIM_DETAIL(row.id)}?edit=1`)}
              className="px-3 py-1.5 rounded-lg bg-ocean-base text-[12px] font-semibold text-white hover:bg-ocean-bright transition-colors"
            >
              Resubmit
            </button>
          )}
        </div>
      ),
      className: "min-w-[140px]",
    },
  ];

  const totalClaims = allClaims.length;
  const submittedCount = allClaims.filter((claim) => claim.status === "submitted").length;
  const underReviewCount = allClaims.filter((claim) => claim.status === "under_review").length;
  // Approved = only approved status (ready for payment)
  const approvedCount = allClaims.filter((claim) => claim.status === "approved").length;
  // Pending = submitted + under_review + rejected
  const pendingCount = allClaims.filter((claim) => claim.status === "submitted" || claim.status === "under_review" || claim.status === "rejected").length;
  const rejectedCount = allClaims.filter((claim) => claim.status === "rejected").length;
  // Paid claims count and total amount
  const paidCount = allClaims.filter((claim) => claim.status === "paid").length;
  const totalReimbursed = allClaims.reduce((sum, claim) => sum + claim.amountPaid, 0);
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Claims</h1>
          <p className="text-[16px] text-gray-600 mt-1">
            View and manage your insurance claims
          </p>
        </div>
        <Link href={ROUTES.CLAIM_NEW}>
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            New Claim
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Claims"
          value={totalClaims}
          icon={ClipboardList}
          subtitle="This policy year"
          color="blue"
          compact
          onClick={() => {
            setSelectedStatus("all");
            setCurrentPage(1);
          }}
        />
        <StatCard
          title="Approved Claims"
          value={approvedCount}
          icon={CheckCircle2}
          subtitle="Awaiting payment"
          color="green"
          compact
          onClick={() => {
            setSelectedStatus("approved");
            setCurrentPage(1);
          }}
        />
        <StatCard
          title="Pending Review"
          value={pendingCount}
          icon={Clock}
          subtitle="Processing 3-5 days"
          color="amber"
          compact
          onClick={() => {
            setSelectedStatus("pending");
            setCurrentPage(1);
          }}
        />
        <StatCard
          title="Total Reimbursed"
          value={`${paidCount} ${paidCount === 1 ? "claim" : "claims"} paid`}
          icon={DollarSign}
          highlightedValue={formatCurrency(totalReimbursed)}
          color="blue"
          compact
          onClick={() => {
            setSelectedStatus("paid");
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Claims Filters */}
      <div className="card p-4 space-y-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-[16px] font-semibold text-gray-900">All Claims</h2>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-600" />
            <button
              onClick={() => {
                setSelectedStatus("all");
                setCurrentPage(1);
              }}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-colors",
                selectedStatus === "all"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              All
            </button>
            {CLAIM_STATUSES.slice(1).map((status) => {
              const isSelected =
                selectedStatus === status.value ||
                (selectedStatus === "pending" && ["submitted", "under_review", "rejected"].includes(status.value));

              return (
                <button
                  key={status.value}
                  onClick={() => {
                    setSelectedStatus(status.value);
                    setCurrentPage(1);
                  }}
                  className={cn(
                    "px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-colors",
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {status.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Date Filters */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-text-muted" />
            <label className="text-[13px] font-semibold text-text-primary">From:</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 rounded-lg border border-border text-[13px] focus:outline-none focus:border-ocean-bright"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[13px] font-semibold text-text-primary">To:</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 rounded-lg border border-border text-[13px] focus:outline-none focus:border-ocean-bright"
            />
          </div>
          {(dateFrom || dateTo) && (
            <button
              onClick={() => {
                setDateFrom("");
                setDateTo("");
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 rounded-lg text-[13px] font-semibold text-ocean-base hover:text-ocean-bright transition-colors"
            >
              Clear Dates
            </button>
          )}
        </div>
      </div>

      {/* Claims Table with Pagination */}
      <div className="space-y-4">
        <DataTable
          columns={columns}
          data={paginatedClaims}
          emptyMessage="No claims found"
        />
        
        {/* Pagination Controls */}
        {filteredClaims.length > pageSize && (
          <div className="card flex items-center justify-between">
            <div className="text-[15px] text-gray-600">
              Showing {Math.min((currentPage - 1) * pageSize + 1, filteredClaims.length)}–{Math.min(currentPage * pageSize, filteredClaims.length)} of {filteredClaims.length} claims
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "w-8 h-8 rounded-lg text-[12px] font-semibold transition-colors",
                      currentPage === page
                        ? "bg-primary text-white"
                        : "border border-gray-200 hover:bg-gray-100"
                    )}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={!!trackClaim}
        onClose={() => setTrackClaim(null)}
        title="Track Claim"
        size="lg"
      >
        {trackClaim && (() => {

          return (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="space-y-5"
            >
              {/* Header with claim info */}
              <div className="flex items-start justify-between gap-4 pb-5 border-b border-gray-200">
                <div className="flex-1">
                  <div className="text-[20px] font-bold text-text-primary mb-2">
                    {trackClaim.claimNumber}
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-text-soft mb-3">
                    <span className="capitalize font-medium">{trackClaim.type}</span>
                    <span>•</span>
                    <span>{trackClaim.providerName}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[13px]">
                      <span className="text-text-soft">Billed Amount:</span>
                      <span className="font-bold text-text-primary">{formatCurrency(trackClaim.amountBilled)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px]">
                      <span className="text-text-soft">Covered:</span>
                      <span className="font-bold text-success">{formatCurrency(trackClaim.amountCovered)}</span>
                    </div>
                    {trackClaim.amountPaid > 0 && (
                      <div className="flex items-center gap-2 text-[13px]">
                        <span className="text-text-soft">Paid:</span>
                        <span className="font-bold text-ocean-base">{formatCurrency(trackClaim.amountPaid)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <Badge variant="status" status={trackClaim.status}>
                  {trackClaim.status.replace("_", " ")}
                </Badge>
              </div>

              {/* Timeline Component */}
              <ClaimTimeline claim={trackClaim} isModal={true} />

              {/* View Full Details Button */}
              <div className="flex justify-center pt-3 border-t border-gray-200">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setTrackClaim(null);
                    router.push(`/claims/${trackClaim.id}`);
                  }}
                  className="gap-2"
                >
                  View Full Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          );
        })()}
      </Modal>


    </div>
  );
}
