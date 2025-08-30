'use client'

import React from 'react'
import { useRTLContext } from '@/components/rtl-provider'

/**
 * کامپوننت نمایش RTL برای تست عملکرد
 * 
 * این کامپوننت شامل:
 * - نمایش متن‌ها با ترازهای مختلف
 * - نمایش دکمه‌ها و فرم‌ها
 * - نمایش جداول و لیست‌ها
 * - نمایش انیمیشن‌های RTL
 */
export function RTLDemo() {
  const { isRTL, language, getTextAlignment, getFlexDirection } = useRTLContext()
  
  return (
    <div className={`${isRTL ? 'rtl' : 'ltr'} p-6 space-y-8`}>
      {/* عنوان اصلی */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {isRTL ? 'نمایش عملکرد RTL' : 'RTL Functionality Demo'}
        </h1>
        <p className="text-xl text-muted-foreground">
          {isRTL 
            ? 'این صفحه عملکرد کامل RTL را برای زبان فارسی نمایش می‌دهد'
            : 'This page demonstrates full RTL functionality for Persian language'
          }
        </p>
      </div>

      {/* بخش تراز متن */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {isRTL ? 'تراز متن' : 'Text Alignment'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card rounded-lg p-4">
            <h3 className="font-medium mb-2 text-left">
              {isRTL ? 'چپ' : 'Left'}
            </h3>
            <p className="text-left text-muted-foreground">
              {isRTL 
                ? 'این متن با تراز چپ نمایش داده می‌شود اما در حالت RTL به راست تراز می‌شود'
                : 'This text is left-aligned but will be right-aligned in RTL mode'
              }
            </p>
          </div>
          
          <div className="glass-card rounded-lg p-4">
            <h3 className="font-medium mb-2 text-center">
              {isRTL ? 'وسط' : 'Center'}
            </h3>
            <p className="text-center text-muted-foreground">
              {isRTL 
                ? 'این متن همیشه در وسط قرار دارد'
                : 'This text is always centered'
              }
            </p>
          </div>
          
          <div className="glass-card rounded-lg p-4">
            <h3 className="font-medium mb-2 text-right">
              {isRTL ? 'راست' : 'Right'}
            </h3>
            <p className="text-right text-muted-foreground">
              {isRTL 
                ? 'این متن با تراز راست نمایش داده می‌شود اما در حالت RTL به چپ تراز می‌شود'
                : 'This text is right-aligned but will be left-aligned in RTL mode'
              }
            </p>
          </div>
        </div>
      </section>

      {/* بخش دکمه‌ها */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {isRTL ? 'دکمه‌ها و فرم‌ها' : 'Buttons and Forms'}
        </h2>
        
        <div className="glass-card rounded-lg p-6">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              {isRTL ? 'دکمه اصلی' : 'Primary Button'}
            </button>
            
            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
              {isRTL ? 'دکمه ثانویه' : 'Secondary Button'}
            </button>
            
            <button className="px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors">
              {isRTL ? 'دکمه خنثی' : 'Neutral Button'}
            </button>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                placeholder={isRTL ? 'نام کاربری' : 'Username'}
                className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input 
                type="password" 
                placeholder={isRTL ? 'رمز عبور' : 'Password'}
                className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">
                  {isRTL ? 'مرا به خاطر بسپار' : 'Remember me'}
                </span>
              </label>
              
              <label className="flex items-center gap-2">
                <input type="radio" name="option" className="w-4 h-4" />
                <span className="text-sm">
                  {isRTL ? 'گزینه اول' : 'Option 1'}
                </span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* بخش جدول */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {isRTL ? 'جدول نمونه' : 'Sample Table'}
        </h2>
        
        <div className="glass-card rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">
                  {isRTL ? 'نام' : 'Name'}
                </th>
                <th className="text-left p-4 font-semibold">
                  {isRTL ? 'سن' : 'Age'}
                </th>
                <th className="text-left p-4 font-semibold">
                  {isRTL ? 'شغل' : 'Occupation'}
                </th>
                <th className="text-left p-4 font-semibold">
                  {isRTL ? 'عملیات' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="p-4">
                  {isRTL ? 'احمد محمدی' : 'Ahmad Mohammadi'}
                </td>
                <td className="p-4">۲۵</td>
                <td className="p-4">
                  {isRTL ? 'برنامه‌نویس' : 'Developer'}
                </td>
                <td className="p-4">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                    {isRTL ? 'ویرایش' : 'Edit'}
                  </button>
                </td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="p-4">
                  {isRTL ? 'فاطمه احمدی' : 'Fatemeh Ahmadi'}
                </td>
                <td className="p-4">۳۰</td>
                <td className="p-4">
                  {isRTL ? 'طراح' : 'Designer'}
                </td>
                <td className="p-4">
                  <button className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600">
                    {isRTL ? 'مشاهده' : 'View'}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* بخش لیست */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {isRTL ? 'لیست نمونه' : 'Sample List'}
        </h2>
        
        <div className="glass-card rounded-lg p-6">
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>
                {isRTL ? 'پشتیبانی کامل از RTL' : 'Full RTL Support'}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span>
                {isRTL ? 'طراحی واکنش‌گرا' : 'Responsive Design'}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>
                {isRTL ? 'انیمیشن‌های نرم' : 'Smooth Animations'}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-destructive rounded-full"></div>
              <span>
                {isRTL ? 'پشتیبانی از تم‌های مختلف' : 'Multiple Theme Support'}
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* بخش انیمیشن */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {isRTL ? 'انیمیشن‌های RTL' : 'RTL Animations'}
        </h2>
        
        <div className="glass-card rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className={`w-16 h-16 bg-primary rounded-full mx-auto mb-4 transition-all duration-1000 ease-out ${
                isRTL ? 'transform translate-x-4 rotate-12 scale-110' : 'transform translate-x-0 rotate-0 scale-100'
              }`}></div>
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'انیمیشن RTL فعال' : 'RTL Animation Active'}
              </p>
            </div>
            
            <div className="text-center">
              <div className={`w-16 h-16 bg-secondary rounded-full mx-auto mb-4 transition-all duration-1000 ease-out ${
                isRTL ? 'transform -translate-x-4 -rotate-12 scale-110' : 'transform translate-x-0 rotate-0 scale-100'
              }`}></div>
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'انیمیشن معکوس' : 'Reverse Animation'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* اطلاعات زبان */}
      <section className="text-center">
        <div className="glass-card rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">
            {isRTL ? 'اطلاعات زبان فعلی' : 'Current Language Info'}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">
                {isRTL ? 'زبان:' : 'Language:'}
              </p>
              <p className="font-medium">{language.toUpperCase()}</p>
            </div>
            
            <div>
              <p className="text-muted-foreground">
                {isRTL ? 'جهت:' : 'Direction:'}
              </p>
              <p className="font-medium">{isRTL ? 'RTL' : 'LTR'}</p>
            </div>
            
            <div>
              <p className="text-muted-foreground">
                {isRTL ? 'تراز متن:' : 'Text Align:'}
              </p>
              <p className="font-medium">
                {getTextAlignment('left') === 'left' ? 'Left' : 'Right'}
              </p>
            </div>
            
            <div>
              <p className="text-muted-foreground">
                {isRTL ? 'جهت flex:' : 'Flex Direction:'}
              </p>
              <p className="font-medium">
                {getFlexDirection('row') === 'row' ? 'Row' : 'Row-Reverse'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
