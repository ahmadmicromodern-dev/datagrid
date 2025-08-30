/**
 * انواع و اینترفیس‌های مشترک دیتاگرید (types)
 *
 * شامل:
 * - `DataItem`: مدل ردیف داده
 * - `ModernDataGridProps`: پراپ‌های ورودی کامپوننت گرید اصلی
 * - انواع مرتب‌سازی و کلید ستون‌ها
 */
export interface DataItem {
  id: number
  productName: string
  cost: number
  discontinued: boolean
  category: string
  inStock: boolean
  quantityPerUnit: string
  unitsInStock: number
  reorderLevel: number
}

export interface ModernDataGridProps {
  data: DataItem[]
  currentTheme: string
  isDarkMode: boolean
  onThemeChange: (theme: string) => void
  onToggleTheme: () => void
}

export type SortDirection = "asc" | "desc" | null

export type SortConfig = {
  key: keyof DataItem
  direction: SortDirection
}

export type ColumnKey = keyof DataItem


