/**
 * تعریف تم‌های گرید (themes)
 *
 * هر آیتم شامل نام نمایشی، مقدار داخلی (value) و پالت رنگ است.
 * از این داده‌ها برای تغییر ظاهر گرید و عناصر پیرامونی استفاده می‌شود.
 */
export interface ThemeItem {
  name: string
  nameFa: string
  value: string
  colors: string[]
}

export const themes: ThemeItem[] = [
  { name: "Default Theme", nameFa: "تم پیش‌فرض", value: "default", colors: ["#3b82f6", "#64748b"] },
  { name: "Ocean Blue", nameFa: "آبی اقیانوس", value: "ocean", colors: ["#0ea5e9", "#64748b"] },
  { name: "Ocean Blue A11Y", nameFa: "آبی اقیانوس دسترسی", value: "ocean-a11y", colors: ["#0284c7", "#475569"] },
  { name: "Main", nameFa: "اصلی", value: "main", colors: ["#ef4444", "#64748b"] },
  { name: "Main Dark", nameFa: "اصلی تاریک", value: "main-dark", colors: ["#dc2626", "#374151"] },
  { name: "Purple", nameFa: "بنفش", value: "purple", colors: ["#8b5cf6", "#64748b"] },
  { name: "Turquoise", nameFa: "فیروزه‌ای", value: "turquoise", colors: ["#14b8a6", "#64748b"] },
  { name: "Nordic", nameFa: "نوردیک", value: "nordic", colors: ["#6366f1", "#64748b"] },
]


