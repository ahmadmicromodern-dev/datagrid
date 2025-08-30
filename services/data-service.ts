/**
 * سرویس مدیریت داده‌ها برای DataGrid
 * 
 * این فایل شامل:
 * - رابط IDataService برای تعریف عملیات CRUD
 * - کلاس LocalDataService برای مدیریت داده‌ها در حافظه
 * - عملیات فیلترینگ، مرتب‌سازی و گروه‌بندی
 * 
 * نکات مهم برای توسعه:
 * - از TypeScript برای type safety استفاده شده
 * - عملیات async برای شبیه‌سازی API calls
 * - پشتیبانی از pagination و filtering
 */

import type { Product } from "@/models/product"
import type { GridState, FilterDescriptor } from "@/models/grid-state"
import { FilterOperator } from "@/enums/filter-operator"

/**
 * رابط اصلی برای سرویس‌های داده
 * تعریف عملیات CRUD و مدیریت state گرید
 */
export interface IDataService {
  getData(state: GridState): Promise<{ data: Product[]; total: number }>
  createProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product>
  updateProduct(id: string, product: Partial<Product>): Promise<Product>
  deleteProduct(id: string): Promise<void>
  deleteProducts(ids: string[]): Promise<void>
}

/**
 * پیاده‌سازی سرویس داده در حافظه محلی
 * برای تست و توسعه استفاده می‌شود
 */
export class LocalDataService implements IDataService {
  // ذخیره داده‌ها در حافظه
  private data: Product[] = []

  constructor(initialData: Product[]) {
    this.data = [...initialData]
  }

  /**
   * دریافت داده‌ها با اعمال فیلتر، مرتب‌سازی و pagination
   * @param state - وضعیت فعلی گرید شامل فیلترها، مرتب‌سازی و pagination
   * @returns Promise با داده‌ها و تعداد کل
   */
  async getData(state: GridState): Promise<{ data: Product[]; total: number }> {
    let filteredData = [...this.data]

    // اعمال فیلترها
    if (state.filters.length > 0) {
      filteredData = this.applyFilters(filteredData, state.filters)
    }

    // اعمال مرتب‌سازی
    if (state.sortColumn && state.sortDirection) {
      filteredData = this.applySorting(filteredData, state.sortColumn, state.sortDirection)
    }

    // اعمال گروه‌بندی
    if (state.groupBy) {
      filteredData = this.applyGrouping(filteredData, state.groupBy)
    }

    const total = filteredData.length

    // اعمال pagination
    const startIndex = (state.currentPage - 1) * state.pageSize
    const paginatedData = filteredData.slice(startIndex, startIndex + state.pageSize)

    return { data: paginatedData, total }
  }

  /**
   * ایجاد محصول جدید
   * @param product - اطلاعات محصول بدون id و timestamps
   * @returns Promise با محصول ایجاد شده
   */
  async createProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substr(2, 9), // تولید ID تصادفی
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.data.push(newProduct)
    return newProduct
  }

  /**
   * به‌روزرسانی محصول موجود
   * @param id - شناسه محصول
   * @param product - اطلاعات جدید محصول
   * @returns Promise با محصول به‌روزرسانی شده
   */
  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    const index = this.data.findIndex((p) => p.id === id)
    if (index === -1) throw new Error("Product not found")

    this.data[index] = {
      ...this.data[index],
      ...product,
      updatedAt: new Date().toISOString(),
    }
    return this.data[index]
  }

  /**
   * حذف یک محصول
   * @param id - شناسه محصول
   */
  async deleteProduct(id: string): Promise<void> {
    const index = this.data.findIndex((p) => p.id === id)
    if (index === -1) throw new Error("Product not found")
    this.data.splice(index, 1)
  }

  /**
   * حذف چندین محصول
   * @param ids - آرایه شناسه‌های محصولات
   */
  async deleteProducts(ids: string[]): Promise<void> {
    this.data = this.data.filter((p) => !ids.includes(p.id))
  }

  /**
   * اعمال فیلترها روی داده‌ها
   * @param data - داده‌های اصلی
   * @param filters - آرایه فیلترها
   * @returns داده‌های فیلتر شده
   */
  private applyFilters(data: Product[], filters: FilterDescriptor[]): Product[] {
    return data.filter((item) => {
      return filters.every((filter) => {
        const value = (item as any)[filter.field]
        return this.evaluateFilter(value, filter.operator, filter.value)
      })
    })
  }

  /**
   * اعمال مرتب‌سازی روی داده‌ها
   * @param data - داده‌های اصلی
   * @param column - ستون مرتب‌سازی
   * @param direction - جهت مرتب‌سازی (asc/desc)
   * @returns داده‌های مرتب شده
   */
  private applySorting(data: Product[], column: string, direction: "asc" | "desc"): Product[] {
    return data.sort((a, b) => {
      const aValue = (a as any)[column]
      const bValue = (b as any)[column]

      if (aValue < bValue) return direction === "asc" ? -1 : 1
      if (aValue > bValue) return direction === "asc" ? 1 : -1
      return 0
    })
  }

  /**
   * اعمال گروه‌بندی روی داده‌ها
   * @param data - داده‌های اصلی
   * @param groupBy - فیلد گروه‌بندی
   * @returns داده‌های گروه‌بندی شده
   */
  private applyGrouping(data: Product[], groupBy: string): Product[] {
    return data.sort((a, b) => {
      const aValue = (a as any)[groupBy]
      const bValue = (b as any)[groupBy]
      return aValue.localeCompare(bValue)
    })
  }

  private evaluateFilter(value: any, operator: FilterOperator, filterValue: any): boolean {
    switch (operator) {
      case FilterOperator.Equal:
        return value === filterValue
      case FilterOperator.NotEqual:
        return value !== filterValue
      case FilterOperator.Contains:
        return String(value).toLowerCase().includes(String(filterValue).toLowerCase())
      case FilterOperator.StartsWith:
        return String(value).toLowerCase().startsWith(String(filterValue).toLowerCase())
      case FilterOperator.EndsWith:
        return String(value).toLowerCase().endsWith(String(filterValue).toLowerCase())
      case FilterOperator.GreaterThan:
        return value > filterValue
      case FilterOperator.GreaterThanOrEqual:
        return value >= filterValue
      case FilterOperator.LessThan:
        return value < filterValue
      case FilterOperator.LessThanOrEqual:
        return value <= filterValue
      case FilterOperator.IsNull:
        return value == null
      case FilterOperator.IsNotNull:
        return value != null
      default:
        return true
    }
  }
}
