import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import {
  fairnessPrinciples,
  libraryRoutes,
  sharedStackBadges,
} from "@/app/navigation";
import { FormSectionCard } from "@/components/form-ui/form-section-card";
import { InfoPanel } from "@/components/form-ui/info-panel";
import { PageHeader } from "@/components/form-ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function HomeRoute() {
  return (
    <div className="grid gap-8">
      <PageHeader
        title="Form Library Comparison"
        description="A single workspace setup app designed to compare TanStack Form, React Hook Form, and Formik with the same UI, the same Zod schema, and the same product requirements."
        badges={sharedStackBadges}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.95fr)]">
        <div className="grid gap-6">
          <FormSectionCard
            title="Explore The Library Routes"
            description="Each route uses the same surrounding shell so the eventual differences come from the form engine itself rather than the page composition."
          >
            <div className="grid gap-4 lg:grid-cols-3">
              {libraryRoutes.map((route) => (
                <Card
                  key={route.id}
                  className="rounded-2xl border border-border/80 bg-background"
                >
                  <CardHeader className="gap-3 border-b border-border/70 pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="grid gap-1.5">
                        <CardTitle>{route.label}</CardTitle>
                        <CardDescription>{route.description}</CardDescription>
                      </div>
                      <Badge
                        variant="secondary"
                        className="rounded-full px-2.5 text-xs"
                      >
                        {route.badgeLabel}
                      </Badge>
                      <Badge
                        variant={
                          route.implementationState === "live"
                            ? "secondary"
                            : "outline"
                        }
                        className="rounded-full px-2.5 text-xs"
                      >
                        {route.implementationState === "live"
                          ? "Live Route"
                          : "Placeholder"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-2 pt-4">
                    {route.focusAreas.map((focusArea) => (
                      <p
                        key={focusArea}
                        className="text-sm leading-relaxed text-muted-foreground"
                      >
                        {focusArea}
                      </p>
                    ))}
                  </CardContent>
                  <CardFooter className="items-center justify-between gap-3">
                    <span className="text-xs text-muted-foreground">
                      {route.implementationState === "live"
                        ? "Live form route available"
                        : "Placeholder route ready"}
                    </span>
                    <Button asChild size="sm">
                      <Link to={route.path}>
                        {route.implementationState === "live"
                          ? "Open live route"
                          : "Open route"}
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </FormSectionCard>

          <FormSectionCard
            title="Fairness Constraints"
            description="These rules keep the comparison honest when the actual form implementations land."
          >
            <div className="grid gap-3 md:grid-cols-2">
              {fairnessPrinciples.map((principle) => (
                <div
                  key={principle}
                  className="rounded-xl border border-border/80 bg-muted/30 px-4 py-3 text-sm leading-relaxed text-muted-foreground"
                >
                  {principle}
                </div>
              ))}
            </div>
          </FormSectionCard>
        </div>

        <div className="grid gap-6 self-start xl:sticky xl:top-6">
          <InfoPanel
            title="Why This App Structure Matters"
            description="The project is intentionally organized so the comparison isolates library behavior instead of page-level differences."
          >
            <div className="grid gap-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                The shared Zod schema defines the business contract once and
                keeps validation aligned.
              </p>
              <p>
                The shared presentation layer keeps labels, layout, and control
                styling identical across routes.
              </p>
              <p>
                The route-specific code should ultimately differ only in the
                form engine integration and the resulting maintenance
                characteristics.
              </p>
            </div>
          </InfoPanel>

          <InfoPanel
            title="Current Project Status"
            description="Phase 4 delivers the first live TanStack Form route while React Hook Form and Formik remain on the shared placeholder shell."
          >
            <div className="grid gap-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="rounded-full px-2.5">
                  TanStack Live
                </Badge>
                <Badge variant="outline" className="rounded-full px-2.5">
                  Shared Shell
                </Badge>
                <Badge variant="outline" className="rounded-full px-2.5">
                  Diagnostics Surface
                </Badge>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                The next implementation phases can now add React Hook Form and
                Formik against a shell that already has a live TanStack
                baseline, a shared diagnostics contract, and shared UI
                primitives in place.
              </p>
            </div>
          </InfoPanel>
        </div>
      </div>
    </div>
  );
}

export { HomeRoute };
