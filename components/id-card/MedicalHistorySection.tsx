"use client";

import { ExternalLink, Download } from "lucide-react";
import { motion } from "framer-motion";
import type { MedicalDocument } from "@/features/id-card/id-card.types";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui";

interface MedicalHistorySectionProps {
  documents: MedicalDocument[];
  onViewDocument?: (documentId: string) => void;
  onDownloadDocument: (documentId: string, documentName: string) => void;
}

const typeColors: Record<string, string> = {
  "Lab Report": "text-blue-600",
  "Prescription": "text-purple-600",
  "Medical Report": "text-green-600",
  "Hospital": "text-orange-600",
  "Other": "text-gray-600",
};

export default function MedicalHistorySection({
  documents,
  onViewDocument,
  onDownloadDocument,
}: MedicalHistorySectionProps) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Medical History &amp; Documents
          </h2>
          <p className="text-[14px] text-gray-600 mt-0.5">
            Lab reports, prescriptions, and medical records
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                Document Name
              </th>
              <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                Related To
              </th>
              <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-5 py-2.5 text-right text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {documents.map((doc, index) => (
              <motion.tr
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-5 py-3 text-[15px] font-medium text-gray-900">
                  {doc.name}
                </td>
                <td className="px-5 py-3 text-[14px] text-gray-600">
                  {new Date(doc.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-5 py-3 text-[14px] text-gray-600">
                  {doc.relatedTo}
                </td>
                <td className="px-5 py-3">
                  <Badge
                    className={cn(
                      "bg-gray-50 border border-gray-200 text-[12px] font-medium",
                      typeColors[doc.type] || typeColors["Other"]
                    )}
                  >
                    {doc.type}
                  </Badge>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {onViewDocument && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onViewDocument(doc.id)}
                      >
                        <ExternalLink className="w-4 h-4 mr-1.5" />
                        View
                      </Button>
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onDownloadDocument(doc.id, doc.name)}
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

      {documents.length === 0 && (
        <div className="px-5 py-8 text-center">
          <p className="text-[15px] text-gray-500">
            No medical documents found
          </p>
        </div>
      )}
    </div>
  );
}
