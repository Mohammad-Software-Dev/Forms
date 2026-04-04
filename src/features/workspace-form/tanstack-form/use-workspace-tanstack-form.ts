import { useForm } from "@tanstack/react-form";
import { useRef, useState } from "react";

import { defaultWorkspaceValues } from "@/features/workspace-form/shared/default-values";
import { checkSlugAvailability, submitWorkspaceSetup } from "@/features/workspace-form/shared/fake-api";
import { workspaceSchema, workspaceSlugSchema } from "@/features/workspace-form/shared/schema";
import type {
  SlugAvailabilityResult,
  WorkspaceFormValues,
} from "@/features/workspace-form/shared/types";

type WorkspaceSubmitBanner =
  | {
      variant: "success" | "error";
      title: string;
      message: string;
      submittedAt: string;
    }
  | null;

function useWorkspaceTanStackForm() {
  const [submittedPayload, setSubmittedPayload] = useState<
    WorkspaceFormValues | undefined
  >(undefined);
  const [submitBanner, setSubmitBanner] = useState<WorkspaceSubmitBanner>(null);
  const [slugAvailability, setSlugAvailability] = useState<
    SlugAvailabilityResult | undefined
  >(undefined);
  const latestSlugRequestRef = useRef("");

  const form = useForm({
    defaultValues: defaultWorkspaceValues,
    validators: {
      onChange: workspaceSchema,
      onSubmit: workspaceSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitBanner(null);

      const result = await submitWorkspaceSetup(value);

      if (result.success) {
        setSubmittedPayload(result.payload);
        setSubmitBanner({
          variant: "success",
          title: "Workspace created successfully",
          message: result.message,
          submittedAt: result.submittedAt,
        });
        return;
      }

      setSubmitBanner({
        variant: "error",
        title: "Workspace creation failed",
        message: result.message,
        submittedAt: result.submittedAt,
      });
    },
  });

  async function validateSlugAvailability(value: string) {
    const parsedSlug = workspaceSlugSchema.safeParse(value);

    if (!parsedSlug.success) {
      latestSlugRequestRef.current = "";
      setSlugAvailability(undefined);
      return undefined;
    }

    const normalizedSlug = parsedSlug.data;
    latestSlugRequestRef.current = normalizedSlug;

    const result = await checkSlugAvailability(normalizedSlug);

    if (latestSlugRequestRef.current !== normalizedSlug) {
      return undefined;
    }

    setSlugAvailability(result);
    return result.available ? undefined : result.message;
  }

  return {
    form,
    slugAvailability,
    submitBanner,
    submittedPayload,
    validateSlugAvailability,
  };
}

export { useWorkspaceTanStackForm };
export type UseWorkspaceTanStackFormResult = ReturnType<
  typeof useWorkspaceTanStackForm
>;
export type WorkspaceTanStackFormApi =
  UseWorkspaceTanStackFormResult["form"];
export type { WorkspaceSubmitBanner };
