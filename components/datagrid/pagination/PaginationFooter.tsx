"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { useRTLContext } from "@/components/rtl-provider"

export interface PaginationFooterProps {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
  onPrev: () => void
  onNext: () => void
  onGoToPage: (page: number) => void
}

export const PaginationFooter: React.FC<PaginationFooterProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPrev,
  onNext,
  onGoToPage,
}) => {
  const { isRTL } = useRTLContext()
  
  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground text-center lg:text-left order-2 lg:order-1">
          {isRTL ? (
            <>
              نمایش {(currentPage - 1) * pageSize + 1} تا {Math.min(currentPage * pageSize, totalItems)} از {totalItems} نتیجه
            </>
          ) : (
            <>
              Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalItems)} of {totalItems} results
            </>
          )}
        </div>
        <div className="flex items-center gap-2 order-1 lg:order-2">
          <Button variant="outline" size="sm" onClick={onPrev} disabled={currentPage === 1} className="glass h-9 px-3">
            <span className="hidden sm:inline">
              {isRTL ? "قبلی" : "Previous"}
            </span>
            <span className="sm:hidden">
              {isRTL ? "قبلی" : "Prev"}
            </span>
          </Button>
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1
              return (
                <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => onGoToPage(page)} className="glass w-9 h-9">
                  {page}
                </Button>
              )
            })}
          </div>
          <Button variant="outline" size="sm" onClick={onNext} disabled={currentPage === totalPages} className="glass h-9 px-3">
            <span className="hidden sm:inline">
              {isRTL ? "بعدی" : "Next"}
            </span>
            <span className="sm:hidden">
              {isRTL ? "بعدی" : "Next"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}


