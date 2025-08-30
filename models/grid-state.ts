/**
 * مدل وضعیت گرید (GridState) و توصیفگرها
 *
 * شامل ساختارهای داده برای مدیریت:
 * - صفحه‌بندی، مرتب‌سازی، فیلترینگ، گروه‌بندی و انتخاب‌ها
 */


export interface GridState {
  currentPage: number
  pageSize: number
  totalItems: number
  sortColumn: string | null
  sortDirection: "asc" | "desc" | null
  filters: FilterDescriptor[]
  groupBy: string | null
  selectedItems: string[]
  viewMode: "table" | "cards"
}

export interface FilterDescriptor {
  field: string
  operator: string
  value: any
  logic?: "and" | "or"
}

export interface SortDescriptor {
  field: string
  direction: string
}

export interface GroupDescriptor {
  field: string
  direction?: string
}

export interface AggregateDescriptor {
  field: string
  aggregate: "sum" | "count" | "average" | "min" | "max"
}