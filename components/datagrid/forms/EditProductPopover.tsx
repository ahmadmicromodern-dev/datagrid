/**
 * پاپ‌اور ویرایش محصول (EditProductPopover)
 *
 * این کامپوننت ویرایش مقادیر محصول انتخاب‌شده را با یک فرم در پاپ‌اور انجام می‌دهد:
 * - دریافت/به‌روزرسانی داده با `editProduct` و `setEditProduct`
 * - ذخیره تغییرات با `onSave`
 * - کنترل نمایش توسط prop های `open` و `onOpenChange`
 */
"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent } from "@/components/ui/popover"
import { DataItem } from "@/components/datagrid/types"

export interface EditProductPopoverProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editProduct: Partial<DataItem>
  setEditProduct: React.Dispatch<React.SetStateAction<Partial<DataItem>>>
  onSave: () => void
}

export const EditProductPopover: React.FC<EditProductPopoverProps> = ({ open, onOpenChange, editProduct, setEditProduct, onSave }) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      {/* overlay remains controlled by parent if needed */}
      <PopoverContent className="w-[85vw] sm:w-[95vw] max-w-md mx-auto p-3 sm:p-4 bg-background/150 sm:bg-popover backdrop-blur-sm sm:backdrop-blur-none border border-border/100 sm:border-border shadow-lg sm:shadow-md z-[9999]" align="center" side="bottom" sideOffset={0} avoidCollisions={false}>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h3 className="text-base sm:text-lg font-semibold">Edit Product</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Update the product information.</p>
          </div>
          <div className="grid gap-3 sm:gap-4 max-h=[40vh] sm:max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="flex items-center gap-1 text-sm sm:text-base">
                Product Name <span className="text-destructive">*</span>
              </Label>
              <Input id="edit-name" value={editProduct.productName || ""} onChange={(e) => setEditProduct((prev) => ({ ...prev, productName: e.target.value }))} placeholder="Enter product name" className="h-10 sm:h-9" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-cost" className="text-sm sm:text-base">Cost ($)</Label>
                <Input id="edit-cost" type="number" step="0.01" value={editProduct.cost || 0} onChange={(e) => setEditProduct((prev) => ({ ...prev, cost: Number.parseFloat(e.target.value) || 0 }))} placeholder="0.00" className="h-10 sm:h-9" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-stock" className="text-sm sm:text-base">Stock</Label>
                <Input id="edit-stock" type="number" value={editProduct.unitsInStock || 0} onChange={(e) => setEditProduct((prev) => ({ ...prev, unitsInStock: Number.parseInt(e.target.value) || 0 }))} placeholder="0" className="h-10 sm:h-9" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category" className="text-sm sm:text-base">Category</Label>
              <Input id="edit-category" value={editProduct.category || ""} onChange={(e) => setEditProduct((prev) => ({ ...prev, category: e.target.value }))} placeholder="Enter category" className="h-10 sm:h-9" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-quantity" className="text-sm sm:text-base">Quantity per Unit</Label>
              <Input id="edit-quantity" value={editProduct.quantityPerUnit || ""} onChange={(e) => setEditProduct((prev) => ({ ...prev, quantityPerUnit: e.target.value }))} placeholder="e.g., 10 boxes x 20 bags" className="h-10 sm:h-9" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="h-10 sm:h-9 text-sm">Cancel</Button>
            <Button type="submit" onClick={onSave} className="h-10 sm:h-9 text-sm" disabled={!editProduct.productName?.trim()}>Save Changes</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}


