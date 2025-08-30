/**
 * نوار ابزار دیتاگراید (Toolbar)
 *
 * کنترل‌های سطح بالا برای کار با گرید:
 * - جستجو، تغییر حالت نمایش (table/cards)
 * - مدیریت نمایش ستون‌ها
 * - فیلترها: وضعیت موجودی، دسته‌بندی
 * - گروه‌بندی بر اساس فیلدهای داده
 * - اندازه صفحه (page size)
 */
"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EyeIcon, GridIcon, ListIcon, SlidersHorizontalIcon } from "lucide-react"
import { DataItem } from "@/components/datagrid/types"
import { columns } from "@/components/datagrid/columns"
import { useRTLContext } from "@/components/rtl-provider"

export interface ToolbarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  viewMode: "table" | "cards"
  onToggleView: () => void
  visibleColumns: Set<keyof DataItem>
  onToggleColumn: (column: keyof DataItem) => void
  categoryFilter: string
  onCategoryFilterChange: (value: string) => void
  stockFilter: string
  onStockFilterChange: (value: string) => void
  categories: string[]
  groupBy: keyof DataItem | null
  onGroupByChange: (value: keyof DataItem | null) => void
  pageSize: number
  onPageSizeChange: (value: number) => void
}

export const Toolbar: React.FC<ToolbarProps> = ({
  searchTerm,
  onSearchChange,
  viewMode,
  onToggleView,
  visibleColumns,
  onToggleColumn,
  categoryFilter,
  onCategoryFilterChange,
  stockFilter,
  onStockFilterChange,
  categories,
  groupBy,
  onGroupByChange,
  pageSize,
  onPageSizeChange,
}) => {
  const { isRTL } = useRTLContext()
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 min-w-0">
          <Input
            placeholder={isRTL ? "جستجو در محصولات..." : "Search products..."}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 glass h-10"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="outline" size="icon" onClick={onToggleView} className="glass bg-transparent h-10 w-10 lg:hidden">
            {viewMode === "table" ? <GridIcon className="h-4 w-4" /> : <ListIcon className="h-4 w-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="glass bg-transparent h-10 px-3">
                <EyeIcon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{isRTL ? 'ستون‌ها' : 'Columns'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-card" align="end">
              {columns.map((column) => (
                <DropdownMenuCheckboxItem key={column.key} checked={visibleColumns.has(column.key)} onCheckedChange={() => onToggleColumn(column.key)}>
                  {isRTL ? column.labelFa : column.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="glass bg-transparent h-10 px-3">
                <SlidersHorizontalIcon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{isRTL ? 'فیلترها' : 'Filters'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-card" align="end">
              <DropdownMenuCheckboxItem checked={stockFilter === "all"} onCheckedChange={() => onStockFilterChange("all")}>
                {isRTL ? 'همه وضعیت‌ها' : 'All Stock Status'}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={stockFilter === "inStock"} onCheckedChange={() => onStockFilterChange("inStock")}>
                {isRTL ? 'موجود' : 'In Stock'}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={stockFilter === "outOfStock"} onCheckedChange={() => onStockFilterChange("outOfStock")}>
                {isRTL ? 'ناموجود' : 'Out of Stock'}
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
          <SelectTrigger className="glass h-10">
            <SelectValue placeholder={isRTL ? "همه دسته‌ها" : "All Categories"} />
          </SelectTrigger>
          <SelectContent className="glass-card">
            <SelectItem value="all">{isRTL ? "همه دسته‌ها" : "All Categories"}</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={(groupBy || "none") as string} onValueChange={(value) => onGroupByChange(value === "none" ? null : (value as keyof DataItem))}>
          <SelectTrigger className="glass h-10">
            <SelectValue placeholder={isRTL ? "گروه‌بندی" : "Group By"} />
          </SelectTrigger>
          <SelectContent className="glass-card">
            <SelectItem value="none">{isRTL ? "بدون گروه‌بندی" : "No Grouping"}</SelectItem>
            <SelectItem value="category">{isRTL ? "دسته‌بندی" : "Category"}</SelectItem>
            <SelectItem value="inStock">{isRTL ? "وضعیت موجودی" : "Stock Status"}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={String(pageSize)} onValueChange={(value) => onPageSizeChange(Number(value))}>
          <SelectTrigger className="glass h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="glass-card">
            <SelectItem value="5">{isRTL ? "۵ در صفحه" : "5 per page"}</SelectItem>
            <SelectItem value="10">{isRTL ? "۱۰ در صفحه" : "10 per page"}</SelectItem>
            <SelectItem value="20">{isRTL ? "۲۰ در صفحه" : "20 per page"}</SelectItem>
            <SelectItem value="50">{isRTL ? "۵۰ در صفحه" : "50 per page"}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}


