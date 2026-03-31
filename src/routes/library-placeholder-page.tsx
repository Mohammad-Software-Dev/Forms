import { CircleAlert, ArrowRight } from "lucide-react";
import { Link } from "react-router";

import {
  type LibraryRouteId,
  fairnessPrinciples,
  getLibraryRouteMeta,
  libraryRoutes,
} from "@/app/navigation";
import { FormSectionCard } from "@/components/form-ui/form-section-card";
import { InfoPanel } from "@/components/form-ui/info-panel";
import { PageHeader } from "@/components/form-ui/page-header";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  createPlaceholderWorkspaceDiagnostics,
  createWorkspaceComparisonNotes,
} from "@/features/workspace-form/shared/diagnostics";
import { WorkspaceDiagnosticsSidebar } from "@/features/workspace-form/shared/workspace-diagnostics-sidebar";

type LibraryPlaceholderPageProps = {
  routeId: LibraryRouteId;
};

function LibraryPlaceholderPage({ routeId }: LibraryPlaceholderPageProps) {
  const route = getLibraryRouteMeta(routeId);

  if (!route) {
    return null;
  }

  const siblingRoutes = libraryRoutes.filter(
    (candidate) => candidate.id !== route.id,
  );
  const diagnostics = createPlaceholderWorkspaceDiagnostics(route.badgeLabel);
  const comparisonNotes = createWorkspaceComparisonNotes(route.badgeLabel);

  return (
    <div className="grid gap-8">
      <PageHeader
        title={route.title}
        description={route.description}
        badges={[
          { label: route.badgeLabel, variant: "secondary" },
          { label: "Shared Zod Schema", variant: "outline" },
          { label: "Shared UI", variant: "outline" },
          { label: "Phase 3 Diagnostics", variant: "outline" },
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.95fr)]">
        <div className="grid gap-6">
          <Alert className="rounded-2xl border border-border/80 px-4 py-4">
            <CircleAlert className="size-4" />
            <AlertTitle>Implementation scheduled for a later phase</AlertTitle>
            <AlertDescription>{route.placeholderStatus}</AlertDescription>
          </Alert>

          <FormSectionCard
            title="What This Route Will Demonstrate"
            description="The full implementation will plug into the shared schema, defaults, labels, and UI without changing the product requirements."
          >
            <div className="grid gap-3">
              {route.focusAreas.map((focusArea) => (
                <div
                  key={focusArea}
                  className="rounded-xl border border-border/80 bg-muted/35 px-4 py-3 text-sm leading-relaxed text-muted-foreground"
                >
                  {focusArea}
                </div>
              ))}
            </div>
          </FormSectionCard>

          <FormSectionCard
            title="Shared Comparison Contract"
            description="Every library page must stay aligned to these comparison rules."
          >
            <div className="grid gap-3 md:grid-cols-2">
              {fairnessPrinciples.map((principle) => (
                <div
                  key={principle}
                  className="rounded-xl border border-border/80 bg-background px-4 py-3 text-sm leading-relaxed text-muted-foreground"
                >
                  {principle}
                </div>
              ))}
            </div>
          </FormSectionCard>
        </div>

        <div className="grid gap-6 self-start xl:sticky xl:top-6">
          <WorkspaceDiagnosticsSidebar
            libraryLabel={route.badgeLabel}
            diagnostics={diagnostics}
            notes={comparisonNotes}
          />

          <InfoPanel
            title="Jump To Another Library"
            description="These routes already share the same shell and diagnostics surface so the full implementations can be dropped in later without changing the surrounding experience."
          >
            <div className="grid gap-3">
              {siblingRoutes.map((siblingRoute) => (
                <Button
                  key={siblingRoute.id}
                  asChild
                  variant="outline"
                  className="justify-between"
                >
                  <Link to={siblingRoute.path}>
                    {siblingRoute.label}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </InfoPanel>
        </div>
      </div>
    </div>
  );
}

export { LibraryPlaceholderPage };
