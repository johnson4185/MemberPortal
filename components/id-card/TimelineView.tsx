"use client";

import { FileText, CheckCircle, Calendar, Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Button, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { MedicalDocument, AuthorizationLetter, Document } from "@/features/id-card/id-card.types";

interface TimelineEvent {
  id: string;
  type: "medical" | "authorization" | "policy";
  date: string;
  title: string;
  description: string;
  status?: string;
  relatedTo?: string;
  category?: string;
}

interface TimelineViewProps {
  medicalDocuments: MedicalDocument[];
  authorizations: AuthorizationLetter[];
  policyDocuments: Document[];
  onViewDocument: (id: string, type: string) => void;
  onDownloadDocument: (id: string, name: string, type: string) => void;
}

export default function TimelineView({
  medicalDocuments,
  authorizations,
  policyDocuments,
  onViewDocument,
  onDownloadDocument,
}: TimelineViewProps) {
  // Combine all events and sort by date
  const events: TimelineEvent[] = [
    ...medicalDocuments.map((doc) => ({
      id: doc.id,
      type: "medical" as const,
      date: doc.date,
      title: doc.name,
      description: doc.type,
      relatedTo: doc.relatedTo,
    })),
    ...authorizations.map((auth) => ({
      id: auth.id,
      type: "authorization" as const,
      date: auth.effectiveDate,
      title: auth.serviceType,
      description: auth.provider,
      status: auth.status,
    })),
    ...policyDocuments.map((doc) => ({
      id: doc.id,
      type: "policy" as const,
      date: doc.uploadedAt,
      title: doc.name,
      description: doc.category,
      category: doc.category,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getEventIcon = (type: string) => {
    switch (type) {
      case "medical":
        return FileText;
      case "authorization":
        return CheckCircle;
      case "policy":
        return FileText;
      default:
        return FileText;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "medical":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "authorization":
        return "bg-green-50 text-green-600 border-green-200";
      case "policy":
        return "bg-purple-50 text-purple-600 border-purple-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusColor = (status?: string) => {
    if (!status) return "text-gray-600";
    switch (status.toLowerCase()) {
      case "approved":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "expired":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-gray-900">Timeline View</h2>
        </div>
        <p className="text-[14px] text-gray-600 mt-0.5">
          Chronological history of all documents and authorizations
        </p>
      </div>

      {/* Timeline */}
      <div className="px-6 py-6">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-gray-200" />

          {/* Events */}
          <div className="space-y-6">
            {events.map((event, index) => {
              const Icon = getEventIcon(event.type);
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative pl-14"
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "absolute left-0 w-12 h-12 rounded-xl flex items-center justify-center border-2 shadow-sm",
                      getEventColor(event.type)
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            className={cn(
                              "text-[11px] font-semibold uppercase",
                              event.type === "medical" && "bg-blue-100 text-blue-700 border-blue-200",
                              event.type === "authorization" && "bg-green-100 text-green-700 border-green-200",
                              event.type === "policy" && "bg-purple-100 text-purple-700 border-purple-200"
                            )}
                          >
                            {event.type}
                          </Badge>
                          <span className="text-[13px] text-gray-500">
                            {new Date(event.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        
                        <h4 className="text-[15px] font-semibold text-gray-900 mb-1">
                          {event.title}
                        </h4>
                        
                        <p className="text-[14px] text-gray-600">
                          {event.description}
                        </p>

                        {event.relatedTo && (
                          <p className="text-[13px] text-gray-500 mt-1">
                            Related to: {event.relatedTo}
                          </p>
                        )}

                        {event.status && (
                          <div className="mt-2">
                            <span className={cn("text-[13px] font-medium", getStatusColor(event.status))}>
                              Status: {event.status}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => onViewDocument(event.id, event.type)}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => onDownloadDocument(event.id, event.title, event.type)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-[15px] text-gray-500">No events in timeline</p>
          </div>
        )}
      </div>
    </div>
  );
}
