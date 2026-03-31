import { InfoPanel } from "@/components/form-ui/info-panel";
import { JsonPanel } from "@/components/form-ui/json-panel";
import { RenderCounter } from "@/components/form-ui/render-counter";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import {
  createWorkspaceDiagnosticsPanels,
  type WorkspaceComparisonNote,
  type WorkspaceFormDiagnostics,
} from "./diagnostics";

type WorkspaceDiagnosticsSidebarProps = {
  libraryLabel: string;
  diagnostics: WorkspaceFormDiagnostics;
  notes?: readonly WorkspaceComparisonNote[];
  className?: string;
};

function WorkspaceDiagnosticsSidebar({
  libraryLabel,
  diagnostics,
  notes = [],
  className,
}: WorkspaceDiagnosticsSidebarProps) {
  const panels = createWorkspaceDiagnosticsPanels(diagnostics);

  return (
    <div className={cn("grid gap-4", className)}>
      <InfoPanel
        title="Diagnostics Sidebar"
        description="A shared panel order and shared data shape keep the comparison consistent across all form library routes."
      >
        <div className="grid gap-3">
          <Badge variant="secondary" className="w-fit rounded-full px-2.5">
            {libraryLabel}
          </Badge>
          <p className="text-sm leading-relaxed text-muted-foreground">
            These panels currently render placeholder diagnostics that already
            match the normalized adapter contract planned for later phases.
          </p>
          <RenderCounter label="Sidebar render count" />
        </div>
      </InfoPanel>

      {notes.length > 0 ? (
        <InfoPanel
          title="Comparison Notes"
          description="Static notes that frame what this route will expose once the real form adapter is mounted."
        >
          <div className="grid gap-3">
            {notes.map((note) => (
              <div
                key={note.id}
                className="rounded-xl border border-border/80 bg-muted/35 px-4 py-3"
              >
                <h3 className="text-sm font-medium">{note.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {note.description}
                </p>
              </div>
            ))}
          </div>
        </InfoPanel>
      ) : null}

      {panels.map((panel) => (
        <JsonPanel
          key={panel.id}
          title={panel.title}
          description={panel.description}
          value={panel.value}
          emptyLabel={panel.emptyLabel}
        />
      ))}
    </div>
  );
}

export { WorkspaceDiagnosticsSidebar };
