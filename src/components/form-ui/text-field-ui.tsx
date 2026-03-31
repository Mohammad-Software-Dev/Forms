import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { FieldShell } from "./field-shell";

type TextFieldUIProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  description?: string;
  error?: string;
  placeholder?: string;
  type?: React.ComponentProps<"input">["type"];
  required?: boolean;
  disabled?: boolean;
  autoComplete?: React.ComponentProps<"input">["autoComplete"];
  className?: string;
  inputClassName?: string;
};

function TextFieldUI({
  id,
  label,
  value,
  onChange,
  onBlur,
  description,
  error,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  autoComplete,
  className,
  inputClassName,
}: TextFieldUIProps) {
  return (
    <FieldShell
      className={className}
      htmlFor={id}
      label={label}
      description={description}
      error={error}
      required={required}
    >
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        className={cn(inputClassName)}
        onChange={(event) => onChange(event.target.value)}
        onBlur={() => onBlur?.()}
      />
    </FieldShell>
  );
}

export { TextFieldUI };
