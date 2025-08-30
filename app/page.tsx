/**
 * صفحه اصلی پروژه DataGrid
 * 
 * این فایل شامل:
 * - مدیریت تم‌های مختلف (تاریک/روشن)
 * - نمایش DataGrid مدرن
 * - Sidebar برای تنظیمات کامپوننت‌ها
 * - مدیریت حالت موبایل و دسکتاپ
 * - پشتیبانی کامل از RTL برای زبان فارسی
 * 
 * نکات مهم برای توسعه:
 * - از "use client" استفاده شده چون از useState و useEffect استفاده می‌کند
 * - تم‌ها در localStorage ذخیره می‌شوند
 * - حالت موبایل با isMobileMenuOpen مدیریت می‌شود
 * - پشتیبانی کامل از RTL با استفاده از RTLProvider
 */

"use client"

import { useState } from "react"
import { ModernDataGrid } from "@/components/modern-datagrid"
import { ComponentsSidebar } from "@/components/components-sidebar"
import { ThemeSelector } from "@/components/theme/theme-selector"
import { useTheme } from "@/components/theme-provider"
import { useRTLContext } from "@/components/rtl-provider"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { ClientOnly } from "@/components/ui/client-only"
import faProducts from "@/data/fa/products.json"
import enProducts from "@/data/en/products.json"

export default function Home() {
  const { isDarkMode, currentTheme, toggleTheme, setTheme, isClient } = useTheme()
  const { language, isRTL } = useRTLContext()
  
  // مدیریت منوی موبایل
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // نمایش loading تا زمانی که در سمت کلاینت باشیم
  if (!isClient) {
    return (
      <div className="flex min-h-screen">
        <div className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0">
          <ComponentsSidebar />
        </div>
        <main className="flex-1 min-w-0">
          <div className="p-6 flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className={`${isRTL ? 'rtl' : 'ltr'} flex min-h-screen`}>
             {/* Header ثابت با backdrop blur */}
       <header className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50 transition-all duration-1000 ease-out ${
        isRTL 
           ? 'transform translate-x-2' 
           : 'transform translate-x-0'
       }`}>
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-6">
            {/* دکمه منوی موبایل - فقط در موبایل نمایش داده می‌شود */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

                         {/* لوگو و نام پروژه */}
             <div className={`flex items-center gap-1 transition-all duration-1000 ease-out ${
              isRTL 
                 ? 'transform translate-x-2' 
                 : 'transform translate-x-0'
             }`}>
               <svg className={`w-6 h-6 text-green-500 transition-all duration-700 ease-out ${
                isRTL ? 'rotate-12 scale-110' : 'rotate-0 scale-100'
               }`} viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
               </svg>
               <span className={`font-semibold text-lg transition-all duration-700 ease-out ${
                isRTL ? 'transform translate-x-1 scale-105' : 'transform translate-x-0 scale-100'
               }`}>
                {isRTL ? 'DataGrid' : 'DataGrid'}
               </span>
             </div>

                         {/* Navigation menu - فقط در دسکتاپ */}
             <nav className={`hidden md:flex items-center gap-6 text-sm transition-all duration-1000 ease-out ${
              isRTL 
                 ? 'justify-end text-right transform translate-x-4' 
                 : 'justify-start text-left transform translate-x-0'
             }`}>
               <a href="#" className={`text-primary border-b-2 border-primary pb-1 transition-all duration-700 ease-out hover:scale-105 ${
                isRTL ? 'transform translate-x-2' : 'transform translate-x-0'
               }`}>
                {isRTL ? 'نمای کلی' : 'Overview'}
               </a>
               <a href="#" className={`text-muted-foreground hover:text-foreground transition-all duration-700 ease-out hover:scale-105 ${
                isRTL ? 'transform translate-x-1' : 'transform translate-x-0'
               }`}>
                {isRTL ? 'نمونه‌ها' : 'Demos'}
               </a>
               <a href="#" className={`text-muted-foreground hover:text-foreground transition-all duration-700 ease-out hover:scale-105 ${
                isRTL ? 'transform translate-x-0' : 'transform translate-x-0'
               }`}>
                {isRTL ? 'بلازور هیبرید' : 'Blazor Hybrid'}
               </a>
               <a href="#" className={`text-muted-foreground hover:text-foreground transition-all duration-700 ease-out hover:scale-105 ${
                isRTL ? 'transform -translate-x-1' : 'transform translate-x-0'
               }`}>
                {isRTL ? 'نقشه راه' : 'Roadmap'}
               </a>
               <a href="#" className={`text-muted-foreground hover:text-foreground transition-all duration-700 ease-out hover:scale-105 ${
                isRTL ? 'transform -translate-x-2' : 'transform translate-x-0'
               }`}>
                {isRTL ? 'مستندات و پشتیبانی' : 'Docs & Support'}
               </a>
               <a href="#" className={`text-muted-foreground hover:text-foreground transition-all duration-700 ease-out hover:scale-105 ${
                isRTL ? 'transform -translate-x-4' : 'transform translate-x-0'
               }`}>
                {isRTL ? 'قیمت‌گذاری' : 'Pricing'}
               </a>
             </nav>
          </div>

          {/* کنترل‌های سمت راست header */}
          <div className="flex items-center gap-2">
                        {/* انتخاب‌کننده تم */}
            <ClientOnly fallback={<div className="w-9 h-9" />}>
              <ThemeSelector
                currentTheme={currentTheme}
                onThemeChange={setTheme}
                isDarkMode={isDarkMode}
                onToggleTheme={toggleTheme}
              />
            </ClientOnly>
            
            {/* تغییر‌دهنده زبان */}
            <LanguageSwitcher 
              variant="compact"
              size="sm"
              className="transition-all duration-500 ease-out"
            />

                         {/* دکمه Try Now */}
             <button className={`px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-all duration-500 ease-out text-sm font-medium ${
              isRTL 
                 ? 'transform translate-x-1 hover:scale-105 shadow-lg' 
                 : 'transform translate-x-0 hover:scale-105 shadow-md'
             }`}>
              {isRTL ? 'امتحان کنید' : 'Try Now'}
             </button>
          </div>
        </div>
      </header>

      {/* منوی موبایل - فقط زمانی که باز باشد نمایش داده می‌شود */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* پس‌زمینه تیره برای بستن منو */}
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          {/* پنل منوی موبایل */}
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-background border-l border-border overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
                             <div className={`flex items-center gap-2 transition-all duration-700 ease-out ${
                isRTL 
                   ? 'transform translate-x-2' 
                   : 'transform translate-x-0'
               }`}>
                 <svg className={`w-6 h-6 text-green-500 transition-all duration-700 ease-out ${
                  isRTL ? 'rotate-12 scale-110' : 'rotate-0 scale-100'
                 }`} viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                 </svg>
                 <span className={`font-semibold transition-all duration-700 ease-out ${
                  isRTL ? 'transform translate-x-1 scale-105' : 'transform translate-x-0 scale-100'
                 }`}>
                  {isRTL ? 'فرانت راسولی' : 'front-rasouli'}
                 </span>
               </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-md hover:bg-muted transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* منوی موبایل */}
            <nav className="p-4 space-y-2">
              <a href="#" className="block p-3 rounded-md hover:bg-muted transition-colors text-primary border-b-2 border-primary">
                {isRTL ? 'نمای کلی' : 'Overview'}
              </a>
              <a href="#" className="block p-3 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                {isRTL ? 'نمونه‌ها' : 'Demos'}
              </a>
              <a href="#" className="block p-3 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                {isRTL ? 'بلازور هیبرید' : 'Blazor Hybrid'}
              </a>
              <a href="#" className="block p-3 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                {isRTL ? 'نقشه راه' : 'Roadmap'}
              </a>
              <a href="#" className="block p-3 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                {isRTL ? 'مستندات و پشتیبانی' : 'Docs & Support'}
              </a>
              <a href="#" className="block p-3 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                {isRTL ? 'قیمت‌گذاری' : 'Pricing'}
              </a>
            </nav>
          </div>
        </div>
      )}

      {/* Sidebar اصلی - فقط در دسکتاپ نمایش داده می‌شود */}
      <div className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0 min-h-screen">
        <div className="pt-14 h-full">
          <ComponentsSidebar />
        </div>
      </div>

      {/* محتوای اصلی صفحه */}
      <main className="flex-1 min-w-0 pt-14 overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
        {/* کامپوننت اصلی DataGrid */}
        <ClientOnly fallback={
          <div className="p-6 flex items-center justify-center">
            <div className="text-muted-foreground">Loading DataGrid...</div>
          </div>
        }>
                      <ModernDataGrid
            data={(language === 'fa' ? (faProducts as any) : (enProducts as any))}
              currentTheme={currentTheme}
              isDarkMode={isDarkMode}
              onThemeChange={setTheme}
              onToggleTheme={toggleTheme}
            lang={language}
            onLangChange={() => {}} // این تابع دیگر استفاده نمی‌شود چون از RTL context استفاده می‌کنیم
            />
        </ClientOnly>

        {/* بخش معرفی ویژگی‌های DataGrid */}
        <section className="bg-background/50 backdrop-blur-sm border-t border-border/50">
          <div className="max-w-7xl mx-auto px-6 py-16">
            {/* عنوان و توضیحات اصلی */}
                         <div className="text-center mb-12">
               <h2 className="text-3xl font-bold mb-4">
                {isRTL ? 'کامپوننت DataGrid بلازور' : 'Blazor DataGrid Component'}
               </h2>
               <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {isRTL 
                   ? 'کامپوننت DataGrid فرانت راسولی یک راه‌حل جامع مدیریت داده با ویژگی‌های پیشرفته برای مرتب‌سازی، فیلتر، گروه‌بندی و ویرایش داده در برنامه‌های وب مدرن ارائه می‌دهد.'
                   : 'The front-rasouli DataGrid component provides a comprehensive data management solution with advanced features for sorting, filtering, grouping, and editing data in modern web applications.'
                 }
               </p>
             </div>

            {/* کارت‌های ویژگی‌های DataGrid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* کارت فیلترینگ پیشرفته */}
                             <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
                 <h3 className="text-xl font-semibold mb-3">
                  {isRTL ? 'فیلترینگ پیشرفته' : 'Advanced Filtering'}
                 </h3>
                 <p className="text-muted-foreground">
                  {isRTL
                     ? 'فیلترینگ چند ستونی با عملگرهای مختلف، قالب‌های فیلتر سفارشی و قابلیت‌های جستجوی لحظه‌ای.'
                     : 'Multi-column filtering with various operators, custom filter templates, and real-time search capabilities.'
                   }
                 </p>
               </div>

                             <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
                 <h3 className="text-xl font-semibold mb-3">
                  {isRTL ? 'گروه‌بندی داده' : 'Data Grouping'}
                 </h3>
                 <p className="text-muted-foreground">
                  {isRTL
                     ? 'سازماندهی سلسله‌مراتبی داده با گروه‌بندی درگ‌اند‌دراپ، سرستون‌های گروه سفارشی و توابع تجمیع.'
                     : 'Hierarchical data organization with drag-and-drop grouping, custom group headers, and aggregation functions.'
                   }
                 </p>
               </div>

                             <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
                 <h3 className="text-xl font-semibold mb-3">
                  {isRTL ? 'ویرایش درون‌خطی' : 'Inline Editing'}
                 </h3>
                 <p className="text-muted-foreground">
                  {isRTL
                     ? 'حالت‌های ویرایش سلول و ردیف با اعتبارسنجی، ویرایشگرهای سفارشی و قابلیت‌های به‌روزرسانی دسته‌ای.'
                     : 'Cell and row editing modes with validation, custom editors, and batch update capabilities.'
                   }
                 </p>
               </div>

                             <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
                 <h3 className="text-xl font-semibold mb-3">
                  {isRTL ? 'مدیریت ستون' : 'Column Management'}
                 </h3>
                 <p className="text-muted-foreground">
                  {isRTL
                     ? 'ستون‌های قابل تغییر اندازه و جابه‌جایی با قالب‌های سفارشی، ستون‌های ثابت و طراحی واکنش‌گرا.'
                     : 'Resizable, reorderable columns with custom templates, frozen columns, and responsive design.'
                   }
                 </p>
               </div>

                             <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
                 <h3 className="text-xl font-semibold mb-3">
                  {isRTL ? 'صادرات داده' : 'Data Export'}
                 </h3>
                 <p className="text-muted-foreground">
                  {isRTL
                     ? 'صادرات به فرمت‌های Excel، PDF و CSV با استایل‌بندی سفارشی و گزینه‌های تبدیل داده.'
                     : 'Export to Excel, PDF, and CSV formats with custom styling and data transformation options.'
                   }
                 </p>
               </div>

                             <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
                 <h3 className="text-xl font-semibold mb-3">
                  {isRTL ? 'عملکرد' : 'Performance'}
                 </h3>
                 <p className="text-muted-foreground">
                  {isRTL
                     ? 'اسکرول مجازی، بارگذاری تنبل و رندر بهینه‌شده برای مدیریت کارآمد مجموعه‌های داده بزرگ.'
                     : 'Virtual scrolling, lazy loading, and optimized rendering for handling large datasets efficiently.'
                   }
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* Footer صفحه */}
        <footer className="bg-muted/30 backdrop-blur-sm border-t border-border/50">
          <div className="max-w-7xl mx-auto px-6 py-12">
            {/* گرید لینک‌های footer */}
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
                             <div>
                 <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">
                  {isRTL ? 'جعبه ابزار کامل .NET' : 'Complete .NET Toolbox'}
                 </h4>
                 <div className="space-y-2">
                   <a href="#" className="block text-primary hover:underline font-medium">
                    {isRTL ? 'فرانت راسولی DevCraft' : 'front-rasouli DevCraft'}
                   </a>
                 </div>
                 <h4 className="font-semibold mb-4 mt-6 text-sm uppercase tracking-wide">
                  {isRTL ? 'جعبه ابزار کامل JavaScript' : 'Complete JavaScript Toolbox'}
                 </h4>
                 <div className="space-y-2">
                   <a href="#" className="block text-primary hover:underline font-medium">
                     Kendo UI
                   </a>
                 </div>
               </div>

                             <div>
                 <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">
                  {isRTL ? 'دریافت محصولات' : 'Get Products'}
                 </h4>
                 <div className="space-y-2">
                   <a href="#" className="block text-muted-foreground hover:text-foreground">
                    {isRTL ? 'نسخه‌های آزمایشی رایگان' : 'Free Trials'}
                   </a>
                   <a href="#" className="block text-muted-foreground hover:text-foreground">
                    {isRTL ? 'قیمت‌گذاری' : 'Pricing'}
                   </a>
                 </div>
               </div>

                             <div>
                 <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">
                  {isRTL ? 'منابع' : 'Resources'}
                 </h4>
                 <div className="space-y-2">
                   <a href="#" className="block text-muted-foreground hover:text-foreground">
                    {isRTL ? 'نمونه‌ها' : 'Demos'}
                   </a>
                   <a href="#" className="block text-muted-foreground hover:text-foreground">
                    {isRTL ? 'مستندات' : 'Documentation'}
                   </a>
                   <a href="#" className="block text-muted-foreground hover:text-foreground">
                    {isRTL ? 'تاریخچه انتشار' : 'Release History'}
                   </a>
                   <a href="#" className="block text-muted-foreground hover:text-foreground">
                    {isRTL ? 'انجمن‌ها' : 'Forums'}
                   </a>
                   <a href="#" className="block text-muted-foreground hover:text-foreground">
                    {isRTL ? 'وبلاگ‌ها' : 'Blogs'}
                   </a>
                   <a href="#" className="block text-muted-foreground hover:text-foreground">
                    {isRTL ? 'وبینارها' : 'Webinars'}
                   </a>
                   <a href="#" className="block text-muted-foreground hover:text-foreground">
                    {isRTL ? 'ویدیوها' : 'Videos'}
                   </a>
                   <a href="#" className="block text-muted-foreground hover:text-foreground">
                    {isRTL ? 'خدمات حرفه‌ای' : 'Professional Services'}
                   </a>
                   <a href="#" className="block text-muted-foreground hover:text-foreground">
                    {isRTL ? 'شرکا' : 'Partners'}
                   </a>
                   <a href="#" className="block text-muted-foreground hover:text-foreground">
                    {isRTL ? 'کلاس مجازی' : 'Virtual Classroom'}
                   </a>
                   <a href="#" className="block text-muted-foreground hover:text-foreground">
                    {isRTL ? 'رویدادها' : 'Events'}
                   </a>
                   <a href="#" className="block text-muted-foreground hover:text-foreground">
                    {isRTL ? 'سوالات متداول' : 'FAQs'}
                   </a>
                 </div>
               </div>

                             <div>
                 <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">
                  {isRTL ? 'شناخت' : 'Recognition'}
                 </h4>
                 <div className="space-y-2">
                   <a href="#" className="block text-muted-foreground hover:text-foreground">
                    {isRTL ? 'داستان‌های موفقیت' : 'Success Stories'}
                   </a>
                   <a href="#" className="block text-muted-foreground hover:text-foreground">
                    {isRTL ? 'نظرات مشتریان' : 'Testimonials'}
                   </a>
                 </div>
               </div>

                             <div>
                 <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">
                  {isRTL ? 'تماس با ما' : 'Get in Touch'}
                 </h4>
                 <div className="space-y-2">
                   <a href="#" className="block text-muted-foreground hover:text-foreground">
                    {isRTL ? 'تماس با ما' : 'Contact Us'}
                   </a>
                   <div className="text-sm text-muted-foreground mt-4 space-y-1">
                     <div>USA: +1 888 679 0442</div>
                     <div>UK: +44 13 4483 8186</div>
                     <div>India: +91 406 9019447</div>
                     <div>Bulgaria: +359 2 8099850</div>
                     <div>Australia: +61 3 7068 8610</div>
                   </div>
                 </div>

                <div className="flex items-center gap-4 mt-6">
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                    <span className="text-sm text-muted-foreground">50K+</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="text-sm text-muted-foreground">17K+</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                    </svg>
                    <span className="text-sm text-muted-foreground">4K+</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span className="text-sm text-muted-foreground">14K+</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border/50 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <span className="font-semibold">DataGrid</span>
                </div>

                <div className="text-sm text-muted-foreground text-center">
                  <p>
                    {isRTL
                      ? 'DataGrid یک پروژه اپن سورس است که توسط احمد رسولی طراحی و توسعه یافته است. این پروژه به جامعه اپن سورس تقدیم شده است.'
                      : 'DataGrid is an open source project designed and developed by Ahmad Rasouli. This project is dedicated to the open source community.'
                    }
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    {isRTL ? 'مستندات' : 'Documentation'}
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    {isRTL ? 'نمونه‌ها' : 'Examples'}
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    {isRTL ? 'مشارکت' : 'Contribute'}
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    {isRTL ? 'گزارش مشکل' : 'Report Issue'}
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    {isRTL ? 'درخواست ویژگی' : 'Feature Request'}
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    {isRTL ? 'تغییرات' : 'Changelog'}
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    {isRTL ? 'لایسنس' : 'License'}
                  </a>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-8 border-t border-border/50">
                <div className="text-sm text-muted-foreground">
                  {isRTL
                    ? 'کپی‌رایت © 2025 احمد رسولی. تمامی حقوق محفوظ است. این پروژه تحت لایسنس MIT منتشر شده است.'
                    : 'Copyright © 2025 Ahmad Rasouli. All Rights Reserved. This project is released under MIT License.'
                  }
                </div>

                <div className="flex gap-4 text-sm">
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    {isRTL ? 'شرایط استفاده' : 'Terms of Use'}
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    {isRTL ? 'حریم خصوصی' : 'Privacy'}
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    {isRTL ? 'لایسنس' : 'License'}
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    {isRTL ? 'کد منبع' : 'Source Code'}
                  </a>
                </div>

                <div className="text-sm text-muted-foreground">
                  {isRTL ? 'ساخته شده با' : 'Built with'} <span className="text-primary">Next.js & React</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
