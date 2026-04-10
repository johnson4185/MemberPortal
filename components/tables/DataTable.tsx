"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Pagination from "../ui/Pagination";
import { Skeleton } from "../shared/LoadingSkeleton";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  cell?: (value: T[keyof T], row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  onRowClick?: (row: T) => void;
}

function DataTableComponent<T>({
  columns,
  data,
  isLoading,
  emptyMessage = "No data available",
  pagination,
  onRowClick,
}: DataTableProps<T>) {
  const renderCell = (column: Column<T>, row: T) => {
    if (typeof column.accessor === "function") {
      return column.accessor(row);
    }
    
    const value = row[column.accessor];
    
    if (column.cell) {
      return column.cell(value, row);
    }
    
    return value as React.ReactNode;
  };
  
  if (isLoading) {
    return (
      <div className="card">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12" />
          ))}
        </div>
      </div>
    );
  }
  
  if (data.length === 0) {
    return (
      <div className="card">
        <p className="text-center text-text-secondary py-8">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={cn(
                    "text-left text-[15px] font-semibold text-text-primary pb-3 px-4 first:pl-0 last:pr-0",
                    column.className
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rowIndex * 0.03, duration: 0.2 }}
                whileHover={onRowClick ? { backgroundColor: "rgba(0, 95, 141, 0.02)" } : {}}
                className={cn(
                  "border-b border-border/50 last:border-0",
                  onRowClick && "cursor-pointer transition-colors"
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={cn(
                      "py-4 px-4 text-[15px] text-text-primary first:pl-0 last:pr-0",
                      column.className
                    )}
                  >
                    {renderCell(column, row)}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  );
}

// Export with type assertion to allow generic usage
const DataTable = DataTableComponent as <T>(props: DataTableProps<T>) => React.ReactElement;
export default DataTable;
