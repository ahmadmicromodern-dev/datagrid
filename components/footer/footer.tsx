export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border/50 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              DataGrid Features
            </h3>
            <div>
              <h4 className="text-lg font-semibold text-foreground">Modern DataGrid</h4>
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sorting & Filtering
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Pagination
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  RTL Support
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Technology Stack
            </h3>
            <div>
              <h4 className="text-lg font-semibold text-foreground">Built with Modern Tech</h4>
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Next.js 15
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  React 19
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  TypeScript
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Resources</h3>
            <ul className="space-y-2">
              {[
                "Documentation",
                "Examples",
                "Source Code",
                "Contributing",
                "Issues",
                "Changelog",
                "License",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Get in Touch</h3>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Contact Us</h4>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>Iran: +989142110690</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Creator</h3>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Ahmad Rasouli</h4>
                <p className="text-xs text-muted-foreground">
                  Designer, Developer & Creator
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">D</span>
                </div>
                <span className="font-semibold text-foreground">DataGrid</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span className="w-4 h-4 bg-blue-600 rounded-sm"></span>
                  <span>React</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-4 h-4 bg-black rounded-sm"></span>
                  <span>Next.js</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-4 h-4 bg-blue-700 rounded-sm"></span>
                  <span>TypeScript</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-4 h-4 bg-purple-600 rounded-sm"></span>
                  <span>Tailwind</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-4 h-4 bg-red-600 rounded-sm"></span>
                  <span>RTL</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-4 h-4 bg-gray-800 rounded-sm"></span>
                  <span>Open Source</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-xs text-muted-foreground">
            <p className="mb-2">
              DataGrid is an open source project designed and developed by Ahmad Rasouli. This project is dedicated to the open source community.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mt-6 pt-6 border-t border-border/50">
            <div className="flex flex-wrap gap-4 text-xs">
              {["Documentation", "Examples", "Contribute", "Report Issue", "Feature Request", "Changelog", "License"].map(
                (item) => (
                  <a key={item} href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                ),
              )}
            </div>

            <div className="flex flex-wrap gap-4 text-xs">
              {["Terms of Use", "Privacy", "License", "Source Code"].map((item) => (
                <a key={item} href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mt-4 text-xs text-muted-foreground">
            <p>
              Copyright © 2025 Ahmad Rasouli. All Rights Reserved. This project is released under MIT License.
            </p>
            <div className="flex items-center gap-2">
              <span>Built with</span>
              <span className="font-semibold">Next.js & React</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
