import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { ErrorText } from "./error-text";

type FieldShellProps = {
  children: ReactNode;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  layout?: "stacked" | "inline";
};

function FieldShell({
  children,
  label,
  description,
  error,
  required = false,
  htmlFor,
  className,
  layout = "stacked",
}: FieldShellProps) {
  if (layout === "inline") {
    return (
      <div
        className={cn("grid gap-2", className)}
        data-invalid={Boolean(error) || undefined}
      >
        <div className="flex items-start gap-3 rounded-lg border border-border/80 bg-card px-3 py-3">
          <div className="pt-0.5">{children}</div>
          <div className="grid gap-1">
            {label ? (
              <Label htmlFor={htmlFor} className="text-sm font-medium">
                {label}
                {required ? (
                  <span className="text-destructive" aria-hidden="true">
                    {" "}
                    *
                  </span>
                ) : null}
              </Label>
            ) : null}
            {description ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
        </div>
        <ErrorText error={error} />
      </div>
    );
  }

  return (
    <div
      className={cn("grid gap-2", className)}
      data-invalid={Boolean(error) || undefined}
    >
      {label ? (
        <div className="grid gap-1">
          <Label htmlFor={htmlFor} className="text-sm font-medium">
            {label}
            {required ? (
              <span className="text-destructive" aria-hidden="true">
                {" "}
                *
              </span>
            ) : null}
          </Label>
          {description ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}
      {children}
      <ErrorText error={error} />
    </div>
  );
}

export { FieldShell };
