"use client"

import { Button } from "@/components/ui/button"
import { SunIcon, MoonIcon } from "lucide-react"

interface DarkModeToggleProps {
  isDarkMode: boolean
  onToggleTheme: () => void
}

export function DarkModeToggle({ isDarkMode, onToggleTheme }: DarkModeToggleProps) {
  return (
    <Button variant="ghost" size="icon" onClick={onToggleTheme} className="glass h-9 w-9">
      {isDarkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </Button>
  )
}
