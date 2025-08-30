import { Button } from "@/components/ui/button"

export function DataGridDescription() {
  return (
    <section className="px-6 py-12 bg-background/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg mb-4">
            <div className="text-4xl font-bold text-primary">⚡</div>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">DataGrid Component</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            The DataGrid component is part of DataGrid, an open source project designed and developed by Ahmad Rasouli. 
            This project is dedicated to the open source community and features modern UI components for building 
            feature-rich applications.
          </p>
          <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3">
            View Source Code
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="glass-card p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-foreground mb-4">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              Visualize data and let users edit it with the powerful DataGrid component. With support for paging,
              sorting, filtering, lazy loading, flexible data binding to any application data source, export, selection,
              powerful state management, templates and many other features, this comprehensive control can be trivially
              setup to cover a variety of use cases.
            </p>
          </div>

          <div className="glass-card p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-foreground mb-4">Demo Features</h3>
            <p className="text-muted-foreground leading-relaxed">
              This demo demonstrates some of the most popular features of the DataGrid. By default
              the items are grouped by Category through the Grid State. You can filter using the filter icon,
              customize rendering with Templates, and group by dragging column headers.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">Key Functionalities and Features</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "DataGrid Filtering - Different options to filter records",
              "DataGrid Grouping - Support for grouping data",
              "DataGrid Selection - Select rows via clicks or checkboxes",
              "DataGrid State - Get or set Grid configuration programmatically",
              "DataGrid Virtual Scrolling - Scroll through all records",
              "DataGrid Row Drag&Drop - Move rows between parents",
              "DataGrid Sorting - Support for sorting data",
              "DataGrid Hierarchy - Nest Grids and visualize relations",
            ].map((feature, index) => (
              <div key={index} className="glass-card p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-foreground mb-4">Support & Learning Resources</h3>
            <ul className="space-y-2">
              {[
                "DataGrid Homepage",
                "DataGrid Overview - Documentation",
                "DataGrid Adaptive Layout",
                "DataGrid Forum",
                "DataGrid GitHub Examples",
                "Knowledge Base Articles",
                "DataGrid Playground",
              ].map((resource, index) => (
                <li key={index}>
                  <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-foreground mb-4">Additional Resources</h3>
            <ul className="space-y-2">
              {[
                "DataGrid Blogs",
                "DataGrid Videos",
                "DataGrid FAQs",
                "DataGrid Roadmap",
                "DataGrid Documentation",
              ].map((resource, index) => (
                <li key={index}>
                  <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
