import { AppLayout } from "@/components/layout/AppLayout";

export default function PromptsLibrary() {
  return (
    <AppLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Prompts Library</h1>
          <p className="text-muted-foreground mt-1">
            Save and manage your frequently used prompts
          </p>
        </div>
        
        {/* Placeholder - will be implemented in Phase 4 */}
        <div className="border border-dashed border-border rounded-lg p-8 flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground text-sm">
            Prompts library coming soon...
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
