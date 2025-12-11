import { AppLayout } from "@/components/layout/AppLayout";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your document intelligence projects
          </p>
        </div>
        
        {/* Placeholder for project grid - will be implemented in Phase 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
            <p className="text-muted-foreground text-sm">
              No projects yet. Create your first project to get started.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
