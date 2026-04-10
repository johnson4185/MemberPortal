"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Upload, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onFilesChange: (files: File[]) => void;
  error?: string;
}

export default function FileUpload({
  label,
  accept,
  multiple = false,
  maxSize = 5,
  onFilesChange,
  error,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    
    const newFiles = Array.from(fileList).filter((file) => {
      const sizeMB = file.size / (1024 * 1024);
      return sizeMB <= maxSize;
    });
    
    const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };
  
  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[15px] font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-4 transition-colors",
          dragActive
            ? "border-primary bg-blue-50"
            : "border-gray-300 hover:border-gray-400",
          error && "border-danger"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
        />
        
        <div className="text-center">
          <Upload className="mx-auto h-10 w-10 text-gray-400" />
          <div className="mt-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-primary hover:text-primary-dark font-medium text-[14px]"
            >
              Click to upload
            </button>
            <span className="text-gray-600 text-[14px]"> or drag and drop</span>
          </div>
          <p className="mt-1 text-[13px] text-gray-500">
            {accept || "All files"} up to {maxSize}MB
          </p>
        </div>
      </div>
      
      {error && <p className="mt-2 text-[15px] text-danger">{error}</p>}
      
      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-[15px] font-medium text-gray-900">{file.name}</p>
                  <p className="text-[14px] text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-gray-400 hover:text-danger transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
