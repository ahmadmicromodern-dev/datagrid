import { useMemo } from "react"
import { DataItem, SortConfig } from "@/components/datagrid/types"

export interface UseGridDataParams {
  data: DataItem[]
  searchTerm: string
  categoryFilter: string
  stockFilter: string
  advancedFilters: {
    costMin: string
    costMax: string
    unitsMin: string
    unitsMax: string
    status: "all" | "active" | "discontinued"
  }
  sortConfig: SortConfig
  groupBy: keyof DataItem | null
  currentPage: number
  pageSize: number
}

export function useGridData(params: UseGridDataParams) {
  const { data, searchTerm, categoryFilter, stockFilter, advancedFilters, sortConfig, groupBy, currentPage, pageSize } = params

  const categories = useMemo(() => Array.from(new Set(data.map((item) => item.category))), [data])

  const filteredAndSortedData = useMemo(() => {
    const filtered = data.filter((item) => {
      const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "inStock" && item.inStock) ||
        (stockFilter === "outOfStock" && !item.inStock)

      const costMin = advancedFilters.costMin ? Number(advancedFilters.costMin) : null
      const costMax = advancedFilters.costMax ? Number(advancedFilters.costMax) : null
      const unitsMin = advancedFilters.unitsMin ? Number(advancedFilters.unitsMin) : null
      const unitsMax = advancedFilters.unitsMax ? Number(advancedFilters.unitsMax) : null

      const matchesCost = (costMin === null || item.cost >= costMin) && (costMax === null || item.cost <= costMax)
      const matchesUnits = (unitsMin === null || item.unitsInStock >= unitsMin) && (unitsMax === null || item.unitsInStock <= unitsMax)
      const matchesStatus =
        advancedFilters.status === "all" ||
        (advancedFilters.status === "active" && !item.discontinued) ||
        (advancedFilters.status === "discontinued" && item.discontinued)

      return matchesSearch && matchesCategory && matchesStock && matchesCost && matchesUnits && matchesStatus
    })

    if (sortConfig.direction) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [data, searchTerm, categoryFilter, stockFilter, advancedFilters, sortConfig])

  const groupedData = useMemo(() => {
    if (!groupBy) return { ungrouped: filteredAndSortedData }
    return filteredAndSortedData.reduce((groups, item) => {
      const key = String(item[groupBy])
      if (!groups[key]) groups[key] = []
      groups[key].push(item)
      return groups
    }, {} as Record<string, DataItem[]>)
  }, [filteredAndSortedData, groupBy])

  const paginatedData = useMemo(() => {
    if (groupBy) return groupedData
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return { ungrouped: filteredAndSortedData.slice(startIndex, endIndex) }
  }, [filteredAndSortedData, currentPage, pageSize, groupedData, groupBy])

  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize)

  return { categories, filteredAndSortedData, groupedData, paginatedData, totalPages }
}


