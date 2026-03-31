import { Switch } from "@/components/ui/switch";

import { FieldShell } from "./field-shell";

type SwitchFieldUIProps = {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  description?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
};

function SwitchFieldUI({
  id,
  label,
  checked,
  onCheckedChange,
  description,
  error,
  disabled = false,
  className,
}: SwitchFieldUIProps) {
  return (
    <FieldShell
      className={className}
      htmlFor={id}
      label={label}
      description={description}
      error={error}
      layout="inline"
    >
      <Switch
        id={id}
        checked={checked}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        onCheckedChange={onCheckedChange}
      />
    </FieldShell>
  );
}

export { SwitchFieldUI };
