'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useRTL, Language } from '@/hooks/use-rtl'

interface RTLContextType {
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

const RTLContext = createContext<RTLContextType | undefined>(undefined)

interface RTLProviderProps {
  children: ReactNode
  initialLanguage?: Language
}

/**
 * Provider برای مدیریت RTL در کل اپلیکیشن
 * 
 * این کامپوننت شامل:
 * - مدیریت زبان فارسی/انگلیسی
 * - تشخیص خودکار جهت RTL
 * - ارائه context برای کامپوننت‌های فرزند
 * - تنظیم HTML attributes و body classes
 */
export function RTLProvider({ children, initialLanguage = 'fa' }: RTLProviderProps) {
  const rtlContext = useRTL(initialLanguage)
  
  return (
    <RTLContext.Provider value={rtlContext}>
      {children}
    </RTLContext.Provider>
  )
}

/**
 * Hook برای استفاده از RTL context
 * 
 * @returns RTL context value
 * @throws Error اگر خارج از RTLProvider استفاده شود
 */
export function useRTLContext(): RTLContextType {
  const context = useContext(RTLContext)
  if (context === undefined) {
    throw new Error('useRTLContext must be used within an RTLProvider')
  }
  return context
}

/**
 * Hook برای استفاده از RTL context (بدون error)
 * 
 * @returns RTL context value یا undefined
 */
export function useRTLContextSafe(): RTLContextType | undefined {
  return useContext(RTLContext)
}
