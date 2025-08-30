/**
 * کلاس GridCssBuilder - ساخت کلاس‌های CSS به صورت پویا
 * 
 * این فایل شامل:
 * - ساخت کلاس‌های CSS به صورت شرطی
 * - پشتیبانی از Builder Pattern
 * - مدیریت کلاس‌های Tailwind CSS
 * 
 * نکات مهم:
 * - از Builder Pattern برای ساخت کلاس‌ها استفاده شده
 * - پشتیبانی از کلاس‌های شرطی
 * - روشی برای مدیریت کلاس‌های پیچیده
 */

/**
 * کلاس برای ساخت کلاس‌های CSS به صورت پویا
 */
export class GridCssBuilder {
  /** آرایه کلاس‌های CSS */
  private classes: string[] = []

  /**
   * اضافه کردن کلاس CSS با شرط
   * @param className - نام کلاس CSS
   * @param condition - شرط اعمال کلاس
   * @returns این instance برای chaining
   */
  add(className: string, condition = true): this {
    if (condition && className) {
      this.classes.push(className)
    }
    return this
  }

  /**
   * اضافه کردن کلاس CSS بر اساس شرط (if/else)
   * @param condition - شرط بررسی
   * @param trueClass - کلاس در صورت true بودن شرط
   * @param falseClass - کلاس در صورت false بودن شرط (اختیاری)
   * @returns این instance برای chaining
   */
  addIf(condition: boolean, trueClass: string, falseClass?: string): this {
    if (condition) {
      this.add(trueClass)
    } else if (falseClass) {
      this.add(falseClass)
    }
    return this
  }

  /**
   * ساخت رشته نهایی کلاس‌های CSS
   * @returns رشته کلاس‌های CSS
   */
  build(): string {
    return this.classes.join(" ")
  }

  /**
   * ایجاد instance جدید از GridCssBuilder
   * @returns instance جدید
   */
  static create(): GridCssBuilder {
    return new GridCssBuilder()
  }
}
