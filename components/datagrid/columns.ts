/**
 * تعریف ستون‌های دیتاگرید (columns)
 *
 * هر ستون شامل کلید داده (key)، برچسب نمایشی (label) و عرض پیشنهادی است.
 * ترتیب پیش‌فرض ستون‌ها و پیکربندی اولیه از این لیست تامین می‌شود.
 */
import { DataItem } from "@/components/datagrid/types"

export type ColumnDefinition = { key: keyof DataItem; label: string; labelFa: string; width?: string }

export const columns: ColumnDefinition[] = [
  { key: "productName", label: "Product Name", labelFa: "نام محصول", width: "w-64" },
  { key: "cost", label: "Cost", labelFa: "قیمت", width: "w-24" },
  { key: "category", label: "Category", labelFa: "دسته‌بندی", width: "w-32" },
  { key: "inStock", label: "In Stock", labelFa: "موجود", width: "w-24" },
  { key: "discontinued", label: "Status", labelFa: "وضعیت", width: "w-24" },
  { key: "quantityPerUnit", label: "Quantity/Unit", labelFa: "مقدار/واحد", width: "w-40" },
  { key: "unitsInStock", label: "Units", labelFa: "واحدها", width: "w-20" },
  { key: "reorderLevel", label: "Reorder", labelFa: "سفارش مجدد", width: "w-20" },
]


