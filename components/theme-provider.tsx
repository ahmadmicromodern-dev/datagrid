"use client"

import { createContext, useContext, useEffect, useState } from "react"

interface ThemeContextType {
  isDarkMode: boolean
  currentTheme: string
  toggleTheme: () => void
  setTheme: (theme: string) => void
  isClient: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentTheme, setCurrentTheme] = useState("default")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setCurrentTheme(savedTheme)
    }
    
    // Load saved dark mode from localStorage
    const savedDarkMode = localStorage.getItem("darkMode")
    if (savedDarkMode === "true") {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem("darkMode", newDarkMode.toString())
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const setTheme = (themeName: string) => {
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
    if (theme) {
      document.documentElement.style.setProperty("--theme-primary", theme.colors[0])
      document.documentElement.style.setProperty("--theme-secondary", theme.colors[1])
      localStorage.setItem("theme", themeName)
    }
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, currentTheme, toggleTheme, setTheme, isClient }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
