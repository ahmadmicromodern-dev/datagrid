"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

interface GridHeaderProps {
  sortColumn: string | null
  sortDirection: "asc" | "desc" | null
  onSort: (column: string) => void
  selectedItems: string[]
  totalItems: number
  onSelectAll: () => void
}

export function GridHeader({
  sortColumn,
  sortDirection,
  onSort,
  selectedItems,
  totalItems,
  onSelectAll,
}: GridHeaderProps) {
  const getSortIcon = (column: string) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="h-4 w-4 opacity-50" />
    }
    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
  }

  const isAllSelected = selectedItems.length === totalItems && totalItems > 0
  const isIndeterminate = selectedItems.length > 0 && selectedItems.length < totalItems

  return (
    <thead className="bg-muted/50 backdrop-blur-sm">
      <tr className="border-b border-border/50">
        <th className="w-12 p-4">
          <Checkbox
            checked={isAllSelected}
            ref={(el) => {
              if (el) el.indeterminate = isIndeterminate
            }}
            onCheckedChange={onSelectAll}
            aria-label="Select all"
          />
        </th>
        <th className="text-left p-4">
          <Button
            variant="ghost"
            onClick={() => onSort("productName")}
            className="h-auto p-0 font-semibold hover:bg-transparent"
          >
            Product Name
            {getSortIcon("productName")}
          </Button>
        </th>
        <th className="text-left p-4">
          <Button
            variant="ghost"
            onClick={() => onSort("cost")}
            className="h-auto p-0 font-semibold hover:bg-transparent"
          >
            Cost
            {getSortIcon("cost")}
          </Button>
        </th>
        <th className="text-left p-4">
          <Button
            variant="ghost"
            onClick={() => onSort("discontinued")}
            className="h-auto p-0 font-semibold hover:bg-transparent"
          >
            Discontinued
            {getSortIcon("discontinued")}
          </Button>
        </th>
        <th className="text-left p-4">
          <Button
            variant="ghost"
            onClick={() => onSort("category")}
            className="h-auto p-0 font-semibold hover:bg-transparent"
          >
            Category
            {getSortIcon("category")}
          </Button>
        </th>
        <th className="text-left p-4">
          <Button
            variant="ghost"
            onClick={() => onSort("inStock")}
            className="h-auto p-0 font-semibold hover:bg-transparent"
          >
            In Stock
            {getSortIcon("inStock")}
          </Button>
        </th>
        <th className="text-left p-4">
          <Button
            variant="ghost"
            onClick={() => onSort("quantityPerUnit")}
            className="h-auto p-0 font-semibold hover:bg-transparent"
          >
            Quantity Per Unit
            {getSortIcon("quantityPerUnit")}
          </Button>
        </th>
        <th className="text-left p-4 w-24">Actions</th>
      </tr>
    </thead>
  )
}
