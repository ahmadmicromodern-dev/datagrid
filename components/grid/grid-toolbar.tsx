"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Download, Upload, Settings } from "lucide-react"

interface GridToolbarProps {
  onAddProduct: () => void
  onExport: () => void
  onImport: () => void
  onSettings: () => void
  searchValue: string
  onSearchChange: (value: string) => void
}

export function GridToolbar({
  onAddProduct,
  onExport,
  onImport,
  onSettings,
  searchValue,
  onSearchChange,
}: GridToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card/50 backdrop-blur-sm border-b border-border/50">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search products..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-background/50 backdrop-blur-sm"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={onAddProduct} className="bg-primary hover:bg-primary/90">
          Add Product
        </Button>

        <Button variant="outline" onClick={onExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>

        <Button variant="outline" onClick={onImport}>
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>

        <Button variant="outline" onClick={onSettings}>
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
