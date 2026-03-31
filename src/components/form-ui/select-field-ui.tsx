import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FieldShell } from "./field-shell";

export type SelectFieldOption = {
  value: string;
  label: string;
  description?: string;
};

type SelectFieldUIProps = {
  id: string;
  label: string;
  value?: string;
  onValueChange: (value: string) => void;
  options: readonly SelectFieldOption[];
  description?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
};

function SelectFieldUI({
  id,
  label,
  value,
  onValueChange,
  options,
  description,
  error,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  className,
  triggerClassName,
}: SelectFieldUIProps) {
  return (
    <FieldShell
      className={className}
      htmlFor={id}
      label={label}
      description={description}
      error={error}
      required={required}
    >
      <Select
        disabled={disabled}
        value={value || undefined}
        onValueChange={onValueChange}
      >
        <SelectTrigger
          id={id}
          aria-invalid={Boolean(error)}
          className={triggerClassName}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="grid gap-0.5">
                <span>{option.label}</span>
                {option.description ? (
                  <span className="text-xs text-muted-foreground">
                    {option.description}
                  </span>
                ) : null}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FieldShell>
  );
}

export { SelectFieldUI };
