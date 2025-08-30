"use client"

import { Button } from "@/components/ui/button"
import { PaletteIcon, PaintbrushIcon, AccessibilityIcon, Moon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"

const defaultThemes = [
  { name: "Ocean Blue", value: "ocean", colors: ["#0ea5e9", "#64748b"], icon: null },
  { name: "Ocean Blue A11Y", value: "ocean-a11y", colors: ["#0284c7", "#475569"], icon: <AccessibilityIcon className="h-4 w-4" /> },
  { name: "Main", value: "main", colors: ["#ef4444", "#64748b"], icon: null },
  { name: "Main Dark", value: "main-dark", colors: ["#dc2626", "#374151"], icon: <Moon className="h-4 w-4" /> },
  { name: "Purple", value: "purple", colors: ["#8b5cf6", "#64748b"], icon: null },
  { name: "Turquoise", value: "turquoise", colors: ["#14b8a6", "#64748b"], icon: null },
  { name: "Nordic", value: "nordic", colors: ["#6366f1", "#64748b"], icon: null },
]

const bootstrapThemes = [
  { name: "Main", value: "bootstrap-main", colors: ["#0ea5e9", "#64748b"], icon: null },
]

interface ThemeChangerProps {
  currentTheme: string
  onThemeChange: (theme: string) => void
}

export function ThemeChanger({ currentTheme, onThemeChange }: ThemeChangerProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="glass h-9 w-9">
          <PaletteIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="glass-card w-64 max-h-96 overflow-y-auto" align="end">
        <DropdownMenuLabel className="font-semibold text-sm text-muted-foreground">
          Default Theme
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
            <span className="flex-1">{theme.name}</span>
            {theme.icon && (
              <div className="ml-auto text-muted-foreground">
                {theme.icon}
              </div>
            )}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="font-semibold text-sm text-muted-foreground">
          Bootstrap Theme
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
            <span className="flex-1">{theme.name}</span>
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
          <span>Start Theme Builder</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
