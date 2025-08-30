"use client"

import { useState } from "react"
import { ChevronDownIcon } from "lucide-react"

const telerikProducts = {
  "Product Bundles": {
    items: [
      {
        name: "DevCraft",
        badge: "BEST VALUE",
        description: "All Telerik .NET Tools and Kendo UI JavaScript components in one package. Now enhanced with:",
        features: [
          "AI Coding Assistants",
          "Embedded Reporting",
          "Document Processing Libraries",
          "SSO Account Sign-in",
        ],
      },
    ],
  },
  Web: [
    "Kendo UI",
    "UI for Angular",
    "UI for Vue",
    "UI for jQuery",
    "KendoReact",
    "UI for Blazor",
    "UI for ASP.NET Core",
    "UI for ASP.NET MVC",
    "UI for ASP.NET AJAX",
  ],
  Mobile: ["UI for .NET MAUI"],
  "Document Management": ["Telerik Document Processing"],
  Desktop: ["UI for .NET MAUI", "UI for WinUI", "UI for WinForms", "UI for WPF"],
  Reporting: ["Telerik Reporting", "Telerik Report Server"],
  "Testing & Mocking": ["Test Studio", "Telerik JustMock"],
  CMS: ["Sitefinity"],
  "AI Productivity Tools": ["AI Coding Assistants"],
  "UI/UX Tools": ["ThemeBuilder", "Design System Kit", "Templates and Building Blocks"],
  Debugging: ["Fiddler", "Fiddler Everywhere", "Fiddler Classic", "Fiddler Everywhere Reporter", "FiddlerCore"],
  "Free Tools": ["KendoReact Free", "VB.NET to C# Converter", "Testing Framework", "View all products"],
}

export function TelerikMegaMenu() {
  const [isTelerikMenuOpen, setIsTelerikMenuOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsTelerikMenuOpen(true)}
      onMouseLeave={() => setIsTelerikMenuOpen(false)}
    >
      <div className="flex items-center gap-1 text-lg font-semibold text-primary cursor-pointer hover:text-primary/80 transition-colors">
                    DataGrid
        <ChevronDownIcon className="h-4 w-4" />
      </div>

      {isTelerikMenuOpen && (
        <div className="absolute top-full left-0 mt-2 w-[900px] max-w-[95vw] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl z-50">
          <div className="p-8">
            {telerikProducts["Product Bundles"] && (
              <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wide">
                  Product Bundles
                </h3>
                {telerikProducts["Product Bundles"].items.map((bundle) => (
                  <div key={bundle.name} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">📦</span>
                      </div>
                      <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{bundle.name}</h4>
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-medium">
                        {bundle.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{bundle.description}</p>
                    <ul className="space-y-1">
                      {bundle.features.map((feature) => (
                        <li key={feature} className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(telerikProducts)
                .filter(([key]) => key !== "Product Bundles")
                .map(([category, products]) => (
                  <div key={category} className="space-y-4">
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2 uppercase tracking-wide">
                      {category}
                    </h3>
                    <ul className="space-y-2">
                      {products.map((product) => (
                        <li key={product}>
                          <a
                            href="#"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors block py-1 hover:bg-gray-50 dark:hover:bg-gray-800 px-2 rounded"
                          >
                            {product}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
