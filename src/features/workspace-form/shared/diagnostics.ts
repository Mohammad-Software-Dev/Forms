import { defaultWorkspaceValues } from "./default-values";
import type { WorkspaceFormValues } from "./types";

export type WorkspaceFormDiagnostics = {
  values: WorkspaceFormValues;
  errors: Record<string, unknown>;
  dirty: Record<string, unknown>;
  touched: Record<string, unknown>;
  isValid: boolean | null;
  isSubmitting: boolean;
  submitCount: number;
  submittedPayload?: WorkspaceFormValues;
  submitError?: string;
  meta?: Record<string, unknown>;
};

export type WorkspaceDiagnosticsPanel = {
  id:
    | "values"
    | "errors"
    | "dirty"
    | "touched"
    | "submit-state"
    | "submitted-payload"
    | "meta";
  title: string;
  description: string;
  value: unknown;
  emptyLabel?: string;
};

export type WorkspaceComparisonNote = {
  id: string;
  title: string;
  description: string;
};

export function createEmptyWorkspaceDiagnostics(
  overrides: Partial<WorkspaceFormDiagnostics> = {},
): WorkspaceFormDiagnostics {
  return {
    values: defaultWorkspaceValues,
    errors: {},
    dirty: {},
    touched: {},
    isValid: null,
    isSubmitting: false,
    submitCount: 0,
    submittedPayload: undefined,
    submitError: undefined,
    meta: undefined,
    ...overrides,
  };
}

export function createPlaceholderWorkspaceDiagnostics(libraryLabel: string) {
  return createEmptyWorkspaceDiagnostics({
    meta: {
      route: libraryLabel,
      phase: "phase-3",
      mode: "placeholder-diagnostics",
      validationSource: "shared-zod-schema",
      uiSource: "shared-shadcn-tailwind-layer",
      dataState: "mock",
    },
  });
}

export function createWorkspaceDiagnosticsPanels(
  diagnostics: WorkspaceFormDiagnostics,
): readonly WorkspaceDiagnosticsPanel[] {
  return [
    {
      id: "values",
      title: "Current Values",
      description:
        "Normalized value snapshot using the shared workspace form contract.",
      value: diagnostics.values,
      emptyLabel: "Values will appear here once a form adapter is mounted.",
    },
    {
      id: "errors",
      title: "Current Errors",
      description:
        "Validation errors will be mapped into this shared diagnostics surface.",
      value: diagnostics.errors,
      emptyLabel: "No validation errors are available yet.",
    },
    {
      id: "dirty",
      title: "Dirty State",
      description:
        "Field-level dirty tracking will be normalized here for every library.",
      value: diagnostics.dirty,
      emptyLabel: "Dirty state has not been collected yet.",
    },
    {
      id: "touched",
      title: "Touched State",
      description:
        "Touched field information will appear here when a form engine is wired in.",
      value: diagnostics.touched,
      emptyLabel: "Touched state is not available yet.",
    },
    {
      id: "submit-state",
      title: "Submit State",
      description:
        "Shared view of validity, submission progress, and submission counts.",
      value: {
        isValid: diagnostics.isValid,
        isSubmitting: diagnostics.isSubmitting,
        submitCount: diagnostics.submitCount,
        submitError: diagnostics.submitError,
      },
      emptyLabel: "Submit state will appear here once form state exists.",
    },
    {
      id: "submitted-payload",
      title: "Submitted Payload",
      description:
        "The last successful submit payload preview will render here later.",
      value: diagnostics.submittedPayload,
      emptyLabel: "No payload has been submitted yet.",
    },
    {
      id: "meta",
      title: "Diagnostics Meta",
      description:
        "Library-agnostic metadata describing how this diagnostics snapshot was produced.",
      value: diagnostics.meta,
      emptyLabel: "No diagnostics metadata is available.",
    },
  ] as const;
}

export function createWorkspaceComparisonNotes(
  libraryLabel: string,
): readonly WorkspaceComparisonNote[] {
  return [
    {
      id: "shape-stability",
      title: "Stable Diagnostics Shape",
      description: `${libraryLabel} will eventually map its native state into this exact sidebar contract so the comparison stays consistent across routes.`,
    },
    {
      id: "placeholder-mode",
      title: "Placeholder Data For Now",
      description:
        "This phase uses mock diagnostics shaped like the final runtime model so the shell and panel order are locked before any adapter-specific code lands.",
    },
    {
      id: "render-instrumentation",
      title: "Render Instrumentation Path",
      description:
        "The sidebar render counter is active now. Field-level and dynamic-row counters will be attached when the actual form sections are mounted.",
    },
  ] as const;
}
