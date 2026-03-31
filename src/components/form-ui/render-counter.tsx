import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type RenderCounterProps = {
  label: string;
  className?: string;
};

function RenderCounter({ label, className }: RenderCounterProps) {
  const renderCount = useRef(0);
  // Diagnostic-only render counters need to observe render frequency directly.
  // eslint-disable-next-line react-hooks/refs
  renderCount.current += 1;
  // eslint-disable-next-line react-hooks/refs
  const count = renderCount.current;

  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <Badge variant="outline" className="rounded-full px-2.5">
        {count}
      </Badge>
    </div>
  );
}

export { RenderCounter };
