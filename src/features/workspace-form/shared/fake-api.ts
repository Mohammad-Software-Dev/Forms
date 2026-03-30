import type {
  SlugAvailabilityResult,
  WorkspaceFormValues,
  WorkspaceSubmissionResult,
} from "./types";

const unavailableSlugs = new Set(["acme", "workspace", "admin"]);

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function checkSlugAvailability(
  slug: string,
): Promise<SlugAvailabilityResult> {
  const normalizedSlug = slug.trim().toLowerCase();

  await delay(450);

  if (!normalizedSlug) {
    return {
      slug: normalizedSlug,
      available: false,
      message: "Enter a slug to check availability.",
    };
  }

  if (unavailableSlugs.has(normalizedSlug)) {
    return {
      slug: normalizedSlug,
      available: false,
      message: "This slug is already taken.",
    };
  }

  return {
    slug: normalizedSlug,
    available: true,
    message: "This slug is available.",
  };
}

export async function submitWorkspaceSetup(
  values: WorkspaceFormValues,
): Promise<WorkspaceSubmissionResult> {
  await delay(700);

  return {
    success: true,
    workspaceId: "ws_demo_001",
    submittedAt: new Date().toISOString(),
    payload: values,
  };
}
