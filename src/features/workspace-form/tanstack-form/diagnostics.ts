import {
  createEmptyWorkspaceDiagnostics,
  type WorkspaceComparisonNote,
  type WorkspaceFormDiagnostics,
} from "@/features/workspace-form/shared/diagnostics";
import type { SlugAvailabilityResult, WorkspaceFormValues } from "@/features/workspace-form/shared/types";

import type {
  WorkspaceSubmitBanner,
  WorkspaceTanStackFormApi,
} from "./use-workspace-tanstack-form";

type TanStackWorkspaceDiagnosticsArgs = {
  state: WorkspaceTanStackFormApi["state"];
  submittedPayload?: WorkspaceFormValues;
  submitBanner?: WorkspaceSubmitBanner;
  slugAvailability?: SlugAvailabilityResult;
};

type FlatFieldMeta = Record<
  string,
  | {
      errors?: unknown[];
      isDirty?: boolean;
      isTouched?: boolean;
    }
  | undefined
>;

function extractErrorMessages(input: unknown): string[] {
  if (!input) {
    return [];
  }

  if (Array.isArray(input)) {
    return input.flatMap((value) => extractErrorMessages(value));
  }

  if (typeof input === "string") {
    return input ? [input] : [];
  }

  if (
    input &&
    typeof input === "object" &&
    "message" in input &&
    typeof input.message === "string"
  ) {
    return input.message ? [input.message] : [];
  }

  return [];
}

function mapFieldErrors(fieldMeta: FlatFieldMeta) {
  const errors: Record<string, string[]> = {};

  Object.entries(fieldMeta).forEach(([fieldPath, meta]) => {
    if (!meta) {
      return;
    }

    const messages = extractErrorMessages(meta.errors);

    if (messages.length > 0) {
      errors[fieldPath] = messages;
    }
  });

  return errors;
}

function mapBooleanFlags(
  fieldMeta: FlatFieldMeta,
  key: "isDirty" | "isTouched",
) {
  const flags: Record<string, boolean> = {};

  Object.entries(fieldMeta).forEach(([fieldPath, meta]) => {
    if (meta?.[key]) {
      flags[fieldPath] = true;
    }
  });

  return flags;
}

function createTanStackWorkspaceDiagnostics({
  state,
  submittedPayload,
  submitBanner,
  slugAvailability,
}: TanStackWorkspaceDiagnosticsArgs): WorkspaceFormDiagnostics {
  const fieldMeta = (state.fieldMeta ?? {}) as FlatFieldMeta;
  const errors = mapFieldErrors(fieldMeta);
  const formLevelErrors = extractErrorMessages(state.errors);

  if (formLevelErrors.length > 0) {
    errors.form = formLevelErrors;
  }

  return createEmptyWorkspaceDiagnostics({
    values: state.values,
    errors,
    dirty: mapBooleanFlags(fieldMeta, "isDirty"),
    touched: mapBooleanFlags(fieldMeta, "isTouched"),
    isValid: state.isValid,
    isSubmitting: state.isSubmitting,
    submitCount: state.submissionAttempts,
    submittedPayload,
    submitError:
      submitBanner?.variant === "error" ? submitBanner.message : undefined,
    meta: {
      implementation: "tanstack-form",
      canSubmit: state.canSubmit,
      isSubmitted: state.isSubmitted,
      isSubmitSuccessful: state.isSubmitSuccessful,
      isValidating: state.isValidating,
      isFieldsValidating: state.isFieldsValidating,
      slugAvailability,
      submitBanner,
    },
  });
}

const tanStackComparisonNotes: readonly WorkspaceComparisonNote[] = [
  {
    id: "headless-primitives",
    title: "Headless Composition",
    description:
      "The live route is built from reusable TanStack-aware adapters over the shared field UI, which is the strongest architecture fit for long-term form systems.",
  },
  {
    id: "single-contract",
    title: "Shared Contract Preserved",
    description:
      "Validation, defaults, labels, async slug checks, and submit behavior still come from the shared layers, so the visible differences are now about the form engine itself.",
  },
  {
    id: "live-diagnostics",
    title: "Live Diagnostics Mapping",
    description:
      "TanStack form state is already being normalized into the shared diagnostics sidebar, establishing the mapping contract the other adapters will later follow.",
  },
] as const;

export {
  createTanStackWorkspaceDiagnostics,
  tanStackComparisonNotes,
};
