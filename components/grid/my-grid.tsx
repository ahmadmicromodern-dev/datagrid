"use client"

import { useState, useEffect, useMemo } from "react"
import type { Product } from "@/models/product"
import type { GridState, FilterDescriptor } from "@/models/grid-state"
import { type IDataService, LocalDataService } from "@/services/data-service"
import { GridToolbar } from "./grid-toolbar"
import { GridHeader } from "./grid-header"
import { GridRow } from "./grid-row"
import { GridPager } from "./grid-pager"
import { FilterOperator } from "@/enums/filter-operator"

interface MyGridProps {
  data: Product[]
  dataService?: IDataService
}

export function MyGrid({ data, dataService }: MyGridProps) {
  const [gridState, setGridState] = useState<GridState>({
    currentPage: 1,
    pageSize: 25,
    totalItems: 0,
    sortColumn: null,
    sortDirection: null,
    filters: [],
    groupBy: null,
    selectedItems: [],
    viewMode: "table",
  })

  const [products, setProducts] = useState<Product[]>([])
  const [searchValue, setSearchValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const service = useMemo(() => dataService || new LocalDataService(data), [data, dataService])

  useEffect(() => {
    loadData()
  }, [
    gridState.currentPage,
    gridState.pageSize,
    gridState.sortColumn,
    gridState.sortDirection,
    gridState.filters,
    gridState.groupBy,
  ])

  useEffect(() => {
    const searchFilters: FilterDescriptor[] = searchValue
      ? [
          {
            field: "productName",
            operator: FilterOperator.Contains,
            value: searchValue,
          },
        ]
      : []

    setGridState((prev) => ({
      ...prev,
      filters: searchFilters,
      currentPage: 1,
    }))
  }, [searchValue])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const result = await service.getData(gridState)
      setProducts(result.data)
      setGridState((prev) => ({ ...prev, totalItems: result.total }))
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSort = (column: string) => {
    setGridState((prev) => ({
      ...prev,
      sortColumn: column,
      sortDirection: prev.sortColumn === column && prev.sortDirection === "asc" ? "desc" : "asc",
      currentPage: 1,
    }))
  }

  const handlePageChange = (page: number) => {
    setGridState((prev) => ({ ...prev, currentPage: page }))
  }

  const handlePageSizeChange = (pageSize: number) => {
    setGridState((prev) => ({ ...prev, pageSize, currentPage: 1 }))
  }

  const handleSelectItem = (id: string) => {
    setGridState((prev) => ({
      ...prev,
      selectedItems: prev.selectedItems.includes(id)
        ? prev.selectedItems.filter((item) => item !== id)
        : [...prev.selectedItems, id],
    }))
  }

  const handleSelectAll = () => {
    setGridState((prev) => ({
      ...prev,
      selectedItems: prev.selectedItems.length === products.length ? [] : products.map((p) => p.id),
    }))
  }

  const handleAddProduct = () => {
    console.log("Add product")
  }

  const handleExport = () => {
    console.log("Export data")
  }

  const handleImport = () => {
    console.log("Import data")
  }

  const handleSettings = () => {
    console.log("Settings")
  }

  const totalPages = Math.ceil(gridState.totalItems / gridState.pageSize)

  return (
    <div className="w-full bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg">
      <GridToolbar
        onAddProduct={handleAddProduct}
        onExport={handleExport}
        onImport={handleImport}
        onSettings={handleSettings}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      <div className="overflow-x-auto">
        <table className="w-full">
          <GridHeader
            sortColumn={gridState.sortColumn}
            sortDirection={gridState.sortDirection}
            onSort={handleSort}
            selectedItems={gridState.selectedItems}
            totalItems={products.length}
            onSelectAll={handleSelectAll}
          />
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-muted-foreground">
                  Loading...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-muted-foreground">
                  No data available
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <GridRow
                  key={product.id}
                  product={product}
                  isSelected={gridState.selectedItems.includes(product.id)}
                  onSelect={() => handleSelectItem(product.id)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <GridPager
        currentPage={gridState.currentPage}
        totalPages={totalPages}
        pageSize={gridState.pageSize}
        totalItems={gridState.totalItems}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  )
}
