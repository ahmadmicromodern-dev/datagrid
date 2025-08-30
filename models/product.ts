/**
 * مدل Product - تعریف ساختار داده محصول
 * 
 * این فایل شامل:
 * - رابط Product برای تعریف ساختار محصول
 * - فیلدهای اجباری و اختیاری
 * - تایپ‌های مناسب برای هر فیلد
 * 
 * نکات مهم:
 * - فیلدهای id، createdAt و updatedAt به صورت خودکار تولید می‌شوند
 * - فیلدهای description و imageUrl اختیاری هستند
 * - از تایپ‌های مناسب برای هر فیلد استفاده شده
 */

/**
 * رابط Product - تعریف ساختار کامل یک محصول
 */
export interface Product {
  /** شناسه یکتای محصول */
  id: string
  /** نام محصول */
  productName: string
  /** قیمت محصول */
  cost: number
  /** وضعیت توقف تولید */
  discontinued: boolean
  /** دسته‌بندی محصول */
  category: string
  /** وضعیت موجودی */
  inStock: boolean
  /** واحد اندازه‌گیری */
  quantityPerUnit: string
  /** تعداد موجود در انبار */
  unitsInStock: number
  /** تعداد در حال سفارش */
  unitsOnOrder: number
  /** سطح سفارش مجدد */
  reorderLevel: number
  /** تامین‌کننده */
  supplier: string
  /** توضیحات محصول (اختیاری) */
  description?: string
  /** آدرس تصویر محصول (اختیاری) */
  imageUrl?: string
  /** تاریخ ایجاد */
  createdAt: string
  /** تاریخ آخرین به‌روزرسانی */
  updatedAt: string
}