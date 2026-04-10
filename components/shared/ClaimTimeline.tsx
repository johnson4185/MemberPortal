"use client";

import { Claim } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { 
  Send, 
  ClipboardCheck, 
  CheckCircle2, 
  DollarSign, 
  XCircle, 
  RefreshCw, 
  FileText, 
  User, 
  Users, 
  Clock, 
  Calendar 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ClaimTimelineProps {
  claim: Claim;
  isModal?: boolean;
}

export default function ClaimTimeline({ claim, isModal = false }: ClaimTimelineProps) {
  // Filter timeline to only show events up to current status
  const currentStatusIndex = claim.timeline.findIndex(e => e.status === claim.status);
  const visibleTimeline = claim.timeline.slice(0, currentStatusIndex + 1);
  
  // Determine next pending step
  const getNextPendingStep = () => {
    if (claim.status === "approved") {
      return {
        status: "Payment Processing",
        description: "Preparing payment for processing",
        team: "Finance Team",
        handlerName: "Robert Williams",
        action: "Pending: Payment will be processed within 2-3 business days",
        isPending: true
      };
    }
    return null;
  };
  
  const nextPendingStep = getNextPendingStep();

  // Helper to get icon for each status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return Send;
      case "under_review":
        return ClipboardCheck;
      case "approved":
        return CheckCircle2;
      case "paid":
        return DollarSign;
      case "rejected":
        return XCircle;
      case "withdrawn":
        return XCircle;
      case "resubmitted":
        return RefreshCw;
      case "denied":
        return XCircle;
      default:
        return FileText;
    }
  };

  // Helper to get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "submitted":
        return "Claim Submitted";
      case "under_review":
        return "Under Review";
      case "approved":
        return "Approved";
      case "paid":
        return "Payment Processed";
      case "rejected":
        return "Rejected";
      case "withdrawn":
        return "Withdrawn";
      case "resubmitted":
        return "Resubmitted";
      case "denied":
        return "Denied";
      default:
        return status.replace("_", " ");
    }
  };

  if (isModal) {
    // Modal version with animations
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h3 className="text-[18px] font-semibold text-gray-900">Timeline</h3>
          <div className="flex items-center gap-2 text-[13px] text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Last updated: {formatDate(claim.updatedAt)}</span>
          </div>
        </div>

        <div className="space-y-0">
          <AnimatePresence>
            {visibleTimeline.map((event, index) => {
              const StatusIcon = getStatusIcon(event.status);
              const isLast = index === visibleTimeline.length - 1 && !nextPendingStep;
              const isNegative = event.status === "rejected" || event.status === "denied";

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="relative"
                >
                  <div className="flex gap-4 pb-8 last:pb-0">
                    {/* Timeline line and icon */}
                    <div className="relative flex flex-col items-center">
                      <div
                        className={cn(
                          "relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all",
                          isNegative && "bg-red-500",
                          !isNegative && "bg-[#0E7490]"
                        )}
                      >
                        <StatusIcon className="w-5 h-5 text-white" />
                      </div>

                      {!isLast && (
                        <div
                          className={cn(
                            "w-0.5 h-full absolute top-12",
                            isNegative ? "bg-red-300" : "bg-gray-300"
                          )}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h4 className="text-[16px] font-semibold mb-1 text-gray-900">
                        {getStatusLabel(event.status)}
                      </h4>
                      <p className="text-[14px] text-gray-600 mb-3">{event.description}</p>

                      {/* Team and Handler Info */}
                      {(event.team || event.handlerName) && (
                        <div className="space-y-2 mb-3">
                          {event.team && (
                            <div className="flex items-center gap-2 text-[13px]">
                              <Users className="w-4 h-4 text-[#0E7490]" />
                              <span className="font-medium text-[#0E7490]">Team:</span>
                              <span className="text-gray-700">{event.team}</span>
                            </div>
                          )}
                          {event.handlerName && (
                            <div className="flex items-center gap-2 text-[13px]">
                              <User className="w-4 h-4 text-[#0E7490]" />
                              <span className="font-medium text-[#0E7490]">Handler:</span>
                              <span className="text-gray-700">{event.handlerName}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Action Details */}
                      {event.action && (
                        <div
                          className={cn(
                            "rounded-lg p-3 mb-3 text-[13px]",
                            isNegative && "bg-red-50 border border-red-200 text-red-700",
                            !isNegative && "bg-blue-50 border border-blue-200 text-blue-700"
                          )}
                        >
                          <span className="font-semibold">
                            {event.action.includes("Pending:") ? "⏳ " : ""}
                            {event.action}
                          </span>
                        </div>
                      )}

                      <div className="text-[13px] text-[#0E7490] font-medium flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(event.date, "long")} at{" "}
                        {new Date(event.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Pending Next Step */}
            {nextPendingStep && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: visibleTimeline.length * 0.1, duration: 0.3 }}
                className="relative"
              >
                <div className="flex gap-4 pb-8 last:pb-0">
                  {/* Timeline line and icon */}
                  <div className="relative flex flex-col items-center">
                    {/* Icon container - Pending state */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center bg-amber-400 border-2 border-amber-500"
                    >
                      <Clock className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-[16px] font-semibold text-gray-900">
                        {nextPendingStep.status}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[11px] font-bold">
                        PENDING
                      </span>
                    </div>
                    <p className="text-[14px] text-gray-600 mb-3">{nextPendingStep.description}</p>

                    {/* Team and Handler Info */}
                    <div className="space-y-2 mb-3">
                      {nextPendingStep.team && (
                        <div className="flex items-center gap-2 text-[13px]">
                          <Users className="w-4 h-4 text-amber-600" />
                          <span className="font-medium text-amber-600">Assigned To:</span>
                          <span className="text-gray-700">{nextPendingStep.team}</span>
                        </div>
                      )}
                      {nextPendingStep.handlerName && (
                        <div className="flex items-center gap-2 text-[13px]">
                          <User className="w-4 h-4 text-amber-600" />
                          <span className="font-medium text-amber-600">Handler:</span>
                          <span className="text-gray-700">{nextPendingStep.handlerName}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Details */}
                    {nextPendingStep.action && (
                      <div className="rounded-lg p-3 bg-amber-50 border border-amber-200 text-[13px]">
                        <span className="font-semibold text-amber-700">
                          ⏳ {nextPendingStep.action}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  } else {
    // Full page version without wrapper div
    return (
      <>
        {visibleTimeline.map((event, index) => {
          const StatusIcon = getStatusIcon(event.status);
          const isLast = index === visibleTimeline.length - 1 && !nextPendingStep;
          const isNegative = event.status === "rejected" || event.status === "denied";

          return (
            <div key={event.id} className="relative flex gap-4 pb-8 last:pb-0">
              {/* Timeline line and icon */}
              <div className="relative flex flex-col items-center">
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isNegative ? "bg-red-500" : "bg-[#0E7490]"
                  }`}
                >
                  <StatusIcon className="w-5 h-5 text-white" />
                </div>

                {!isLast && (
                  <div
                    className={`w-0.5 h-full absolute top-12 ${
                      isNegative ? "bg-red-300" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h4 className="text-[16px] font-semibold mb-1 text-gray-900">
                  {getStatusLabel(event.status)}
                </h4>
                <p className="text-[14px] text-gray-600 mb-3">{event.description}</p>

                {/* Team and Handler Info */}
                {(event.team || event.handlerName) && (
                  <div className="space-y-2 mb-3">
                    {event.team && (
                      <div className="flex items-center gap-2 text-[13px]">
                        <Users className="w-4 h-4 text-[#0E7490]" />
                        <span className="font-medium text-[#0E7490]">Team:</span>
                        <span className="text-gray-700">{event.team}</span>
                      </div>
                    )}
                    {event.handlerName && (
                      <div className="flex items-center gap-2 text-[13px]">
                        <User className="w-4 h-4 text-[#0E7490]" />
                        <span className="font-medium text-[#0E7490]">Handler:</span>
                        <span className="text-gray-700">{event.handlerName}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Details */}
                {event.action && (
                  <div
                    className={`rounded-lg p-3 mb-3 text-[13px] ${
                      isNegative
                        ? "bg-red-50 border border-red-200 text-red-700"
                        : "bg-blue-50 border border-blue-200 text-blue-700"
                    }`}
                  >
                    <span className="font-semibold">
                      {event.action.includes("Pending:") ? "⏳ " : ""}
                      {event.action}
                    </span>
                  </div>
                )}

                <div className="text-[13px] text-[#0E7490] font-medium flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(event.date, "long")} at{" "}
                  {new Date(event.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Pending Next Step */}
        {nextPendingStep && (
          <div className="relative flex gap-4 pb-8">
            <div className="relative flex flex-col items-center">
              {/* Icon container - Pending state */}
              <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center bg-amber-400 border-2 border-amber-500 animate-pulse">
                <Clock className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-[16px] font-semibold text-gray-900">
                  {nextPendingStep.status}
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[11px] font-bold">
                  PENDING
                </span>
              </div>
              <p className="text-[14px] text-gray-600 mb-3">{nextPendingStep.description}</p>

              {/* Team and Handler Info */}
              <div className="space-y-2 mb-3">
                {nextPendingStep.team && (
                  <div className="flex items-center gap-2 text-[13px]">
                    <Users className="w-4 h-4 text-amber-600" />
                    <span className="font-medium text-amber-600">Assigned To:</span>
                    <span className="text-gray-700">{nextPendingStep.team}</span>
                  </div>
                )}
                {nextPendingStep.handlerName && (
                  <div className="flex items-center gap-2 text-[13px]">
                    <User className="w-4 h-4 text-amber-600" />
                    <span className="font-medium text-amber-600">Handler:</span>
                    <span className="text-gray-700">{nextPendingStep.handlerName}</span>
                  </div>
                )}
              </div>

              {/* Action Details */}
              {nextPendingStep.action && (
                <div className="rounded-lg p-3 bg-amber-50 border border-amber-200 text-[13px]">
                  <span className="font-semibold text-amber-700">
                    ⏳ {nextPendingStep.action}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}
