"use client";

import { X, Download, Printer, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui";

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentName: string;
  documentType: string;
  documentDate: string;
  documentUrl?: string;
  onDownload: () => void;
  onPrint?: () => void;
  onShare?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  currentIndex?: number;
  totalDocuments?: number;
}

export default function DocumentPreviewModal({
  isOpen,
  onClose,
  documentName,
  documentType,
  documentDate,
  documentUrl,
  onDownload,
  onPrint,
  onShare,
  onNext,
  onPrevious,
  currentIndex,
  totalDocuments,
}: DocumentPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {documentName}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[13px] text-gray-600">{documentType}</span>
                  <span className="text-[13px] text-gray-400">•</span>
                  <span className="text-[13px] text-gray-600">{documentDate}</span>
                  {currentIndex !== undefined && totalDocuments !== undefined && (
                    <>
                      <span className="text-[13px] text-gray-400">•</span>
                      <span className="text-[13px] text-gray-600">
                        {currentIndex + 1} of {totalDocuments}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                {/* Navigation */}
                {onPrevious && currentIndex !== undefined && currentIndex > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onPrevious}
                    title="Previous Document"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                )}
                {onNext && currentIndex !== undefined && totalDocuments !== undefined && currentIndex < totalDocuments - 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onNext}
                    title="Next Document"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                )}

                {/* Actions */}
                <div className="h-6 w-px bg-gray-300 mx-1" />
                
                {onShare && (
                  <Button variant="ghost" size="sm" onClick={onShare}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                )}
                {onPrint && (
                  <Button variant="ghost" size="sm" onClick={onPrint}>
                    <Printer className="w-4 h-4" />
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={onDownload}>
                  <Download className="w-4 h-4" />
                </Button>
                
                <div className="h-6 w-px bg-gray-300 mx-1" />
                
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-auto bg-gray-100 p-6">
              <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg min-h-full">
                {documentUrl ? (
                  <iframe
                    src={documentUrl}
                    className="w-full h-full min-h-[600px]"
                    title={documentName}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-12 text-center min-h-[600px]">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      Document Preview
                    </h4>
                    <p className="text-[15px] text-gray-600 mb-4">
                      Preview is loading for {documentName}
                    </p>
                    <p className="text-[13px] text-gray-500">
                      This is a mock preview in development mode
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
              <div className="text-[13px] text-gray-600">
                Use arrow keys to navigate between documents
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={onClose}>
                  Close
                </Button>
                <Button variant="primary" size="sm" onClick={onDownload}>
                  <Download className="w-4 h-4 mr-1.5" />
                  Download
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
