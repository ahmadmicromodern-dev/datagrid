
/**
 * کامپوننت ModernDataGrid
 *
 * این فایل یک گرید مدرن با امکانات کامل ارائه می‌دهد:
 * - مرتب‌سازی، فیلتر، گروه‌بندی، صفحه‌بندی و جستجو
 * - ویرایش/افزودن/حذف ردیف‌ها با پاپ‌اورهای اختصاصی
 * - مدیریت ستون‌ها: نمایش/عدم نمایش، تغییر عرض، جابه‌جایی با درگ‌ودیراپ
 * - نمایش واکنش‌گرا: حالت جدول در دسکتاپ و کارت در موبایل
 * - سازگاری با تم‌های مختلف و حالت تاریک
 *
 * نکات مهم:
 * - داده‌ها و وضعیت‌ها به کمک useState در خود کامپوننت نگهداری می‌شوند
 * - منطق فیلتر/مرتب‌سازی/گروه‌بندی در هوک `useGridData` متمرکز شده است
 * - تعریف ستون‌ها در `components/datagrid/columns` نگهداری می‌شود
 * - سرستون‌ها در `TableHeader` و بدنه در `TableBody` رندر می‌شوند
 */
"use client"

import React, { useState, useMemo, useCallback, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Popover } from "@/components/ui/popover"
import { ChevronUpIcon, ChevronDownIcon, TrashIcon } from "lucide-react"

import { DataItem, ModernDataGridProps, SortConfig, ColumnKey } from "@/components/datagrid/types"
import { columns } from "@/components/datagrid/columns"
import { generateSparklineData, centerEditPopover } from "@/components/datagrid/utils"
import { ActionDropdown } from "@/components/datagrid/ActionDropdown"
import { Cell as DataGridCell } from "@/components/datagrid/cells/Cell"
import { TableHeader } from "@/components/datagrid/header/TableHeader"
import { TableBody } from "@/components/datagrid/body/TableBody"
import { MobileCard } from "@/components/datagrid/mobile/MobileCard"
import { Toolbar } from "@/components/datagrid/toolbar/Toolbar"
import { themes } from "@/components/datagrid/themes"
import { ThemePicker } from "@/components/datagrid/theme/ThemePicker"
import { PaginationFooter } from "@/components/datagrid/pagination/PaginationFooter"
import { AddProductPopover } from "@/components/datagrid/forms/AddProductPopover"
import { EditProductPopover } from "@/components/datagrid/forms/EditProductPopover"
import { useGridData } from "@/components/datagrid/hooks/useGridData"
import { useRTLContext } from "@/components/rtl-provider"

// themes moved to components/datagrid/themes

export function ModernDataGrid({
  data: initialData,
  currentTheme,
  isDarkMode,
  onThemeChange,
  onToggleTheme,
  lang,
  onLangChange,
}: ModernDataGridProps & {
  lang: 'fa' | 'en'
  onLangChange: (lang: 'fa' | 'en') => void
}) {
  const { isRTL } = useRTLContext()
  const [data, setData] = useState<DataItem[]>(initialData)
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set())
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<DataItem | null>(null)
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "id", direction: null })
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [stockFilter, setStockFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [groupBy, setGroupBy] = useState<keyof DataItem | null>(null)
  const [visibleColumns, setVisibleColumns] = useState<Set<keyof DataItem>>(
    new Set(["productName", "cost", "category", "inStock", "unitsInStock"]),
  )

  const [advancedFilters, setAdvancedFilters] = useState<{
    costMin: string
    costMax: string
    unitsMin: string
    unitsMax: string
    status: "all" | "active" | "discontinued"
  }>({ costMin: "", costMax: "", unitsMin: "", unitsMax: "", status: "all" })

  const [newProduct, setNewProduct] = useState({
    productName: "",
    cost: 0,
    discontinued: false,
    category: "",
    inStock: true,
    quantityPerUnit: "",
    unitsInStock: 0,
    reorderLevel: 0,
  })

  const [editProduct, setEditProduct] = useState<Partial<DataItem>>({})
  const [editTriggerRef, setEditTriggerRef] = useState<HTMLButtonElement | null>(null)

  // Sync internal data when the incoming dataset changes (e.g., language switch)
  useEffect(() => {
    setData(initialData)
    setSelectedItems(new Set())
    setCurrentPage(1)
  }, [initialData])

  const { categories, filteredAndSortedData, groupedData, paginatedData, totalPages } = useGridData({
    data,
    searchTerm,
    categoryFilter,
    stockFilter,
    advancedFilters,
    sortConfig,
    groupBy,
    currentPage,
    pageSize,
  })

  const handleSort = useCallback((key: keyof DataItem) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }))
  }, [])

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        const allIds = new Set(filteredAndSortedData.map((item) => item.id))
        setSelectedItems(allIds)
      } else {
        setSelectedItems(new Set())
      }
    },
    [filteredAndSortedData],
  )

  const handleSelectItem = useCallback((id: number, checked: boolean) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev)
      if (checked) {
        newSet.add(id)
      } else {
        newSet.delete(id)
      }
      return newSet
    })
  }, [])

  const handleEdit = useCallback((item: DataItem, triggerRef?: HTMLButtonElement) => {
    setEditingItem(item)
    setEditProduct(item)
    setEditTriggerRef(triggerRef || null)
    setIsEditDialogOpen(true)
  }, [])

  const handleDuplicate = useCallback(
    (item: DataItem) => {
      const newItem = {
        ...item,
        id: Math.max(...data.map((d) => d.id)) + 1,
        productName: `${item.productName} (Copy)`,
      }
      setData((prev) => [...prev, newItem])
    },
    [data],
  )

  const handleDelete = useCallback((id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id))
    setSelectedItems((prev) => {
      const newSet = new Set(prev)
      newSet.delete(id)
      return newSet
    })
  }, [])

  const handleDeleteSelected = useCallback(() => {
    setData((prev) => prev.filter((item) => !selectedItems.has(item.id)))
    setSelectedItems(new Set())
  }, [selectedItems])

  const handleAddProduct = useCallback(() => {
    if (!newProduct.productName.trim()) {
      alert("Product name is required")
      return
    }

    const newItem: DataItem = {
      ...newProduct,
      id: Math.max(0, ...data.map((d) => d.id)) + 1,
    }
    
    setData((prev) => [...prev, newItem])
    setNewProduct({
      productName: "",
      cost: 0,
      discontinued: false,
      category: "",
      inStock: true,
      quantityPerUnit: "",
      unitsInStock: 0,
      reorderLevel: 0,
    })
    setIsAddDialogOpen(false)
  }, [newProduct, data])

  const handleSaveEdit = useCallback(() => {
    if (editingItem && editProduct) {
      setData((prev) => prev.map((item) => (item.id === editingItem.id ? { ...item, ...editProduct } : item)))
      setIsEditDialogOpen(false)
      setEditingItem(null)
      setEditProduct({})
      setEditTriggerRef(null)
    }
  }, [editingItem, editProduct])

  const toggleColumnVisibility = useCallback((column: keyof DataItem) => {
    setVisibleColumns((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(column)) {
        newSet.delete(column)
      } else {
        newSet.add(column)
      }
      return newSet
    })
  }, [])

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== "undefined") {
      const checkMobile = () => setIsMobile(window.innerWidth < 1024)
      checkMobile()
      window.addEventListener("resize", checkMobile)
      return () => window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Update popover position when edit dialog opens
  useEffect(() => {
    if (isEditDialogOpen) {
      const updatePosition = () => centerEditPopover()
      
      // Update position after a short delay to ensure popover is rendered
      setTimeout(updatePosition, 50)
      
      // Also update on window resize
      const handleResize = () => setTimeout(updatePosition, 50)
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [isEditDialogOpen])

  // columns are imported from components/datagrid/columns

  const [columnOrder, setColumnOrder] = useState<ColumnKey[]>(columns.map((c) => c.key))
  const [columnWidths, setColumnWidths] = useState<Record<ColumnKey, number>>({
    id: 80,
    productName: 256,
    cost: 120,
    category: 160,
    inStock: 200,
    discontinued: 160,
    quantityPerUnit: 240,
    unitsInStock: 140,
    reorderLevel: 140,
  })
  const dragColRef = useRef<ColumnKey | null>(null)
  const resizingRef = useRef<{ key: ColumnKey; startX: number; startWidth: number } | null>(null)

  const handleDragStart = useCallback((key: ColumnKey) => (e: React.DragEvent) => {
    dragColRef.current = key
    e.dataTransfer.setData("text/plain", String(key))
    e.dataTransfer.effectAllowed = "move"
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }, [])

  const handleDrop = useCallback(
    (targetKey: ColumnKey) => (e: React.DragEvent) => {
      e.preventDefault()
      const sourceKey = (dragColRef.current || (e.dataTransfer.getData("text/plain") as ColumnKey)) as ColumnKey
      if (!sourceKey || sourceKey === targetKey) return
      setColumnOrder((prev) => {
        const next = [...prev]
        const from = next.indexOf(sourceKey)
        const to = next.indexOf(targetKey)
        if (from === -1 || to === -1) return prev
        next.splice(to, 0, next.splice(from, 1)[0])
        return next
      })
      dragColRef.current = null
    },
    [],
  )

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!resizingRef.current) return
    const { key, startX, startWidth } = resizingRef.current
    const delta = e.clientX - startX
    const newWidth = Math.max(96, startWidth + delta)
    setColumnWidths((prev) => ({ ...prev, [key]: newWidth }))
  }, [])

  const onMouseUp = useCallback(() => {
    if (!resizingRef.current) return
    resizingRef.current = null
    window.removeEventListener("mousemove", onMouseMove)
    window.removeEventListener("mouseup", onMouseUp)
  }, [onMouseMove])

  const handleResizeMouseDown = useCallback(
    (key: ColumnKey) => (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const startWidth = columnWidths[key] || 120
      resizingRef.current = { key, startX: e.clientX, startWidth }
      window.addEventListener("mousemove", onMouseMove)
      window.addEventListener("mouseup", onMouseUp)
    },
    [columnWidths, onMouseMove, onMouseUp],
  )

  const generateSparklineDataMemo = useCallback((seed: number, base: number) => generateSparklineData(seed, base), [])

  // ActionDropdown moved to components/datagrid/ActionDropdown

  // Cell rendering moved to components/datagrid/cells/Cell

  // mobile card moved to components/datagrid/mobile/MobileCard

  return (
    <div
      className={`p-3 sm:p-4 lg:p-6 ${isDarkMode ? "dark" : ""}`}
      style={{
        background:
          currentTheme !== "default"
            ? `linear-gradient(135deg, ${themes.find((t) => t.value === currentTheme)?.colors[0]}10, ${themes.find((t) => t.value === currentTheme)?.colors[1]}05)`
            : undefined,
      }}
    >
      <div className="max-w-full mx-auto space-y-4 lg:space-y-6">
        <ThemePicker currentTheme={currentTheme} onThemeChange={onThemeChange} />

        <div className="glass-card rounded-xl p-4 lg:p-6">
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between mb-4 lg:mb-6">
            <div className="text-center lg:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {isRTL ? 'دیتاگرید مدرن' : 'Modern DataGrid'}
              </h1>
              <p className="text-muted-foreground mt-1 text-sm lg:text-base">
                {isRTL ? 'مدیریت پیشرفته داده با طراحی شیشه‌ای' : 'Advanced data management with glassmorphism design'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <AddProductPopover
                open={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                newProduct={newProduct}
                setNewProduct={setNewProduct}
                onSubmit={handleAddProduct}
              />
              
              {/* دکمه تغییر زبان */}
              <button
                aria-label="Toggle language"
                onClick={() => onLangChange(lang === 'fa' ? 'en' : 'fa')}
                className="px-3 py-2 border border-border rounded-md text-sm font-medium hover:bg-muted transition-colors glass bg-transparent h-10"
                title={lang === 'fa' ? 'Switch to English' : 'تغییر به فارسی'}
              >
                {lang === 'fa' ? 'FA' : 'EN'}
              </button>
            </div>
          </div>

          <Popover open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            {isEditDialogOpen && (
              <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
                onClick={() => setIsEditDialogOpen(false)}
              />
            )}
            <EditProductPopover
              open={isEditDialogOpen}
              onOpenChange={setIsEditDialogOpen}
              editProduct={editProduct}
              setEditProduct={setEditProduct}
              onSave={handleSaveEdit}
            />
          </Popover>

          {selectedItems.size > 0 && (
            <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-sm font-medium">
                  {selectedItems.size} item{selectedItems.size !== 1 ? "s" : ""} selected
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteSelected}
                  className="glass w-full sm:w-auto"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          )}

          <Toolbar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            viewMode={viewMode}
            onToggleView={() => setViewMode(viewMode === "table" ? "cards" : "table")}
            visibleColumns={visibleColumns}
            onToggleColumn={toggleColumnVisibility}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            stockFilter={stockFilter}
            onStockFilterChange={setStockFilter}
            categories={categories}
            groupBy={groupBy}
            onGroupByChange={(value) => setGroupBy(value)}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />
        </div>

        {viewMode === "cards" ? (
          <div className="space-y-4">
            {Object.entries(paginatedData).map(([groupKey, items]) => (
              <div key={groupKey} className="space-y-3">
                {groupBy && groupKey !== "ungrouped" && (
                  <div className="glass-card rounded-lg p-3">
                    <div className="font-semibold text-primary flex items-center justify-between">
                      <span>
                        {groupBy === "inStock" ? (groupKey === "true" ? "In Stock" : "Out of Stock") : groupKey}
                      </span>
                      <Badge variant="secondary" className="glass">
                        {items.length} items
                      </Badge>
                    </div>
                  </div>
                )}
                <div className="grid gap-3">
                  {items.map((item) => (
                    <MobileCard
                      key={item.id}
                      item={item}
                      selected={selectedItems.has(item.id)}
                      onSelect={handleSelectItem}
                      onEdit={handleEdit}
                      onDuplicate={handleDuplicate}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto" style={{ overflow: 'visible' }}>
              <div className="min-w-[800px]">
                <table className="w-full">
                  <TableHeader
                    visibleColumns={visibleColumns}
                    columnOrder={columnOrder}
                    columnWidths={columnWidths}
                    sortConfig={sortConfig}
                    onHandleSort={handleSort}
                    onHandleDragStart={handleDragStart}
                    onHandleDragOver={handleDragOver}
                    onHandleDrop={handleDrop}
                    onHandleResizeMouseDown={handleResizeMouseDown}
                    allSelected={selectedItems.size === filteredAndSortedData.length}
                    onSelectAll={handleSelectAll}
                  />
                  <TableBody
                    paginatedData={paginatedData}
                    groupBy={groupBy}
                    visibleColumns={visibleColumns}
                    columnOrder={columnOrder}
                    columnWidths={columnWidths}
                    selectedItems={selectedItems}
                    onSelectItem={handleSelectItem}
                    onEdit={handleEdit}
                    onDuplicate={handleDuplicate}
                    onDelete={handleDelete}
                    sparkDataProvider={generateSparklineDataMemo}
                  />
                </table>
              </div>
            </div>
          </Card>
        )}

        {!groupBy && (
          <PaginationFooter
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={filteredAndSortedData.length}
            onPrev={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            onNext={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            onGoToPage={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  )
}