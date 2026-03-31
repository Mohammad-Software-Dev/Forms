import { NavLink, Outlet } from "react-router";

import { navigationItems, shellStatusBadges } from "@/app/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="grid gap-1.5">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-primary" />
                <span className="font-heading text-base font-semibold tracking-tight">
                  Workspace Form Comparison
                </span>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Shared UI, shared Zod contract, and route-isolated form engines
                for a fair implementation-focused comparison.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {shellStatusBadges.map((badge) => (
                <Badge
                  key={badge.label}
                  variant={badge.variant ?? "outline"}
                  className="rounded-full px-2.5"
                >
                  {badge.label}
                </Badge>
              ))}
            </div>
          </div>
          <nav className="flex flex-wrap gap-2" aria-label="Primary">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  cn(
                    buttonVariants({
                      variant: isActive ? "secondary" : "ghost",
                      size: "sm",
                    }),
                    "rounded-full",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <Outlet />
      </main>
    </div>
  );
}

export { AppLayout };
