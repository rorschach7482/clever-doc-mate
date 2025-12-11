import { AppLayout } from "@/components/layout/AppLayout";
import { useParams } from "react-router-dom";

export default function ProjectWorkspace() {
  const { projectId } = useParams();

  return (
    <AppLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Project Workspace</h1>
          <p className="text-muted-foreground mt-1">
            Project ID: {projectId}
          </p>
        </div>
        
        {/* Placeholder - Tabs will be implemented in Phase 3 */}
        <div className="border border-dashed border-border rounded-lg p-8 flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground text-sm">
            Chat, Documents, and Members tabs coming soon...
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
