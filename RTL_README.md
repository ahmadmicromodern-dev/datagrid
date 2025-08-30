# پشتیبانی از RTL (راست به چپ) برای زبان فارسی

این پروژه شامل پشتیبانی کامل از RTL (Right-to-Left) برای زبان فارسی است. تمام کامپوننت‌ها، متن‌ها و چیدمان‌ها به صورت خودکار با تغییر زبان تنظیم می‌شوند.

## ویژگی‌های کلیدی

### 🌐 تغییر زبان خودکار
- تغییر بین فارسی و انگلیسی با یک کلیک
- ذخیره‌سازی زبان انتخاب شده در localStorage
- تنظیم خودکار HTML lang و dir attributes

### 📱 پشتیبانی کامل از RTL
- تراز متن خودکار (راست برای فارسی، چپ برای انگلیسی)
- تغییر جهت flexbox و grid
- تنظیم margin و padding به صورت خودکار
- انیمیشن‌های RTL-aware

### 🎨 طراحی واکنش‌گرا
- پشتیبانی از موبایل و دسکتاپ
- انیمیشن‌های نرم و زیبا
- طراحی glassmorphism مدرن

## نحوه استفاده

### 1. تنظیم RTL Provider

ابتدا `RTLProvider` را در layout اصلی اضافه کنید:

```tsx
// app/layout.tsx
import { RTLProvider } from '@/components/rtl-provider'

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="rtl">
        <RTLProvider initialLanguage="fa">
          {children}
        </RTLProvider>
      </body>
    </html>
  )
}
```

### 2. استفاده از RTL Context

در کامپوننت‌های خود از `useRTLContext` استفاده کنید:

```tsx
import { useRTLContext } from '@/components/rtl-provider'

function MyComponent() {
  const { 
    language, 
    isRTL, 
    setLanguage, 
    toggleLanguage,
    getTextAlignment,
    getFlexDirection 
  } = useRTLContext()

  return (
    <div className={isRTL ? 'rtl' : 'ltr'}>
      <h1 className={`text-${getTextAlignment('left')}`}>
        {isRTL ? 'عنوان فارسی' : 'English Title'}
      </h1>
      
      <div className={`flex ${getFlexDirection('row')}`}>
        <button onClick={toggleLanguage}>
          {isRTL ? 'تغییر به انگلیسی' : 'Switch to Persian'}
        </button>
      </div>
    </div>
  )
}
```

### 3. استفاده از Language Switcher

کامپوننت تغییر زبان آماده استفاده:

```tsx
import { LanguageSwitcher } from '@/components/ui/language-switcher'

function Header() {
  return (
    <header>
      <LanguageSwitcher 
        variant="compact"
        size="sm"
        showLabel={true}
        showFlag={true}
      />
    </header>
  )
}
```

## کلاس‌های CSS RTL

### کلاس‌های پایه
- `.rtl` - فعال‌سازی RTL
- `.ltr` - فعال‌سازی LTR

### کلاس‌های تراز متن
```css
.rtl .text-left { text-align: right; }
.rtl .text-right { text-align: left; }
.rtl .text-center { text-align: center; }
```

### کلاس‌های layout
```css
.rtl .flex-row { flex-direction: row-reverse; }
.rtl .justify-start { justify-content: flex-end; }
.rtl .justify-end { justify-content: flex-start; }
```

### کلاس‌های margin و padding
```css
.rtl .ml-auto { margin-left: unset; margin-right: auto; }
.rtl .pl-4 { padding-left: unset; padding-right: 1rem; }
```

## کامپوننت‌های آماده

### LanguageSwitcher
کامپوننت تغییر زبان با سه variant:
- `default` - کامل با پرچم و نام زبان
- `compact` - فشرده
- `icon-only` - فقط آیکون

### RTLDemo
کامپوننت نمایش عملکرد RTL شامل:
- تست تراز متن‌ها
- نمایش دکمه‌ها و فرم‌ها
- نمایش جداول و لیست‌ها
- انیمیشن‌های RTL

## Hook های مفید

### useRTL
```tsx
const {
  language,        // 'fa' | 'en'
  isRTL,          // boolean
  setLanguage,    // (lang: Language) => void
  toggleLanguage, // () => void
  getTextDirection,    // () => 'rtl' | 'ltr'
  getTextAlignment,    // (default: 'left'|'right'|'center') => string
  getFlexDirection,    // (default: 'row'|'row-reverse') => string
  getMargin,          // (default: string) => string
  getPadding          // (default: string) => string
} = useRTL()
```

## مثال‌های کاربردی

### 1. تراز متن خودکار
```tsx
const { getTextAlignment } = useRTLContext()

<h2 className={`text-${getTextAlignment('left')}`}>
  {isRTL ? 'عنوان فارسی' : 'English Title'}
</h2>
```

### 2. جهت flexbox خودکار
```tsx
const { getFlexDirection } = useRTLContext()

<div className={`flex ${getFlexDirection('row')} gap-4`}>
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### 3. انیمیشن RTL
```tsx
const { isRTL } = useRTLContext()

<div className={`transition-all duration-500 ${
  isRTL 
    ? 'transform translate-x-4 rotate-12' 
    : 'transform translate-x-0 rotate-0'
}`}>
  Content
</div>
```

## تست عملکرد

برای تست عملکرد RTL، به صفحه `/rtl-demo` بروید. این صفحه شامل:

- نمایش تمام ویژگی‌های RTL
- تست تراز متن‌ها
- تست دکمه‌ها و فرم‌ها
- تست جداول و لیست‌ها
- انیمیشن‌های RTL

## نکات مهم

### 1. تراز متن
- از `getTextAlignment()` برای تراز خودکار استفاده کنید
- `text-center` همیشه در وسط قرار می‌گیرد
- `text-left` و `text-right` بر اساس RTL تنظیم می‌شوند

### 2. Layout
- از `getFlexDirection()` برای جهت flexbox استفاده کنید
- از `getMargin()` و `getPadding()` برای margin و padding استفاده کنید

### 3. انیمیشن‌ها
- انیمیشن‌ها باید RTL-aware باشند
- از transform های مناسب برای هر جهت استفاده کنید

### 4. فونت‌ها
- فونت Tanha برای فارسی استفاده می‌شود
- فونت‌های سیستم برای انگلیسی استفاده می‌شوند

## عیب‌یابی

### مشکل: RTL کار نمی‌کند
1. مطمئن شوید `RTLProvider` در layout اضافه شده
2. مطمئن شوید کلاس `rtl` به body اضافه شده
3. مطمئن شوید CSS های RTL بارگذاری شده‌اند

### مشکل: تراز متن اشتباه
1. از `getTextAlignment()` استفاده کنید
2. مطمئن شوید کلاس `rtl` فعال است
3. CSS های RTL را بررسی کنید

### مشکل: انیمیشن‌ها درست کار نمی‌کنند
1. از transform های RTL-aware استفاده کنید
2. انیمیشن‌ها را برای هر جهت جداگانه تعریف کنید

## پشتیبانی

برای سوالات و مشکلات:
1. فایل `RTL_README.md` را مطالعه کنید
2. کامپوننت `RTLDemo` را بررسی کنید
3. CSS های RTL در `globals.css` را بررسی کنید
4. Hook `useRTL` را مطالعه کنید

---

**نکته**: این سیستم RTL به صورت کامل با Tailwind CSS سازگار است و تمام کلاس‌های موجود را پشتیبانی می‌کند.
