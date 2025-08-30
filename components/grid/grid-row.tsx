"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Copy, Trash2 } from "lucide-react"
import type { Product } from "@/models/product"

interface GridRowProps {
  product: Product
  isSelected: boolean
  onSelect: () => void
}

export function GridRow({ product, isSelected, onSelect }: GridRowProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleEdit = () => {
    console.log("Edit product:", product.id)
  }

  const handleDuplicate = () => {
    console.log("Duplicate product:", product.id)
  }

  const handleDelete = () => {
    console.log("Delete product:", product.id)
  }

  const stockPercentage = Math.min((product.inStock / 100) * 100, 100)

  return (
    <tr
      className={`border-b border-border/30 hover:bg-muted/30 transition-colors ${isSelected ? "bg-accent/20" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <td className="p-4">
        <Checkbox checked={isSelected} onCheckedChange={onSelect} aria-label={`Select ${product.productName}`} />
      </td>
      <td className="p-4 font-medium">{product.productName}</td>
      <td className="p-4">${product.cost.toFixed(2)}</td>
      <td className="p-4">
        <Badge variant={product.discontinued ? "destructive" : "secondary"}>
          {product.discontinued ? "Yes" : "No"}
        </Badge>
      </td>
      <td className="p-4">{product.category}</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <Progress value={stockPercentage} className="w-20 h-2" />
          <span className="text-sm text-muted-foreground">{product.inStock}</span>
        </div>
      </td>
      <td className="p-4">{product.quantityPerUnit}</td>
      <td className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-sm">
            <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDuplicate} className="cursor-pointer">
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  )
}
