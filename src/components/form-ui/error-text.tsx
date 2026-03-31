import { cn } from "@/lib/utils";

type ErrorTextProps = {
  error?: string;
  className?: string;
};

function ErrorText({ error, className }: ErrorTextProps) {
  if (!error) {
    return null;
  }

  return (
    <p
      role="alert"
      className={cn("text-sm font-medium text-destructive", className)}
    >
      {error}
    </p>
  );
}

export { ErrorText };
