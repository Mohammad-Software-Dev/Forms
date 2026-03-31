import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PageHeaderBadge = {
  label: string;
  variant?: "default" | "secondary" | "outline";
};

type PageHeaderProps = {
  title: string;
  description: string;
  badges?: readonly PageHeaderBadge[];
  actions?: ReactNode;
  className?: string;
};

function PageHeader({
  title,
  description,
  badges = [],
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("grid gap-4", className)}>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="grid max-w-3xl gap-3">
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <Badge
                key={badge.label}
                variant={badge.variant ?? "outline"}
                className="rounded-full px-2.5"
              >
                {badge.label}
              </Badge>
            ))}
          </div>
          <div className="grid gap-2">
            <h1 className="font-heading text-3xl font-semibold tracking-tight">
              {title}
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {description}
            </p>
          </div>
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
    </header>
  );
}

export { PageHeader };
