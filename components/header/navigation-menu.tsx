const navigationItems = [
  { name: "Overview", href: "#" },
  { name: "Demos", href: "#" },
  { name: "Blazor Hybrid", href: "#" },
  { name: "Roadmap", href: "#" },
  { name: "Docs & Support", href: "#" },
  { name: "Pricing", href: "#" },
]

export function NavigationMenu() {
  return (
    <nav className="hidden lg:flex items-center gap-6">
      {navigationItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          {item.name}
        </a>
      ))}
    </nav>
  )
}
