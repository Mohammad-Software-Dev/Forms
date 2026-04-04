import { useStore } from "@tanstack/react-form";
import type { ComponentProps, ReactNode } from "react";

import { CheckboxFieldUI } from "@/components/form-ui/checkbox-field-ui";
import { RenderCounter } from "@/components/form-ui/render-counter";
import {
  type SelectFieldOption,
  SelectFieldUI,
} from "@/components/form-ui/select-field-ui";
import { SwitchFieldUI } from "@/components/form-ui/switch-field-ui";
import { TextFieldUI } from "@/components/form-ui/text-field-ui";

import { getFieldErrorText, shouldShowFieldError } from "./field-errors";
import type { WorkspaceTanStackFormApi } from "./use-workspace-tanstack-form";

type BaseFieldProps = {
  form: WorkspaceTanStackFormApi;
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  afterField?: ReactNode;
  renderCounterLabel?: string;
};

type TanStackTextFieldProps = BaseFieldProps & {
  placeholder?: string;
  type?: ComponentProps<"input">["type"];
  autoComplete?: ComponentProps<"input">["autoComplete"];
  onValueChange?: (value: string) => void;
  asyncValidator?: (value: string) => Promise<string | undefined>;
  asyncDebounceMs?: number;
};

type TanStackSelectFieldProps = BaseFieldProps & {
  valuePlaceholder?: string;
  triggerClassName?: string;
  options: readonly SelectFieldOption[];
};

type TanStackBooleanFieldProps = BaseFieldProps & {
  onValueChange?: (checked: boolean) => void;
};

function getFieldId(name: string) {
  return `field-${name.replace(/[\][.]+/g, "-")}`;
}

function TanStackTextField({
  form,
  name,
  label,
  description,
  required = false,
  disabled = false,
  className,
  placeholder,
  type = "text",
  autoComplete,
  onValueChange,
  asyncValidator,
  asyncDebounceMs = 450,
  afterField,
  renderCounterLabel,
}: TanStackTextFieldProps) {
  const submissionAttempts = useStore(form.store, (state) => state.submissionAttempts);

  return (
    <form.Field
      name={name as never}
      validators={
        asyncValidator
          ? ({
              onChangeAsyncDebounceMs: asyncDebounceMs,
              onChangeAsync: async ({ value }: { value: string }) =>
                asyncValidator(value),
            } as never)
          : undefined
      }
    >
      {(field) => {
        const error = shouldShowFieldError(
          field.state.meta.isTouched,
          submissionAttempts,
        )
          ? getFieldErrorText(field.state.meta.errors)
          : undefined;

        return (
          <div className="grid gap-2">
            <TextFieldUI
              id={getFieldId(name)}
              className={className}
              label={label}
              description={description}
              error={error}
              value={String(field.state.value ?? "")}
              onChange={(nextValue) => {
                field.handleChange(nextValue as never);
                onValueChange?.(nextValue);
              }}
              onBlur={field.handleBlur}
              placeholder={placeholder}
              type={type}
              autoComplete={autoComplete}
              required={required}
              disabled={disabled}
            />
            {renderCounterLabel ? (
              <RenderCounter label={renderCounterLabel} />
            ) : null}
            {afterField}
          </div>
        );
      }}
    </form.Field>
  );
}

function TanStackSelectField({
  form,
  name,
  label,
  description,
  required = false,
  disabled = false,
  className,
  valuePlaceholder,
  triggerClassName,
  options,
  afterField,
  renderCounterLabel,
}: TanStackSelectFieldProps) {
  const submissionAttempts = useStore(form.store, (state) => state.submissionAttempts);

  return (
    <form.Field name={name as never}>
      {(field) => {
        const error = shouldShowFieldError(
          field.state.meta.isTouched,
          submissionAttempts,
        )
          ? getFieldErrorText(field.state.meta.errors)
          : undefined;

        return (
          <div className="grid gap-2">
            <SelectFieldUI
              id={getFieldId(name)}
              className={className}
              label={label}
              description={description}
              error={error}
              value={String(field.state.value ?? "")}
              onValueChange={(nextValue) =>
                field.handleChange(nextValue as never)
              }
              options={options}
              placeholder={valuePlaceholder}
              required={required}
              disabled={disabled}
              triggerClassName={triggerClassName}
            />
            {renderCounterLabel ? (
              <RenderCounter label={renderCounterLabel} />
            ) : null}
            {afterField}
          </div>
        );
      }}
    </form.Field>
  );
}

function TanStackSwitchField({
  form,
  name,
  label,
  description,
  disabled = false,
  className,
  onValueChange,
  afterField,
  renderCounterLabel,
}: TanStackBooleanFieldProps) {
  const submissionAttempts = useStore(form.store, (state) => state.submissionAttempts);

  return (
    <form.Field name={name as never}>
      {(field) => {
        const error = shouldShowFieldError(
          field.state.meta.isTouched,
          submissionAttempts,
        )
          ? getFieldErrorText(field.state.meta.errors)
          : undefined;

        return (
          <div className="grid gap-2">
            <SwitchFieldUI
              id={getFieldId(name)}
              className={className}
              label={label}
              description={description}
              error={error}
              checked={Boolean(field.state.value)}
              onCheckedChange={(nextValue) => {
                field.handleChange(nextValue as never);
                onValueChange?.(nextValue);
              }}
              disabled={disabled}
            />
            {renderCounterLabel ? (
              <RenderCounter label={renderCounterLabel} />
            ) : null}
            {afterField}
          </div>
        );
      }}
    </form.Field>
  );
}

function TanStackCheckboxField({
  form,
  name,
  label,
  description,
  disabled = false,
  className,
  onValueChange,
  afterField,
  renderCounterLabel,
}: TanStackBooleanFieldProps) {
  const submissionAttempts = useStore(form.store, (state) => state.submissionAttempts);

  return (
    <form.Field name={name as never}>
      {(field) => {
        const error = shouldShowFieldError(
          field.state.meta.isTouched,
          submissionAttempts,
        )
          ? getFieldErrorText(field.state.meta.errors)
          : undefined;

        return (
          <div className="grid gap-2">
            <CheckboxFieldUI
              id={getFieldId(name)}
              className={className}
              label={label}
              description={description}
              error={error}
              checked={Boolean(field.state.value)}
              onCheckedChange={(nextValue) => {
                field.handleChange(nextValue as never);
                onValueChange?.(nextValue);
              }}
              disabled={disabled}
            />
            {renderCounterLabel ? (
              <RenderCounter label={renderCounterLabel} />
            ) : null}
            {afterField}
          </div>
        );
      }}
    </form.Field>
  );
}

export {
  TanStackCheckboxField,
  TanStackSelectField,
  TanStackSwitchField,
  TanStackTextField,
};
