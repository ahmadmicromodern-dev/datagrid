/**
 * Layout اصلی پروژه Next.js
 * 
 * این فایل شامل:
 * - تنظیمات فونت‌های Google Fonts (Montserrat و Open Sans)
 * - متادیتای SEO برای صفحه
 * - ساختار HTML پایه
 * - پشتیبانی از RTL برای زبان فارسی
 * 
 * نکات مهم:
 * - از font-display: swap برای بهبود عملکرد استفاده شده
 * - متادیتا برای SEO و شبکه‌های اجتماعی تنظیم شده
 * - فونت‌ها به صورت CSS variables تعریف شده‌اند
 * - پشتیبانی کامل از RTL برای زبان فارسی
 */

import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { RTLProvider } from "@/components/rtl-provider"
import "./globals.css"

// تنظیمات فونت Montserrat برای عناوین
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-montserrat",
  display: "swap", // بهبود عملکرد بارگذاری فونت
})

// تنظیمات فونت Open Sans برای متن‌های معمولی
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
  display: "swap", // بهبود عملکرد بارگذاری فونت
})

// متادیتای SEO برای بهبود رتبه‌بندی و اشتراک‌گذاری
export const metadata: Metadata = {
  title: "DataGrid - Modern DataGrid Component by Ahmad Rasouli",
  description: "A beautiful, modern DataGrid component with glassmorphism design and RTL support for Persian language. Designed and developed by Ahmad Rasouli as an open source project.",
}

/**
 * کامپوننت RootLayout - Layout اصلی تمام صفحات
 * @param children - محتوای صفحات که در این layout قرار می‌گیرد
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="fa" 
      dir="rtl"
      className={`${montserrat.variable} ${openSans.variable}`} 
      suppressHydrationWarning
    >
      <body className="font-sans antialiased rtl" suppressHydrationWarning>
        <RTLProvider initialLanguage="fa">
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </RTLProvider>
      </body>
    </html>
  )
}
