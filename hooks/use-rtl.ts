import { useState, useEffect } from 'react'

export type Language = 'fa' | 'en'

interface UseRTLReturn {
  language: Language
  isRTL: boolean
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  getTextDirection: () => 'rtl' | 'ltr'
  getTextAlignment: (defaultAlignment: 'left' | 'right' | 'center') => 'left' | 'right' | 'center'
  getFlexDirection: (defaultDirection: 'row' | 'row-reverse') => 'row' | 'row-reverse'
  getMargin: (defaultMargin: string) => string
  getPadding: (defaultPadding: string) => string
}

/**
 * Hook برای مدیریت زبان و جهت RTL
 * 
 * این Hook شامل:
 * - مدیریت زبان فارسی/انگلیسی
 * - تشخیص خودکار جهت RTL
 * - توابع کمکی برای تنظیم استایل‌های RTL
 * - ذخیره‌سازی زبان در localStorage
 */
export function useRTL(initialLanguage: Language = 'fa'): UseRTLReturn {
  const [language, setLanguageState] = useState<Language>(initialLanguage)
  
  // تشخیص خودکار RTL بر اساس زبان
  const isRTL = language === 'fa'
  
  // تغییر زبان و ذخیره در localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', lang)
      
      // تنظیم HTML lang و dir attributes
      document.documentElement.lang = lang
      document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr'
      
      // اضافه/حذف کلاس RTL از body
      if (lang === 'fa') {
        document.body.classList.add('rtl')
        document.body.classList.remove('ltr')
      } else {
        document.body.classList.add('ltr')
        document.body.classList.remove('rtl')
      }
    }
  }
  
  // تغییر زبان (toggle)
  const toggleLanguage = () => {
    setLanguage(language === 'fa' ? 'en' : 'fa')
  }
  
  // دریافت جهت متن
  const getTextDirection = (): 'rtl' | 'ltr' => {
    return isRTL ? 'rtl' : 'ltr'
  }
  
  // دریافت تراز متن با در نظر گرفتن RTL
  const getTextAlignment = (defaultAlignment: 'left' | 'right' | 'center'): 'left' | 'right' | 'center' => {
    if (defaultAlignment === 'center') return 'center'
    return isRTL 
      ? (defaultAlignment === 'left' ? 'right' : 'left')
      : defaultAlignment
  }
  
  // دریافت جهت flex با در نظر گرفتن RTL
  const getFlexDirection = (defaultDirection: 'row' | 'row-reverse'): 'row' | 'row-reverse' => {
    if (isRTL) {
      return defaultDirection === 'row' ? 'row-reverse' : 'row'
    }
    return defaultDirection
  }
  
  // دریافت margin با در نظر گرفتن RTL
  const getMargin = (defaultMargin: string): string => {
    if (!isRTL) return defaultMargin
    
    // تبدیل margin-left به margin-right و برعکس
    return defaultMargin
      .replace(/ml-/g, 'mr-')
      .replace(/mr-/g, 'ml-')
      .replace(/ml\[/g, 'mr[')
      .replace(/mr\[/g, 'ml[')
  }
  
  // دریافت padding با در نظر گرفتن RTL
  const getPadding = (defaultPadding: string): string => {
    if (!isRTL) return defaultPadding
    
    // تبدیل padding-left به padding-right و برعکس
    return defaultPadding
      .replace(/pl-/g, 'pr-')
      .replace(/pr-/g, 'pl-')
      .replace(/pl\[/g, 'pr[')
      .replace(/pr\[/g, 'pl[')
  }
  
  // بارگذاری زبان از localStorage در ابتدا
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferred-language') as Language
      if (savedLanguage && (savedLanguage === 'fa' || savedLanguage === 'en')) {
        setLanguage(savedLanguage)
      } else {
        // تنظیم زبان پیش‌فرض
        setLanguage(initialLanguage)
      }
    }
  }, [initialLanguage])
  
  // تنظیم HTML attributes و body classes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
      
      if (isRTL) {
        document.body.classList.add('rtl')
        document.body.classList.remove('ltr')
      } else {
        document.body.classList.add('ltr')
        document.body.classList.remove('rtl')
      }
    }
  }, [language, isRTL])
  
  return {
    language,
    isRTL,
    setLanguage,
    toggleLanguage,
    getTextDirection,
    getTextAlignment,
    getFlexDirection,
    getMargin,
    getPadding,
  }
}
