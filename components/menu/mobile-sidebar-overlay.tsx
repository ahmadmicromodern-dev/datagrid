"use client"

import { ComponentsSidebar } from "@/components/components-sidebar"
import { ThemeChanger } from "../theme/theme-changer"
import { DarkModeToggle } from "../theme/dark-mode-toggle"

interface MobileSidebarOverlayProps {
  isMobileMenuOpen: boolean
  onClose: () => void
  currentTheme: string
  onThemeChange: (theme: string) => void
  isDarkMode: boolean
  onToggleTheme: () => void
}

export function MobileSidebarOverlay({ 
  isMobileMenuOpen, 
  onClose, 
  currentTheme, 
  onThemeChange, 
  isDarkMode, 
  onToggleTheme 
}: MobileSidebarOverlayProps) {
  if (!isMobileMenuOpen) return null

  return (
    <div className="lg:hidden fixed inset-0 z-30">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-background/95 backdrop-blur-sm border-r border-border/50 overflow-hidden flex flex-col h-screen">
        {/* Mobile Header with Close Button */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/30 flex-shrink-0">
          <h2 className="font-semibold text-foreground">Components</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Theme Controls for Mobile */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/20 flex-shrink-0">
          <span className="text-sm font-medium text-muted-foreground">Theme</span>
          <div className="flex items-center gap-2">
            <ThemeChanger
              currentTheme={currentTheme}
              onThemeChange={onThemeChange}
            />
            <DarkModeToggle
              isDarkMode={isDarkMode}
              onToggleTheme={onToggleTheme}
            />
          </div>
        </div>

        {/* Scrollable Components Content */}
        <div className="flex-1 overflow-y-auto">
          <ComponentsSidebar />
        </div>
      </div>
    </div>
  )
}
