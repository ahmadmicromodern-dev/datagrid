import { Button } from "@/components/ui/button"
import { ThemeChanger } from "../theme/theme-changer"
import { DarkModeToggle } from "../theme/dark-mode-toggle"

const navigationItems = [
  { name: "Overview", href: "#" },
  { name: "Demos", href: "#" },
  { name: "Blazor Hybrid", href: "#" },
  { name: "Roadmap", href: "#" },
  { name: "Docs & Support", href: "#" },
  { name: "Pricing", href: "#" },
]

interface MobileNavigationMenuProps {
  isNavMenuOpen: boolean
  setIsNavMenuOpen: (open: boolean) => void
  currentTheme: string
  onThemeChange: (theme: string) => void
  isDarkMode: boolean
  onToggleTheme: () => void
}

export function MobileNavigationMenu({
  isNavMenuOpen,
  setIsNavMenuOpen,
  currentTheme,
  onThemeChange,
  isDarkMode,
  onToggleTheme,
}: MobileNavigationMenuProps) {
  if (!isNavMenuOpen) return null

  return (
    <div className="lg:hidden fixed inset-0 z-30">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsNavMenuOpen(false)} />
      <div className="absolute right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-background/95 backdrop-blur-sm border-l border-border/50 overflow-hidden flex flex-col h-screen">
        {/* Mobile Header with Close Button */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/30 flex-shrink-0">
          <h2 className="font-semibold text-foreground">Navigation</h2>
          <button
            onClick={() => setIsNavMenuOpen(false)}
            className="p-2 rounded-md hover:bg-muted transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block py-3 text-sm font-semibold text-foreground hover:text-primary transition-colors border-b border-border/30 uppercase tracking-wide"
            >
              {item.name}
            </a>
          ))}

          <div className="pt-2 space-y-3">
            <a
              href="#"
              className="flex items-center gap-3 py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <span>🛒</span>
              <span>SHOPPING CART</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <span>👤</span>
              <span>LOGIN</span>
            </a>
          </div>

          <div className="pt-4 space-y-3">
            <Button variant="outline" className="w-full justify-center py-3 text-sm font-medium bg-transparent">
              CONTACT US
            </Button>
            <Button className="w-full justify-center py-3 text-sm font-medium bg-red-600 hover:bg-red-700 text-white">
              TRY NOW
            </Button>
          </div>

          <div className="pt-4 border-t border-border/50">
            <div className="flex items-center justify-between">
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
          </div>
        </div>
      </div>
    </div>
  )
}
