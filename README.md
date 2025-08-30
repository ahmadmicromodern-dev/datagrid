# DataGrid - Modern DataGrid Component

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[English](#english) | [فارسی](#فارسی)

</div>

---

## English

### 📋 About Project

This project is a modern DataGrid component built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS**. The project is completely designed, developed, and implemented by **Ahmad Rasouli**.

### 👨‍💻 Creator and Developer

**Ahmad Rasouli** - Designer, Developer, and Complete Creator of this Project

This project was built with personal effort and creativity by Ahmad Rasouli, including all aspects:
- User Interface Design
- Application Logic Implementation
- Code Structure and Architecture
- Styling and Animations
- RTL Capabilities
- Performance Optimization

**Dedicated to the Open Source Community** 🌟

### 🎯 Main Features

#### ✨ Modern User Interface
- **Responsive Design** with full mobile and desktop support
- **Multiple Themes** with color and style change capabilities
- **Dark/Light Mode** with settings persistence
- **Smooth Animations** and optimized user experience

#### 📊 DataGrid Capabilities
- **Multi-column Sorting** with direction change capability
- **Advanced Filtering** with various operators
- **Live Search** across all columns
- **Multiple Selection** with checkboxes
- **Card and Table Display** with view switching capability
- **Inline Editing** of data
- **Add and Remove** new records

#### 🎨 Available Themes
- Default Theme
- Ocean Blue
- Ocean Blue A11Y
- Main
- Main Dark
- Purple
- Turquoise
- Nordic

#### 📱 Mobile Capabilities
- **Hamburger Menu** for navigation
- **Optimized Display** on small screens
- **Touch Interaction** optimized

#### 🌍 Multi-language Support
- **Full RTL Support** (Persian, Arabic)
- **Language Switching** between Persian and English
- **Persian Fonts** optimized

### 🛠️ Technologies Used

#### Frontend
- **Next.js 15** - React Framework
- **React 19** - UI Library
- **TypeScript** - Programming Language
- **Tailwind CSS 4** - CSS Framework
- **Radix UI** - Accessible Components
- **Lucide React** - Icons
- **Recharts** - Charts

#### Development Tools
- **ESLint** - Code Linting
- **PostCSS** - CSS Processing
- **pnpm** - Package Management

### 🚀 How to Run the Project

#### Prerequisites
- **Node.js** version 18 or higher
- **pnpm** (recommended) or npm

#### Install Dependencies

```bash
# Install pnpm (if not installed)
npm install -g pnpm

# Install dependencies
pnpm install
```

#### Run Project in Development Mode

```bash
# Run development server
pnpm dev
```

The project will be accessible at `http://localhost:3000`.

#### Build Production Version

```bash
# Build project
pnpm build

# Run production version
pnpm start
```

### 💻 Installation Guide for Different Operating Systems

#### Windows

1. **Install Node.js:**
   - Go to [nodejs.org](https://nodejs.org)
   - Download and install LTS version
   - Open PowerShell or Command Prompt

2. **Install pnpm:**
   ```powershell
   npm install -g pnpm
   ```

3. **Clone the project:**
   ```powershell
   git clone <repository-url>
   cd datagrid
   ```

4. **Install and run:**
   ```powershell
   pnpm install
   pnpm dev
   ```

#### macOS

1. **Install Node.js:**
   ```bash
   # Using Homebrew
   brew install node
   
   # Or direct download from nodejs.org
   ```

2. **Install pnpm:**
   ```bash
   npm install -g pnpm
   ```

3. **Clone the project:**
   ```bash
   git clone <repository-url>
   cd datagrid
   ```

4. **Install and run:**
   ```bash
   pnpm install
   pnpm dev
   ```

#### Linux (Ubuntu/Debian)

1. **Install Node.js:**
   ```bash
   # Add repository
   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
   
   # Install Node.js
   sudo apt-get install -y nodejs
   ```

2. **Install pnpm:**
   ```bash
   npm install -g pnpm
   ```

3. **Clone the project:**
   ```bash
   git clone <repository-url>
   cd datagrid
   ```

4. **Install and run:**
   ```bash
   pnpm install
   pnpm dev
   ```

### 📁 Project Structure

```
datagrid/
├── app/                    # Next.js pages
├── components/             # React components
│   ├── ui/                # Base UI components
│   ├── datagrid/          # DataGrid components
│   ├── header/            # Header components
│   ├── footer/            # Footer components
│   └── theme/             # Theme components
├── data/                  # Sample data
├── hooks/                 # React Hooks
├── lib/                   # Helper functions
├── models/                # TypeScript models
├── services/              # Data services
└── utilities/             # Helper utilities
```

### 🎨 Customization

#### Changing Themes
You can add new themes in the `components/datagrid/themes.ts` file in the `themes` array:

```typescript
const themes = [
  { name: "Theme Name", value: "value", colors: ["Primary Color", "Secondary Color"] },
  // New themes...
]
```

#### Adding New Columns
To add new columns, edit the `Product` model in the `models/product.ts` file.

### 📝 Available Scripts

```bash
pnpm dev          # Run development server
pnpm build        # Build production version
pnpm start        # Run production version
pnpm lint         # Lint code with ESLint
```

### 🤝 Contributing

To contribute to the project:

1. Fork the project
2. Create a new branch
3. Commit your changes
4. Send a Pull Request

### 📄 License

This project is released under the MIT license.

---

## فارسی

### 📋 درباره پروژه

این پروژه یک کامپوننت مدرن DataGrid است که با استفاده از **Next.js 15**، **React 19**، **TypeScript** و **Tailwind CSS** ساخته شده است. این پروژه به طور کامل توسط **احمد رسولی** طراحی، توسعه و پیاده‌سازی شده است.

### 👨‍💻 سازنده و توسعه‌دهنده

**احمد رسولی** - طراح، توسعه‌دهنده و سازنده کامل این پروژه

این پروژه با تلاش و خلاقیت شخصی احمد رسولی ساخته شده و تمامی جنبه‌های آن شامل:
- طراحی رابط کاربری
- پیاده‌سازی منطق برنامه
- ساختار کد و معماری
- استایل‌دهی و انیمیشن‌ها
- قابلیت‌های RTL
- بهینه‌سازی عملکرد

**تقدیم به جامعه اپن سورس** 🌟

### 🎯 ویژگی‌های اصلی

#### ✨ رابط کاربری مدرن
- **طراحی ریسپانسیو** با پشتیبانی کامل از موبایل و دسکتاپ
- **تم‌های متعدد** با قابلیت تغییر رنگ و استایل
- **حالت تاریک/روشن** با قابلیت ذخیره‌سازی تنظیمات
- **انیمیشن‌های نرم** و تجربه کاربری بهینه

#### 📊 قابلیت‌های DataGrid
- **مرتب‌سازی چند ستونی** با قابلیت تغییر جهت
- **فیلترینگ پیشرفته** با عملگرهای مختلف
- **جستجوی زنده** در تمام ستون‌ها
- **انتخاب چندتایی** با checkbox
- **نمایش کارت‌ها و جدول** با قابلیت تغییر حالت
- **ویرایش درون‌خطی** داده‌ها
- **افزودن و حذف** رکوردهای جدید

#### 🎨 تم‌های موجود
- Default Theme
- Ocean Blue
- Ocean Blue A11Y
- Main
- Main Dark
- Purple
- Turquoise
- Nordic

#### 📱 قابلیت‌های موبایل
- **منوی همبرگری** برای ناوبری
- **نمایش بهینه** در صفحات کوچک
- **تعامل لمسی** بهینه‌سازی شده

#### 🌍 پشتیبانی از زبان‌های مختلف
- **پشتیبانی کامل از RTL** (فارسی، عربی)
- **تغییر زبان** بین فارسی و انگلیسی
- **فونت‌های فارسی** بهینه‌سازی شده

### 🛠️ تکنولوژی‌های استفاده شده

#### Frontend
- **Next.js 15** - فریم‌ورک React
- **React 19** - کتابخانه UI
- **TypeScript** - زبان برنامه‌نویسی
- **Tailwind CSS 4** - فریم‌ورک CSS
- **Radix UI** - کامپوننت‌های دسترسی‌پذیر
- **Lucide React** - آیکون‌ها
- **Recharts** - نمودارها

#### Development Tools
- **ESLint** - بررسی کد
- **PostCSS** - پردازش CSS
- **pnpm** - مدیریت پکیج‌ها

### 🚀 نحوه اجرای پروژه

#### پیش‌نیازها
- **Node.js** نسخه 18 یا بالاتر
- **pnpm** (پیشنهاد می‌شود) یا npm

#### نصب وابستگی‌ها

```bash
# نصب pnpm (اگر نصب نیست)
npm install -g pnpm

# نصب وابستگی‌ها
pnpm install
```

#### اجرای پروژه در حالت توسعه

```bash
# اجرای سرور توسعه
pnpm dev
```

پروژه در آدرس `http://localhost:3000` قابل دسترسی خواهد بود.

#### ساخت نسخه تولید

```bash
# ساخت پروژه
pnpm build

# اجرای نسخه تولید
pnpm start
```

### 💻 راهنمای نصب در سیستم‌عامل‌های مختلف

#### Windows

1. **نصب Node.js:**
   - به [nodejs.org](https://nodejs.org) بروید
   - نسخه LTS را دانلود و نصب کنید
   - PowerShell یا Command Prompt را باز کنید

2. **نصب pnpm:**
   ```powershell
   npm install -g pnpm
   ```

3. **کلون کردن پروژه:**
   ```powershell
   git clone <repository-url>
   cd datagrid
   ```

4. **نصب و اجرا:**
   ```powershell
   pnpm install
   pnpm dev
   ```

#### macOS

1. **نصب Node.js:**
   ```bash
   # با استفاده از Homebrew
   brew install node
   
   # یا دانلود مستقیم از nodejs.org
   ```

2. **نصب pnpm:**
   ```bash
   npm install -g pnpm
   ```

3. **کلون کردن پروژه:**
   ```bash
   git clone <repository-url>
   cd datagrid
   ```

4. **نصب و اجرا:**
   ```bash
   pnpm install
   pnpm dev
   ```

#### Linux (Ubuntu/Debian)

1. **نصب Node.js:**
   ```bash
   # اضافه کردن repository
   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
   
   # نصب Node.js
   sudo apt-get install -y nodejs
   ```

2. **نصب pnpm:**
   ```bash
   npm install -g pnpm
   ```

3. **کلون کردن پروژه:**
   ```bash
   git clone <repository-url>
   cd datagrid
   ```

4. **نصب و اجرا:**
   ```bash
   pnpm install
   pnpm dev
   ```

### 📁 ساختار پروژه

```
datagrid/
├── app/                    # صفحات Next.js
├── components/             # کامپوننت‌های React
│   ├── ui/                # کامپوننت‌های پایه UI
│   ├── datagrid/          # کامپوننت‌های DataGrid
│   ├── header/            # کامپوننت‌های هدر
│   ├── footer/            # کامپوننت‌های فوتر
│   └── theme/             # کامپوننت‌های تم
├── data/                  # داده‌های نمونه
├── hooks/                 # React Hooks
├── lib/                   # توابع کمکی
├── models/                # مدل‌های TypeScript
├── services/              # سرویس‌های داده
└── utilities/             # توابع کمکی
```

### 🎨 سفارشی‌سازی

#### تغییر تم‌ها
تم‌های جدید را می‌توانید در فایل `components/datagrid/themes.ts` در آرایه `themes` اضافه کنید:

```typescript
const themes = [
  { name: "نام تم", value: "value", colors: ["رنگ اصلی", "رنگ ثانویه"] },
  // تم‌های جدید...
]
```

#### اضافه کردن ستون‌های جدید
برای اضافه کردن ستون‌های جدید، مدل `Product` را در فایل `models/product.ts` ویرایش کنید.

### 📝 اسکریپت‌های موجود

```bash
pnpm dev          # اجرای سرور توسعه
pnpm build        # ساخت نسخه تولید
pnpm start        # اجرای نسخه تولید
pnpm lint         # بررسی کد با ESLint
```

### 🤝 مشارکت

برای مشارکت در پروژه:

1. پروژه را fork کنید
2. یک branch جدید ایجاد کنید
3. تغییرات خود را commit کنید
4. Pull Request ارسال کنید

### 📄 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

---

## 🙏 تشکر و قدردانی

### از جامعه اپن سورس

این پروژه به عنوان یک پروژه اپن سورس، از تمامی کتابخانه‌ها و ابزارهای اپن سورس که در ساخت آن استفاده شده، تشکر می‌کند. امیدواریم این پروژه نیز بتواند به جامعه توسعه‌دهندگان کمک کند.

---

**سازنده و توسعه‌دهنده:** احمد رسولی  
**تاریخ:** 2025  
**نوع پروژه:** اپن سورس  
**هدف:** کمک به جامعه توسعه‌دهندگان

---

## 🎥 نمایش پروژه

### ✨ نمایش ویژگی‌ها
فیلم جامع نمایش تمام قابلیت‌های DataGrid:

![نمایش ویژگی‌ها](./public/videos/features-showcase.mp4)

*این فیلم شامل: عملکرد DataGrid، تغییر تم، پشتیبانی RTL، سازگاری موبایل، مرتب‌سازی، فیلترینگ، جستجو و تغییر حالت نمایش است.*

---

## 📚 Additional Documentation

- [RTL Support Guide](./RTL_README.md) - Complete RTL (Right-to-Left) support documentation
- [Comments Summary](./COMMENTS_SUMMARY.md) - Code comments and documentation summary
- [Hydration Fix Guide](./HYDRATION_FIX.md) - Next.js hydration issues and solutions
