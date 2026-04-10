"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  const visiblePages = pages.filter((page) => {
    if (totalPages <= 7) return true;
    if (page === 1 || page === totalPages) return true;
    if (page >= currentPage - 1 && page <= currentPage + 1) return true;
    return false;
  });
  
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };
  
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <motion.button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
        className="p-2 rounded-lg border border-border hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-text-primary"
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>
      
      {visiblePages.map((page, index) => {
        const prevPage = visiblePages[index - 1];
        const showEllipsis = prevPage && page - prevPage > 1;
        
        return (
          <div key={page} className="flex items-center gap-2">
            {showEllipsis && <span className="text-text-secondary">...</span>}
            <motion.button
              onClick={() => onPageChange(page)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-4 py-2 rounded-lg border transition-colors",
                currentPage === page
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "border-border hover:bg-background text-text-primary"
              )}
            >
              {page}
            </motion.button>
          </div>
        );
      })}
      
      <motion.button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
        className="p-2 rounded-lg border border-border hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-text-primary"
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
