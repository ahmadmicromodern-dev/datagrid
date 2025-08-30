'use client'

import React from 'react'
import { useRTLContext } from '@/components/rtl-provider'
import { Language } from '@/hooks/use-rtl'

interface LanguageSwitcherProps {
  variant?: 'default' | 'compact' | 'icon-only'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showLabel?: boolean
  showFlag?: boolean
}

/**
 * کامپوننت تغییر زبان با پشتیبانی از RTL
 * 
 * ویژگی‌ها:
 * - تغییر بین فارسی و انگلیسی
 * - پشتیبانی کامل از RTL
 * - انیمیشن‌های نرم
 * - طراحی responsive
 * - پشتیبانی از تم‌های مختلف
 */
export function LanguageSwitcher({
  variant = 'default',
  size = 'md',
  className = '',
  showLabel = true,
  showFlag = true,
}: LanguageSwitcherProps) {
  const { language, isRTL, toggleLanguage } = useRTLContext()
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
  }
  
  const variantClasses = {
    default: 'bg-background border border-border hover:bg-muted transition-all duration-200',
    compact: 'bg-transparent hover:bg-muted/50 transition-colors duration-200',
    'icon-only': 'bg-transparent hover:bg-muted/50 transition-colors duration-200 p-2',
  }
  
  const flagEmojis = {
    fa: '🇮🇷',
    en: '🇺🇸',
  }
  
  const languageNames = {
    fa: 'فارسی',
    en: 'English',
  }
  
  const languageCodes = {
    fa: 'FA',
    en: 'EN',
  }
  
  return (
    <button
      onClick={toggleLanguage}
      className={`
        inline-flex items-center gap-2 rounded-md font-medium
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
        ${isRTL ? 'rtl' : 'ltr'}
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        transition-all duration-300 ease-out
        ${isRTL ? 'hover:scale-105' : 'hover:scale-105'}
      `}
      aria-label={`Switch to ${language === 'fa' ? 'English' : 'فارسی'}`}
      title={language === 'fa' ? 'Switch to English' : 'تغییر به فارسی'}
    >
      {/* Flag Icon */}
      {showFlag && (
        <span 
          className={`
            text-lg transition-all duration-300 ease-out
            ${isRTL ? 'transform rotate-12 scale-110' : 'transform rotate-0 scale-100'}
          `}
          role="img"
          aria-label={language === 'fa' ? 'Iran Flag' : 'US Flag'}
        >
          {flagEmojis[language]}
        </span>
      )}
      
      {/* Language Code */}
      <span 
        className={`
          font-bold transition-all duration-300 ease-out
          ${isRTL ? 'text-blue-600' : 'text-green-600'}
          ${isRTL ? 'transform translate-x-1' : 'transform translate-x-0'}
        `}
      >
        {languageCodes[language]}
      </span>
      
      {/* Language Name */}
      {showLabel && variant !== 'icon-only' && (
        <span 
          className={`
            hidden sm:inline transition-all duration-300 ease-out
            ${isRTL ? 'transform translate-x-1' : 'transform translate-x-0'}
          `}
        >
          {languageNames[language]}
        </span>
      )}
      
      {/* Switch Icon */}
      <svg 
        className={`
          w-4 h-4 transition-all duration-300 ease-out
          ${isRTL ? 'transform rotate-180 scale-110' : 'transform rotate-0 scale-100'}
          text-muted-foreground
        `}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" 
        />
      </svg>
    </button>
  )
}

/**
 * کامپوننت تغییر زبان ساده (فقط آیکون)
 */
export function SimpleLanguageSwitcher({ className = '' }: { className?: string }) {
  return (
    <LanguageSwitcher
      variant="icon-only"
      size="sm"
      className={className}
      showLabel={false}
      showFlag={false}
    />
  )
}

/**
 * کامپوننت تغییر زبان فشرده
 */
export function CompactLanguageSwitcher({ className = '' }: { className?: string }) {
  return (
    <LanguageSwitcher
      variant="compact"
      size="sm"
      className={className}
      showLabel={true}
      showFlag={true}
    />
  )
}
