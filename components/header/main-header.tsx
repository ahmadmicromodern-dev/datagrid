"use client"
import { Button } from "@/components/ui/button"
import { MenuIcon, XIcon } from "lucide-react"
import { TelerikMegaMenu } from "./telerik-mega-menu"
import { NavigationMenu } from "./navigation-menu"
import { ThemeChanger } from "../theme/theme-changer"
import { DarkModeToggle } from "../theme/dark-mode-toggle"

interface MainHeaderProps {
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
  isNavMenuOpen: boolean
  setIsNavMenuOpen: (open: boolean) => void
  isDarkMode: boolean
  currentTheme: string
  onThemeChange: (theme: string) => void
  onToggleTheme: () => void
}

export function MainHeader({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isNavMenuOpen,
  setIsNavMenuOpen,
  isDarkMode,
  currentTheme,
  onThemeChange,
  onToggleTheme,
}: MainHeaderProps) {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Side - Components Menu & Logo */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden glass h-9 w-9"
          >
            {isMobileMenuOpen ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </Button>

          <TelerikMegaMenu />

          <NavigationMenu />
        </div>

        {/* Right Side - Theme Controls, Try Now Button & Navigation Menu */}
        <div className="flex items-center gap-2">
          {/* Theme Controls - Hidden on Mobile */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeChanger
              currentTheme={currentTheme}
              onThemeChange={onThemeChange}
            />
            <DarkModeToggle
              isDarkMode={isDarkMode}
              onToggleTheme={onToggleTheme}
            />
          </div>

          {/* Try Now Button - Hidden on Mobile */}
          <Button className="hidden lg:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 text-sm">
            Try Now
          </Button>

          {/* Navigation Menu Button - Right Side Mobile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
            className="lg:hidden glass h-9 w-9 ml-2"
          >
            {isNavMenuOpen ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  )
}
