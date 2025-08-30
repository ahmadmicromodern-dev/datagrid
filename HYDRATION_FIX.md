# Hydration Mismatch Fixes

## مشکل
خطای hydration در React که به دلیل عدم تطابق بین HTML رندر شده در سرور و کلاینت رخ می‌دهد.

## علل اصلی
1. استفاده از `localStorage` در سرور
2. تغییرات DOM در `useEffect`
3. عدم تطابق کلاس‌های CSS بین سرور و کلاینت
4. Extension های مرورگر که HTML را تغییر می‌دهند

## راه‌حل‌های پیاده‌سازی شده

### 1. ThemeProvider
- مدیریت متمرکز حالت تم
- جلوگیری از دسترسی مستقیم به `localStorage` در سرور
- استفاده از `useEffect` برای بارگذاری تنظیمات

### 2. ClientOnly Component
- رندر کردن کامپوننت‌ها فقط در سمت کلاینت
- نمایش fallback در زمان SSR
- جلوگیری از hydration mismatch

### 3. HydrationBoundary
- مدیریت بهتر فرآیند hydration
- نمایش محتوا فقط پس از تکمیل hydration
- callback برای اطلاع از تکمیل hydration

### 4. suppressHydrationWarning
- اضافه کردن `suppressHydrationWarning` به عناصر HTML و body
- جلوگیری از نمایش warning های غیرضروری

### 5. CSS Fixes
- تنظیم حالت اولیه یکسان برای HTML و body
- جلوگیری از layout shift
- بهبود font rendering

## نحوه استفاده

### ThemeProvider
```tsx
import { ThemeProvider } from "@/components/theme-provider"

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}
```

### ClientOnly
```tsx
import { ClientOnly } from "@/components/ui/client-only"

<ClientOnly fallback={<div>Loading...</div>}>
  <ComponentThatNeedsClient />
</ClientOnly>
```

### HydrationBoundary
```tsx
import { HydrationBoundary } from "@/components/ui/hydration-boundary"

<HydrationBoundary 
  fallback={<div>Loading...</div>}
  onHydrationComplete={() => console.log('Hydrated!')}
>
  <Component />
</HydrationBoundary>
```

## نکات مهم
1. همیشه از `useEffect` برای دسترسی به `localStorage` استفاده کنید
2. از `ClientOnly` برای کامپوننت‌هایی که نیاز به کلاینت دارند استفاده کنید
3. از `suppressHydrationWarning` فقط در موارد ضروری استفاده کنید
4. حالت اولیه کامپوننت‌ها باید یکسان در سرور و کلاینت باشد

## تست
برای تست راه‌حل‌ها:
1. صفحه را refresh کنید
2. DevTools را باز کنید و خطاهای console را بررسی کنید
3. Network tab را بررسی کنید تا مطمئن شوید SSR درست کار می‌کند
4. Performance tab را بررسی کنید تا مطمئن شوید hydration سریع است
