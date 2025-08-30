/**
 * enum عملگرهای فیلترینگ
 * 
 * این فایل شامل:
 * - تعریف تمام عملگرهای فیلترینگ موجود
 * - مقادیر string برای هر عملگر
 * - استفاده در سیستم فیلترینگ DataGrid
 * 
 * نکات مهم:
 * - از enum برای type safety استفاده شده
 * - مقادیر string برای سازگاری با API
 * - پشتیبانی از عملگرهای مقایسه‌ای و متنی
 */

/**
 * عملگرهای فیلترینگ برای DataGrid
 */
export enum FilterOperator {
  /** برابر با */
  Equal = "eq",
  /** نابرابر با */
  NotEqual = "neq",
  /** شامل */
  Contains = "contains",
  /** شروع با */
  StartsWith = "startswith",
  /** پایان با */
  EndsWith = "endswith",
  /** بزرگتر از */
  GreaterThan = "gt",
  /** بزرگتر یا مساوی */
  GreaterThanOrEqual = "gte",
  /** کوچکتر از */
  LessThan = "lt",
  /** کوچکتر یا مساوی */
  LessThanOrEqual = "lte",
  /** null است */
  IsNull = "isnull",
  /** null نیست */
  IsNotNull = "isnotnull",
}
