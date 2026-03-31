import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type InfoPanelProps = {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

function InfoPanel({
  title,
  description,
  children,
  className,
}: InfoPanelProps) {
  return (
    <Card className={cn("rounded-2xl border border-border/80", className)}>
      <CardHeader className="gap-2 border-b border-border/70 pb-4">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="pt-4">{children}</CardContent>
    </Card>
  );
}

export { InfoPanel };
