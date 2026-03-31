import { Checkbox } from "@/components/ui/checkbox";

import { FieldShell } from "./field-shell";

type CheckboxFieldUIProps = {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  description?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
};

function CheckboxFieldUI({
  id,
  label,
  checked,
  onCheckedChange,
  description,
  error,
  disabled = false,
  className,
}: CheckboxFieldUIProps) {
  return (
    <FieldShell
      className={className}
      htmlFor={id}
      label={label}
      description={description}
      error={error}
      layout="inline"
    >
      <Checkbox
        id={id}
        checked={checked}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        onCheckedChange={(nextValue) => onCheckedChange(nextValue === true)}
      />
    </FieldShell>
  );
}

export { CheckboxFieldUI };
