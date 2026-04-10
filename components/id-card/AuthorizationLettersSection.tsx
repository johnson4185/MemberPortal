"use client";

import { Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import type { AuthorizationLetter } from "@/features/id-card/id-card.types";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui";

interface AuthorizationLettersSectionProps {
  authorizations: AuthorizationLetter[];
  onViewAuthorization?: (authorizationId: string) => void;
  onDownloadAuthorization: (authorizationId: string, authNumber: string) => void;
}

const statusColors: Record<string, string> = {
  "Approved": "text-green-600",
  "Pending": "text-yellow-600",
  "Expired": "text-red-600",
  "Rejected": "text-gray-600",
};

export default function AuthorizationLettersSection({
  authorizations,
  onViewAuthorization,
  onDownloadAuthorization,
}: AuthorizationLettersSectionProps) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Authorization Letters
        </h2>
        <p className="text-[14px] text-gray-600 mt-0.5">
          Pre-approved medical services and treatments
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                Authorization #
              </th>
              <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                Service Type
              </th>
              <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                Provider
              </th>
              <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                Effective Date
              </th>
              <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-2.5 text-right text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {authorizations.map((auth, index) => (
              <motion.tr
                key={auth.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-5 py-3 text-[15px] font-medium text-gray-900">
                  {auth.authNumber}
                </td>
                <td className="px-5 py-3 text-[14px] text-gray-600">
                  {auth.serviceType}
                </td>
                <td className="px-5 py-3 text-[14px] text-gray-600">
                  {auth.provider}
                </td>
                <td className="px-5 py-3 text-[14px] text-gray-600">
                  {new Date(auth.effectiveDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-5 py-3 text-[14px] text-gray-600">
                  {new Date(auth.expiryDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-5 py-3">
                  <Badge
                    className={cn(
                      "bg-gray-50 border border-gray-200 text-[12px] font-medium",
                      statusColors[auth.status] || statusColors["Pending"]
                    )}
                  >
                    {auth.status}
                  </Badge>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {onViewAuthorization && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onViewAuthorization(auth.id)}
                      >
                        <ExternalLink className="w-4 h-4 mr-1.5" />
                        View
                      </Button>
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onDownloadAuthorization(auth.id, auth.authNumber)}
                    >
                      <Download className="w-4 h-4 mr-1.5" />
                      Download
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {authorizations.length === 0 && (
        <div className="px-5 py-8 text-center">
          <p className="text-[15px] text-gray-500">
            No authorization letters found
          </p>
        </div>
      )}
    </div>
  );
}
