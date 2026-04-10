"use client";

import { Download, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import type { Document } from "@/features/id-card/id-card.types";

interface DocumentsSectionProps {
  documents: Document[];
  onViewDocument?: (docId: string) => void;
  onDownloadDocument: (docId: string, docName: string) => void;
}

export function DocumentsSection({ documents, onViewDocument, onDownloadDocument }: DocumentsSectionProps) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="px-5 py-3 border-b border-border">
        <h2 className="text-xl font-semibold text-gray-900">Policy Documents</h2>
        <p className="text-[14px] text-gray-600 mt-0.5">Important insurance documents and forms</p>
      </div>
      <div className="divide-y divide-border">
        {documents.map((doc) => (
          <div key={doc.id} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0 shadow-sm border border-rose-100">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[15px] font-semibold text-gray-900">{doc.name}</div>
                <div className="text-[13px] text-gray-600 mt-0.5">
                  {doc.category} · {doc.size} · Uploaded {formatDate(doc.uploadedAt, "long")}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
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
          </div>
        ))}
      </div>
      {documents.length === 0 && (
        <div className="px-5 py-8 text-center">
          <p className="text-[15px] text-gray-500">
            No policy documents found
          </p>
        </div>
      )}
    </div>
  );
}
