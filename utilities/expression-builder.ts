/**
 * کلاس ExpressionBuilder - ساخت عبارات فیلترینگ
 * 
 * این فایل شامل:
 * - تبدیل فیلترها به عبارات قابل اجرا
 * - پشتیبانی از تمام عملگرهای فیلترینگ
 * - تولید کد JavaScript برای فیلترینگ
 * 
 * نکات مهم:
 * - از کلاس static برای utility functions استفاده شده
 * - پشتیبانی از تمام عملگرهای FilterOperator
 * - تولید عبارات JavaScript معتبر
 */

import type { FilterDescriptor } from "@/models/grid-state"
import { FilterOperator } from "@/enums/filter-operator"

/**
 * کلاس برای ساخت عبارات فیلترینگ
 */
export class ExpressionBuilder {
  /**
   * ساخت عبارت فیلترینگ از آرایه فیلترها
   * @param filters - آرایه فیلترهای اعمال شده
   * @returns عبارت JavaScript برای فیلترینگ
   */
  static buildFilterExpression(filters: FilterDescriptor[]): string {
    if (filters.length === 0) return ""

    return filters
      .map((filter) => {
        // تبدیل هر فیلتر به عبارت JavaScript مناسب
        switch (filter.operator) {
          case FilterOperator.Equal:
            return `${filter.field} == "${filter.value}"`
          case FilterOperator.NotEqual:
            return `${filter.field} != "${filter.value}"`
          case FilterOperator.Contains:
            return `${filter.field}.includes("${filter.value}")`
          case FilterOperator.StartsWith:
            return `${filter.field}.startsWith("${filter.value}")`
          case FilterOperator.EndsWith:
            return `${filter.field}.endsWith("${filter.value}")`
          case FilterOperator.GreaterThan:
            return `${filter.field} > ${filter.value}`
          case FilterOperator.GreaterThanOrEqual:
            return `${filter.field} >= ${filter.value}`
          case FilterOperator.LessThan:
            return `${filter.field} < ${filter.value}`
          case FilterOperator.LessThanOrEqual:
            return `${filter.field} <= ${filter.value}`
          case FilterOperator.IsNull:
            return `${filter.field} == null`
          case FilterOperator.IsNotNull:
            return `${filter.field} != null`
          default:
            return ""
        }
      })
      .filter(Boolean) // حذف عبارات خالی
      .join(" && ") // ترکیب فیلترها با AND
  }
}
