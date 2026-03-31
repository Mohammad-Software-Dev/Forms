import type { ReactNode } from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FormSectionCardProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

function FormSectionCard({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
}: FormSectionCardProps) {
  return (
    <Card className={cn("gap-0 rounded-2xl border border-border/80", className)}>
      <CardHeader className="gap-2 border-b border-border/70 pb-4">
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
        {action ? <CardAction>{action}</CardAction> : null}
      </CardHeader>
      <CardContent className={cn("grid gap-5 pt-5", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}

export { FormSectionCard };
