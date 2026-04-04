type NavItem = {
  path: string;
  label: string;
  description: string;
};

export type LibraryRouteId = "tanstack-form" | "react-hook-form" | "formik";

export type LibraryRouteMeta = NavItem & {
  id: LibraryRouteId;
  title: string;
  badgeLabel: string;
  implementationState: "live" | "placeholder";
  placeholderStatus: string;
  focusAreas: readonly string[];
};

type HeaderBadge = {
  label: string;
  variant?: "default" | "secondary" | "outline";
};

export const homeRoute: NavItem = {
  path: "/",
  label: "Home",
  description:
    "Neutral overview of the shared contract, UI layer, and comparison goals.",
};

export const libraryRoutes: readonly LibraryRouteMeta[] = [
  {
    id: "tanstack-form",
    path: "/tanstack-form",
    label: "TanStack Form",
    title: "TanStack Form",
    description:
      "Headless, composable form architecture for deeply nested, scalable, type-safe systems.",
    badgeLabel: "TanStack Form",
    implementationState: "live",
    placeholderStatus:
      "This route is reserved for the first full implementation so the comparison baseline is established on the most composable architecture first.",
    focusAreas: [
      "Composable field primitives and reusable headless adapters",
      "Type-safe handling for nested objects, conditional sections, and dynamic arrays",
      "A long-term architecture suited to complex, scalable form systems",
    ],
  },
  {
    id: "react-hook-form",
    path: "/react-hook-form",
    label: "React Hook Form",
    title: "React Hook Form",
    description:
      "Concise, production-friendly form ergonomics with strong support for common input patterns.",
    badgeLabel: "React Hook Form",
    implementationState: "placeholder",
    placeholderStatus:
      "This route will mirror the exact same workspace setup flow after the TanStack baseline is in place, preserving the shared schema, defaults, and UI.",
    focusAreas: [
      "Compact field registration and pragmatic field-array APIs",
      "Strong ergonomics for standard production forms and incremental adoption",
      "A fair comparison against the same shared contract and visual system",
    ],
  },
  {
    id: "formik",
    path: "/formik",
    label: "Formik",
    title: "Formik",
    description:
      "Explicit values, errors, and touched state that keep the mental model readable and familiar.",
    badgeLabel: "Formik",
    implementationState: "placeholder",
    placeholderStatus:
      "This route will land after the other adapters are scaffolded, using the same Zod schema and product requirements instead of a separate validation model.",
    focusAreas: [
      "Readable state flow with explicit values, errors, and touched structures",
      "A familiar mental model that works well for smaller or simpler form surfaces",
      "A faithful comparison against the same validation rules and submit behavior",
    ],
  },
] as const;

export const navigationItems: readonly NavItem[] = [
  homeRoute,
  ...libraryRoutes,
] as const;

export const sharedStackBadges: readonly HeaderBadge[] = [
  { label: "React Router", variant: "outline" },
  { label: "Zod", variant: "outline" },
  { label: "shadcn/ui", variant: "outline" },
  { label: "Tailwind CSS", variant: "outline" },
  { label: "Vite + React", variant: "outline" },
] as const;

export const fairnessPrinciples = [
  "One shared Zod schema defines the data model and validation rules for every route.",
  "One shared shadcn and Tailwind presentation layer keeps the UI identical across libraries.",
  "One shared set of defaults, labels, and mocked backend behaviors prevents feature drift.",
  "Each route should differ only in the form engine integration and the resulting developer ergonomics.",
] as const;

export const shellStatusBadges: readonly HeaderBadge[] = [
  { label: "Phase 4", variant: "secondary" },
  { label: "TanStack Live", variant: "outline" },
  { label: "Diagnostics Ready", variant: "outline" },
  { label: "RHF / Formik Pending", variant: "outline" },
] as const;

export function getLibraryRouteMeta(id: LibraryRouteId) {
  return libraryRoutes.find((route) => route.id === id);
}
