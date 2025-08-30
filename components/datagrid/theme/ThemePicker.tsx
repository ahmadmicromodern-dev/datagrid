"use client"

import React from "react"
import { themes } from "@/components/datagrid/themes"
import { useRTLContext } from "@/components/rtl-provider"

export interface ThemePickerProps {
  currentTheme: string
  onThemeChange: (value: string) => void
}

export const ThemePicker: React.FC<ThemePickerProps> = ({ currentTheme, onThemeChange }) => {
  const { isRTL } = useRTLContext()
  
  return (
    <div className="glass-card rounded-xl p-4 lg:p-6">
      <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between mb-4 lg:mb-6">
        <div className="text-center lg:text-left">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            🎨 {isRTL ? 'تم‌های موجود' : 'Available Themes'}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm lg:text-base">
            {isRTL ? 'از مجموعه تم‌های زیبای ما انتخاب کنید' : 'Choose from our collection of beautiful themes'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
          {themes.map((theme) => (
            <button
              key={theme.value}
              onClick={() => onThemeChange(theme.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentTheme === theme.value
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
              style={{ border: currentTheme === theme.value ? `2px solid ${theme.colors[0]}` : "2px solid transparent" }}
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {theme.colors.map((color, index) => (
                    <div key={index} className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <span>{isRTL ? theme.nameFa : theme.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}


