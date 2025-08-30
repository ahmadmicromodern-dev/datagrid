/**
 * فایل utility functions
 * 
 * این فایل شامل:
 * - تابع cn برای ترکیب کلاس‌های CSS
 * - استفاده از clsx و tailwind-merge
 * - مدیریت کلاس‌های Tailwind CSS
 * 
 * نکات مهم:
 * - از clsx برای ترکیب شرطی کلاس‌ها استفاده شده
 * - از tailwind-merge برای حل تضاد کلاس‌ها استفاده شده
 * - تابع پرکاربرد در کل پروژه
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * تابع ترکیب کلاس‌های CSS
 * ترکیب clsx و tailwind-merge برای مدیریت بهتر کلاس‌ها
 * @param inputs - آرایه کلاس‌های CSS
 * @returns رشته کلاس‌های ترکیب شده
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
