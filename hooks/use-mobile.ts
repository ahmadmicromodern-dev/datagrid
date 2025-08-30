/**
 * Hook تشخیص دستگاه موبایل
 * 
 * این فایل شامل:
 * - تشخیص اندازه صفحه برای موبایل
 * - استفاده از Media Query برای responsive design
 * - مدیریت تغییرات اندازه صفحه
 * 
 * نکات مهم:
 * - از breakpoint 768px برای تشخیص موبایل استفاده شده
 * - پشتیبانی از تغییرات real-time اندازه صفحه
 * - مدیریت cleanup برای event listeners
 */

import * as React from "react"

/** نقطه شکست برای تشخیص موبایل (768px) */
const MOBILE_BREAKPOINT = 768

/**
 * Hook برای تشخیص اینکه آیا کاربر در دستگاه موبایل است
 * @returns boolean - true اگر موبایل باشد، false اگر دسکتاپ باشد
 */
export function useIsMobile() {
  // state برای نگهداری وضعیت موبایل
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // ایجاد Media Query Listener
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // تابع تغییر وضعیت
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // اضافه کردن event listener
    mql.addEventListener("change", onChange)
    
    // تنظیم وضعیت اولیه
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // cleanup function
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
