import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type JsonPanelProps = {
  title: string;
  value: unknown;
  description?: string;
  emptyLabel?: string;
  className?: string;
};

function formatJsonValue(value: unknown) {
  if (value === undefined) {
    return null;
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function JsonPanel({
  title,
  value,
  description,
  emptyLabel = "No data available.",
  className,
}: JsonPanelProps) {
  const formattedValue = formatJsonValue(value);

  return (
    <Card className={cn("rounded-2xl border border-border/80", className)}>
      <CardHeader className="gap-1 border-b border-border/70 pb-4">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        {description ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </CardHeader>
      <CardContent className="pt-4">
        {formattedValue ? (
          <pre className="max-h-80 overflow-auto rounded-xl bg-muted/70 p-3 text-xs leading-relaxed text-foreground">
            {formattedValue}
          </pre>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-muted/40 px-3 py-4 text-sm text-muted-foreground">
            {emptyLabel}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { JsonPanel };
