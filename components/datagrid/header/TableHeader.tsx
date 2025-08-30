/**
 * سرستون‌های جدول (TableHeader)
 *
 * وظایف کلیدی:
 * - انتخاب همه ردیف‌ها با Checkbox اول
 * - مرتب‌سازی ستون‌ها با کلیک روی سرستون
 * - جابه‌جایی ترتیب ستون‌ها با درگ‌ودیراپ
 * - تغییر اندازه عرض ستون‌ها با درگ‌کردن هندل راست
 */
"use client"

import React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { GripVerticalIcon, ChevronUpIcon, ChevronDownIcon } from "lucide-react"
import { columns } from "@/components/datagrid/columns"
import { DataItem, ColumnKey } from "@/components/datagrid/types"
import { useRTLContext } from "@/components/rtl-provider"

export interface TableHeaderProps {
  visibleColumns: Set<keyof DataItem>
  columnOrder: ColumnKey[]
  columnWidths: Record<ColumnKey, number>
  sortConfig: { key: keyof DataItem; direction: "asc" | "desc" | null }
  onHandleSort: (key: keyof DataItem) => void
  onHandleDragStart: (key: ColumnKey) => (e: React.DragEvent) => void
  onHandleDragOver: (e: React.DragEvent) => void
  onHandleDrop: (targetKey: ColumnKey) => (e: React.DragEvent) => void
  onHandleResizeMouseDown: (key: ColumnKey) => (e: React.MouseEvent) => void
  allSelected: boolean
  onSelectAll: (checked: boolean) => void
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  visibleColumns,
  columnOrder,
  columnWidths,
  sortConfig,
  onHandleSort,
  onHandleDragStart,
  onHandleDragOver,
  onHandleDrop,
  onHandleResizeMouseDown,
  allSelected,
  onSelectAll,
}) => {
  const { isRTL } = useRTLContext()
  
  return (
    <thead>
      <tr className="border-b border-border/50">
        <th className="w-12 p-4">
          <Checkbox 
            checked={allSelected} 
            onCheckedChange={onSelectAll} 
            aria-label={isRTL ? "انتخاب همه" : "Select all"} 
            className="glass" 
          />
        </th>
        {columnOrder
          .filter((key) => visibleColumns.has(key))
          .map((key) => {
            const column = columns.find((c) => c.key === key)!
            const width = columnWidths[key]
            return (
              <th
                key={key as string}
                draggable
                onDragStart={onHandleDragStart(key)}
                onDragOver={onHandleDragOver}
                onDrop={onHandleDrop(key)}
                className={`relative text-left p-4 font-semibold hover:bg-muted/20 transition-colors select-none`}
                style={{ width, minWidth: width }}
                onClick={() => onHandleSort(key)}
              >
                <div className="flex items-center gap-2">
                  <GripVerticalIcon className="h-4 w-4 text-muted-foreground cursor-move" />
                  {isRTL ? column.labelFa : column.label}
                  {sortConfig.key === key && (sortConfig.direction === "asc" ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />)}
                </div>
                <div
                  onMouseDown={onHandleResizeMouseDown(key)}
                  className="absolute right-0 top-0 h-full w-1 cursor-col-resize opacity-0 hover:opacity-100 bg-primary/20 transition-opacity"
                  aria-hidden
                />
              </th>
            )
          })}
        <th className="w-16 p-4">
          {isRTL ? "عملیات" : "Actions"}
        </th>
      </tr>
    </thead>
  )
}


