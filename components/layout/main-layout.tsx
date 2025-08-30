"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MainHeader } from "@/components/header/main-header"
import { MobileNavigationMenu } from "@/components/menu/mobile-navigation-menu"
import { MobileSidebarOverlay } from "@/components/menu/mobile-sidebar-overlay"
import { ComponentsSidebar } from "@/components/components-sidebar"
import { Footer } from "@/components/footer/footer"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentTheme, setCurrentTheme] = useState("default")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark")
    }
  }

  const handleThemeChange = (themeName: string) => {
    setCurrentTheme(themeName)
    const themes = [
      { name: "Default Theme", value: "default", colors: ["#3b82f6", "#64748b"] },
      { name: "Ocean Blue", value: "ocean", colors: ["#0ea5e9", "#64748b"] },
      { name: "Ocean Blue A11Y", value: "ocean-a11y", colors: ["#0284c7", "#475569"] },
      { name: "Main", value: "main", colors: ["#ef4444", "#64748b"] },
      { name: "Main Dark", value: "main-dark", colors: ["#dc2626", "#374151"] },
      { name: "Purple", value: "purple", colors: ["#8b5cf6", "#64748b"] },
      { name: "Turquoise", value: "turquoise", colors: ["#14b8a6", "#64748b"] },
      { name: "Nordic", value: "nordic", colors: ["#6366f1", "#64748b"] },
    ]
    const theme = themes.find((t) => t.value === themeName)
    if (theme && typeof window !== "undefined" && typeof document !== "undefined") {
      document.documentElement.style.setProperty("--theme-primary", theme.colors[0])
      document.documentElement.style.setProperty("--theme-secondary", theme.colors[1])
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme) {
        setCurrentTheme(savedTheme)
        const themes = [
          { name: "Default Theme", value: "default", colors: ["#3b82f6", "#64748b"] },
          { name: "Ocean Blue", value: "ocean", colors: ["#0ea5e9", "#64748b"] },
          { name: "Ocean Blue A11Y", value: "ocean-a11y", colors: ["#0284c7", "#475569"] },
          { name: "Main", value: "main", colors: ["#ef4444", "#64748b"] },
          { name: "Main Dark", value: "main-dark", colors: ["#dc2626", "#374151"] },
          { name: "Purple", value: "purple", colors: ["#8b5cf6", "#64748b"] },
          { name: "Turquoise", value: "turquoise", colors: ["#14b8a6", "#64748b"] },
          { name: "Nordic", value: "nordic", colors: ["#6366f1", "#64748b"] },
        ]
        const theme = themes.find((t) => t.value === savedTheme)
        if (theme) {
          document.documentElement.style.setProperty("--theme-primary", theme.colors[0])
          document.documentElement.style.setProperty("--theme-secondary", theme.colors[1])
        }
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", currentTheme)
    }
  }, [currentTheme])

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
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <MainHeader
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isNavMenuOpen={isNavMenuOpen}
        setIsNavMenuOpen={setIsNavMenuOpen}
        isDarkMode={isDarkMode}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        onToggleTheme={toggleTheme}
      />

      <MobileNavigationMenu
        isNavMenuOpen={isNavMenuOpen}
        setIsNavMenuOpen={setIsNavMenuOpen}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      <div className="flex flex-1 min-h-0">
        <div className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0">
          <ComponentsSidebar />
        </div>

        <MobileSidebarOverlay 
          isMobileMenuOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)}
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
        />

        <main className="flex-1 min-w-0 overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent pt-0">{children}</main>
      </div>

      <Footer />
    </div>
  )
}
