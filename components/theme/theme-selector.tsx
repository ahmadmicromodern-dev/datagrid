"use client"

import { Button } from "@/components/ui/button"
import { PaletteIcon, SunIcon, MoonIcon, PaintbrushIcon, AccessibilityIcon, Moon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { useRTLContext } from "@/components/rtl-provider"

const defaultThemes = [
  { name: "Default Theme", nameFa: "تم پیش‌فرض", value: "default", colors: ["#3b82f6", "#64748b"], icon: null },
  { name: "Ocean Blue", nameFa: "آبی اقیانوس", value: "ocean", colors: ["#0ea5e9", "#64748b"], icon: null },
  { name: "Ocean Blue A11Y", nameFa: "آبی اقیانوس دسترسی", value: "ocean-a11y", colors: ["#0284c7", "#475569"], icon: <AccessibilityIcon className="h-4 w-4" /> },
  { name: "Main", nameFa: "اصلی", value: "main", colors: ["#ef4444", "#64748b"], icon: null },
  { name: "Main Dark", nameFa: "اصلی تاریک", value: "main-dark", colors: ["#dc2626", "#374151"], icon: <Moon className="h-4 w-4" /> },
  { name: "Purple", nameFa: "بنفش", value: "purple", colors: ["#8b5cf6", "#64748b"], icon: null },
  { name: "Turquoise", nameFa: "فیروزه‌ای", value: "turquoise", colors: ["#14b8a6", "#64748b"], icon: null },
  { name: "Nordic", nameFa: "نوردیک", value: "nordic", colors: ["#6366f1", "#64748b"], icon: null },
]

const bootstrapThemes = [
  { name: "Main", nameFa: "اصلی", value: "bootstrap-main", colors: ["#0ea5e9", "#64748b"], icon: null },
]

interface ThemeSelectorProps {
  currentTheme: string
  onThemeChange: (theme: string) => void
  isDarkMode: boolean
  onToggleTheme: () => void
}

export function ThemeSelector({ currentTheme, onThemeChange, isDarkMode, onToggleTheme }: ThemeSelectorProps) {
  const { isRTL } = useRTLContext()
  
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="glass h-9 w-9">
            <PaletteIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="glass-card w-64 max-h-96 overflow-y-auto" align="end">
          <DropdownMenuLabel className="font-semibold text-sm text-muted-foreground">
            {isRTL ? 'تم‌های پیش‌فرض' : 'Default Theme'}
          </DropdownMenuLabel>
          {defaultThemes.map((theme) => (
            <DropdownMenuItem
              key={theme.value}
              onClick={() => onThemeChange(theme.value)}
              className={`flex items-center gap-3 w-full ${currentTheme === theme.value ? "bg-primary/10" : ""}`}
            >
              <div className="flex gap-1">
                {theme.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-full border border-white/20"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="flex-1">{isRTL ? theme.nameFa : theme.name}</span>
              {theme.icon && (
                <div className="ml-auto text-muted-foreground">
                  {theme.icon}
                </div>
              )}
            </DropdownMenuItem>
          ))}
          
          <DropdownMenuSeparator />
          
          <DropdownMenuLabel className="font-semibold text-sm text-muted-foreground">
            {isRTL ? 'تم بوت‌استرپ' : 'Bootstrap Theme'}
          </DropdownMenuLabel>
          {bootstrapThemes.map((theme) => (
            <DropdownMenuItem
              key={theme.value}
              onClick={() => onThemeChange(theme.value)}
              className={`flex items-center gap-3 w-full ${currentTheme === theme.value ? "bg-primary/10" : ""}`}
            >
              <div className="flex gap-1">
                {theme.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-full border border-white/20"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="flex-1">{isRTL ? theme.nameFa : theme.name}</span>
              {theme.icon && (
                <div className="ml-auto text-muted-foreground">
                  {theme.icon}
                </div>
              )}
            </DropdownMenuItem>
          ))}
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem className="flex items-center gap-2 w-full text-primary hover:text-primary">
            <PaintbrushIcon className="h-4 w-4" />
            <span>{isRTL ? 'شروع سازنده تم' : 'Start Theme Builder'}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="ghost" size="icon" onClick={onToggleTheme} className="glass h-9 w-9">
        {isDarkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
      </Button>
    </div>
  )
}
