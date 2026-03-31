import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { InfoPanel } from "@/components/form-ui/info-panel";
import { PageHeader } from "@/components/form-ui/page-header";
import { Button } from "@/components/ui/button";

function NotFoundRoute() {
  return (
    <div className="grid gap-8">
      <PageHeader
        title="Page Not Found"
        description="The requested route does not exist in this demo. Use the main navigation or return to the landing page."
        badges={[
          { label: "404", variant: "secondary" },
          { label: "Catch-All Route", variant: "outline" },
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(300px,0.8fr)]">
        <InfoPanel
          title="Return To The Comparison"
          description="The app shell is working correctly, but the path you entered is outside the current route map."
        >
          <div className="grid gap-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              The available routes in this phase are the landing page plus one
              placeholder page for each form library.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/">
                  Back to Home
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </InfoPanel>
      </div>
    </div>
  );
}

export { NotFoundRoute };
