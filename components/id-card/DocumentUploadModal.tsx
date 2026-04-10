"use client";

import { useState, useCallback } from "react";
import { X, Upload, File, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[], category: string, relatedTo?: string) => Promise<void>;
}

type DocumentCategory = "Medical Report" | "Lab Report" | "Prescription" | "Authorization" | "Other";

export default function DocumentUploadModal({
  isOpen,
  onClose,
  onUpload,
}: DocumentUploadModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [category, setCategory] = useState<DocumentCategory>("Medical Report");
  const [relatedTo, setRelatedTo] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");

  const categories: DocumentCategory[] = [
    "Medical Report",
    "Lab Report",
    "Prescription",
    "Authorization",
    "Other",
  ];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "application/pdf" || file.type.startsWith("image/")
    );
    
    setFiles((prev) => [...prev, ...droppedFiles]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    setUploadStatus("idle");
    
    try {
      await onUpload(files, category, relatedTo || undefined);
      setUploadStatus("success");
      
      // Reset after success
      setTimeout(() => {
        setFiles([]);
        setRelatedTo("");
        setUploadStatus("idle");
        onClose();
      }, 2000);
    } catch (error) {
      setUploadStatus("error");
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setFiles([]);
    setRelatedTo("");
    setCategory("Medical Report");
    setUploadStatus("idle");
    onClose();
  };

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
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-2xl shadow-2xl z-50 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Upload Documents
                </h3>
                <p className="text-[14px] text-gray-600 mt-0.5">
                  Upload medical documents, prescriptions, or lab reports
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6 space-y-6">
              {/* Drag & Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "border-2 border-dashed rounded-xl p-8 text-center transition-all",
                  isDragging
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : "border-gray-300 hover:border-primary/50"
                )}
              >
                <Upload className={cn(
                  "w-12 h-12 mx-auto mb-4",
                  isDragging ? "text-primary" : "text-gray-400"
                )} />
                <h4 className="text-[15px] font-semibold text-gray-900 mb-2">
                  Drag and drop files here
                </h4>
                <p className="text-[14px] text-gray-600 mb-4">
                  or click to browse from your device
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="secondary" size="sm" className="cursor-pointer">
                    Browse Files
                  </Button>
                </label>
                <p className="text-[12px] text-gray-500 mt-3">
                  Supported formats: PDF, JPG, PNG (Max 10MB per file)
                </p>
              </div>

              {/* Selected Files */}
              {files.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[14px] font-semibold text-gray-700">
                    Selected Files ({files.length})
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <File className="w-5 h-5 text-primary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium text-gray-900 truncate">
                            {file.name}
                          </p>
                          <p className="text-[12px] text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Selection */}
              <div>
                <label className="block text-[14px] font-semibold text-gray-700 mb-2">
                  Document Category *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={cn(
                        "px-4 py-2.5 rounded-lg text-[14px] font-medium transition-all border-2",
                        category === cat
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:border-primary/50"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Related To */}
              <div>
                <label
                  htmlFor="relatedTo"
                  className="block text-[14px] font-semibold text-gray-700 mb-2"
                >
                  Related To (Optional)
                </label>
                <input
                  type="text"
                  id="relatedTo"
                  value={relatedTo}
                  onChange={(e) => setRelatedTo(e.target.value)}
                  placeholder="e.g., Claim #CLM-2024-789"
                  className="input"
                />
                <p className="text-[12px] text-gray-500 mt-1">
                  Link this document to a specific claim or case
                </p>
              </div>

              {/* Status Messages */}
              {uploadStatus === "success" && (
                <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-[14px] font-medium">
                    Documents uploaded successfully!
                  </p>
                </div>
              )}

              {uploadStatus === "error" && (
                <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-[14px] font-medium">
                    Upload failed. Please try again.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <Button variant="secondary" onClick={handleClose} disabled={isUploading}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleUpload}
                disabled={files.length === 0 || isUploading}
                isLoading={isUploading}
              >
                <Upload className="w-4 h-4 mr-1.5" />
                Upload {files.length > 0 && `(${files.length})`}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
