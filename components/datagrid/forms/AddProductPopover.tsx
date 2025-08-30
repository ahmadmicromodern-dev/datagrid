/**
 * پاپ‌اور افزودن محصول (AddProductPopover)
 *
 * این کامپوننت یک فرم کوچک در پاپ‌اور برای ایجاد محصول جدید است:
 * - کنترل نمایش/عدم‌نمایش با prop های `open` و `onOpenChange`
 * - مدیریت state فرم از طریق `newProduct` و `setNewProduct`
 * - ارسال نهایی با `onSubmit` و اعتبارسنجی نام محصول
 */
"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useRTLContext } from "@/components/rtl-provider"

export interface NewProductState {
  productName: string
  cost: number
  discontinued: boolean
  category: string
  inStock: boolean
  quantityPerUnit: string
  unitsInStock: number
  reorderLevel: number
}

export interface AddProductPopoverProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  newProduct: NewProductState
  setNewProduct: React.Dispatch<React.SetStateAction<NewProductState>>
  onSubmit: () => void
}

export const AddProductPopover: React.FC<AddProductPopoverProps> = ({ open, onOpenChange, newProduct, setNewProduct, onSubmit }) => {
  const { isRTL } = useRTLContext()
  
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button className="bg-primary/20 hover:bg-primary/30 h-10 sm:h-9">
          {isRTL ? 'افزودن محصول' : 'Add Product'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[85vw] sm:w-[95vw] max-w-md mx-auto p-3 sm:p-4 bg-background/100 sm:bg-popover backdrop-blur-sm sm:backdrop-blur-none border border-border/50 sm:border-border shadow-lg sm:shadow-md" align="center" side="bottom" sideOffset={-90} avoidCollisions={true}>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h3 className="text-base sm:text-lg font-semibold">
              {isRTL ? 'افزودن محصول جدید' : 'Add New Product'}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {isRTL ? 'ایجاد یک محصول جدید در پایگاه داده.' : 'Create a new product entry in the database.'}
            </p>
          </div>
          <div className="grid gap-3 sm:gap-4 max-h-[40vh] sm:max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm sm:text-base">
                {isRTL ? 'نام محصول' : 'Product Name'} <span className="text-destructive">*</span>
              </Label>
              <Input 
                id="name" 
                value={newProduct.productName} 
                onChange={(e) => setNewProduct((prev) => ({ ...prev, productName: e.target.value }))} 
                placeholder={isRTL ? "نام محصول را وارد کنید" : "Enter product name"} 
                className="h-10 sm:h-9" 
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cost" className="text-sm sm:text-base">
                  {isRTL ? 'قیمت ($)' : 'Cost ($)'}
                </Label>
                <Input 
                  id="cost" 
                  type="number" 
                  step="0.01" 
                  value={newProduct.cost} 
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, cost: Number.parseFloat(e.target.value) || 0 }))} 
                  placeholder="0.00" 
                  className="h-10 sm:h-9" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock" className="text-sm sm:text-base">
                  {isRTL ? 'موجودی' : 'Stock'}
                </Label>
                <Input 
                  id="stock" 
                  type="number" 
                  value={newProduct.unitsInStock} 
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, unitsInStock: Number.parseInt(e.target.value) || 0 }))} 
                  placeholder="0" 
                  className="h-10 sm:h-9" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm sm:text-base">
                {isRTL ? 'دسته‌بندی' : 'Category'}
              </Label>
              <Input 
                id="category" 
                value={newProduct.category} 
                onChange={(e) => setNewProduct((prev) => ({ ...prev, category: e.target.value }))} 
                placeholder={isRTL ? "دسته‌بندی را وارد کنید" : "Enter category"} 
                className="h-10 sm:h-9" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantityPerUnit" className="text-sm sm:text-base">
                {isRTL ? 'مقدار در واحد' : 'Quantity Per Unit'}
              </Label>
              <Input 
                id="quantityPerUnit" 
                value={newProduct.quantityPerUnit} 
                onChange={(e) => setNewProduct((prev) => ({ ...prev, quantityPerUnit: e.target.value }))} 
                placeholder={isRTL ? "مثل: 24 بطری در کارتون" : "e.g., 24 bottles per carton"} 
                className="h-10 sm:h-9" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reorderLevel" className="text-sm sm:text-base">
                {isRTL ? 'سطح سفارش مجدد' : 'Reorder Level'}
              </Label>
              <Input 
                id="reorderLevel" 
                type="number" 
                value={newProduct.reorderLevel} 
                onChange={(e) => setNewProduct((prev) => ({ ...prev, reorderLevel: Number.parseInt(e.target.value) || 0 }))} 
                placeholder="0" 
                className="h-10 sm:h-9" 
              />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button onClick={onSubmit} className="flex-1 bg-primary hover:bg-primary/90">
              {isRTL ? 'افزودن' : 'Add'}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              {isRTL ? 'لغو' : 'Cancel'}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}


