/**
 * بدنه جدول (TableBody)
 *
 * مسئول رندر ردیف‌ها بر اساس داده صفحه‌بندی‌شده و گروه‌بندی است:
 * - نمایش گروه‌ها در صورت فعال بودن `groupBy`
 * - رندر سلول‌ها با کامپوننت `Cell`
 * - اکشن‌های هر ردیف از طریق `ActionDropdown` (ویرایش/کپی/حذف)
 * - انتخاب ردیف با Checkbox و `onSelectItem`
 */
"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ActionDropdown } from "@/components/datagrid/ActionDropdown"
import { Cell as DataGridCell } from "@/components/datagrid/cells/Cell"
import { DataItem, ColumnKey } from "@/components/datagrid/types"
import { useRTLContext } from "@/components/rtl-provider"

export interface TableBodyProps {
  paginatedData: Record<string, DataItem[]>
  groupBy: keyof DataItem | null
  visibleColumns: Set<keyof DataItem>
  columnOrder: ColumnKey[]
  columnWidths: Record<ColumnKey, number>
  selectedItems: Set<number>
  onSelectItem: (id: number, checked: boolean) => void
  onEdit: (item: DataItem, triggerRef?: HTMLButtonElement) => void
  onDuplicate: (item: DataItem) => void
  onDelete: (id: number) => void
  sparkDataProvider: (seed: number, base: number) => { value: number }[]
}

export const TableBody: React.FC<TableBodyProps> = ({
  paginatedData,
  groupBy,
  visibleColumns,
  columnOrder,
  columnWidths,
  selectedItems,
  onSelectItem,
  onEdit,
  onDuplicate,
  onDelete,
  sparkDataProvider,
}) => {
  const { isRTL } = useRTLContext()
  
  // تابع ترجمه برچسب‌های گروه‌بندی
  const getGroupLabel = (groupBy: keyof DataItem, groupKey: string) => {
    if (groupBy === "inStock") {
      return groupKey === "true" 
        ? (isRTL ? "موجود" : "In Stock")
        : (isRTL ? "ناموجود" : "Out of Stock")
    }
    if (groupBy === "discontinued") {
      return groupKey === "true"
        ? (isRTL ? "متوقف شده" : "Discontinued")
        : (isRTL ? "فعال" : "Active")
    }
    if (groupBy === "category") {
      return groupKey // دسته‌بندی‌ها معمولاً نام‌های فارسی دارند
    }
    return groupKey
  }
  
  return (
    <tbody>
      {Object.entries(paginatedData).map(([groupKey, items]) => (
        <React.Fragment key={groupKey}>
          {groupBy && groupKey !== "ungrouped" && (
            <tr>
              <td colSpan={visibleColumns.size + 2} className="p-4 bg-muted/10">
                <div className="font-semibold text-primary">
                  {getGroupLabel(groupBy, groupKey)}
                  <Badge variant="secondary" className="ml-2 glass">
                    {items.length} {isRTL ? "آیتم" : "items"}
                  </Badge>
                </div>
              </td>
            </tr>
          )}
          {items.map((item) => (
            <tr key={item.id} className="border-b border-border/30 hover:bg-muted/10 transition-colors">
              <td className="p-4">
                <Checkbox
                  checked={selectedItems.has(item.id)}
                  onCheckedChange={(checked) => onSelectItem(item.id, checked as boolean)}
                  aria-label={isRTL ? `انتخاب ${item.productName}` : `Select ${item.productName}`}
                  className="glass"
                />
              </td>
              {columnOrder
                .filter((key) => visibleColumns.has(key))
                .map((key) => (
                  <td key={key as string} className="p-4" style={{ width: columnWidths[key], minWidth: columnWidths[key] }}>
                    <DataGridCell item={item} column={key} sparkDataProvider={sparkDataProvider} />
                  </td>
                ))}
              <td className="p-4">
                <ActionDropdown item={item} onEdit={onEdit} onDuplicate={onDuplicate} onDelete={onDelete} />
              </td>
            </tr>
          ))}
        </React.Fragment>
      ))}
    </tbody>
  )
}


