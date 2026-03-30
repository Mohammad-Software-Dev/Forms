import type {
  SlugAvailabilityResult,
  WorkspaceFormValues,
  WorkspaceSubmissionResult,
} from "./types";

const unavailableSlugs = new Set(["acme", "workspace", "admin"]);
const explicitlyAvailableSlugs = new Set(["acme-team"]);

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function checkSlugAvailability(
  slug: string,
): Promise<SlugAvailabilityResult> {
  const normalizedSlug = slug.trim().toLowerCase();
  const checkedAt = new Date().toISOString();

  await delay(450);

  if (!normalizedSlug) {
    return {
      slug: normalizedSlug,
      available: false,
      message: "Enter a slug to check availability.",
      checkedAt,
    };
  }

  if (unavailableSlugs.has(normalizedSlug)) {
    return {
      slug: normalizedSlug,
      available: false,
      message: "This slug is already taken.",
      checkedAt,
    };
  }

  return {
    slug: normalizedSlug,
    available: true,
    message: explicitlyAvailableSlugs.has(normalizedSlug)
      ? "This slug is available."
      : "Slug is available for use.",
    checkedAt,
  };
}

export async function submitWorkspaceSetup(
  values: WorkspaceFormValues,
): Promise<WorkspaceSubmissionResult> {
  await delay(700);

  if (values.slug === "workspace-error") {
    return {
      success: false,
      submittedAt: new Date().toISOString(),
      message: "The workspace could not be created. Please try again.",
    };
  }

  return {
    success: true,
    workspaceId: "ws_demo_001",
    submittedAt: new Date().toISOString(),
    message: "Workspace created successfully.",
    payload: values,
  };
}
