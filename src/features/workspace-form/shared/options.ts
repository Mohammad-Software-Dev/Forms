export type SelectOption<TValue extends string = string> = {
  value: TValue;
  label: string;
  description?: string;
};

// Example pattern: keep options, labels, and the derived union type together.
// You can repeat this shape for companySize, industry, timezone, ssoProvider, etc.
export const teamRoleOptions = [
  {
    value: "owner",
    label: "Owner",
    description: "Primary accountable owner with full workspace access.",
  },
  {
    value: "admin",
    label: "Admin",
    description: "Can manage members, settings, and most workspace actions.",
  },
  {
    value: "member",
    label: "Member",
    description: "Standard collaborator with regular project access.",
  },
] as const satisfies readonly SelectOption[];

export type TeamRole = (typeof teamRoleOptions)[number]["value"];

export const teamRoleValues = teamRoleOptions.map((option) => option.value) as [
  TeamRole,
  ...TeamRole[],
];

export const companySizeOptions = [
  {
    value: "1-10",
    label: "1-10 employees",
    description: "Small founding team or early-stage startup.",
  },
  {
    value: "11-50",
    label: "11-50 employees",
    description: "Growing team with a few departments in place.",
  },
  {
    value: "51-200",
    label: "51-200 employees",
    description: "Scaling organization with broader operational needs.",
  },
  {
    value: "201-1000",
    label: "201-1,000 employees",
    description: "Mid-sized company with multiple business functions.",
  },
  {
    value: "1000+",
    label: "1,000+ employees",
    description: "Large organization with enterprise-scale requirements.",
  },
] as const satisfies readonly SelectOption[];

export type CompanySize = (typeof companySizeOptions)[number]["value"];

export const companySizeValues = companySizeOptions.map((option) => option.value) as [
  CompanySize,
  ...CompanySize[],
];

export const industryOptions = [
  {
    value: "saas",
    label: "SaaS",
    description: "Software companies delivering products as cloud services.",
  },
  {
    value: "finance",
    label: "Finance",
    description: "Financial services, fintech, and related operations.",
  },
  {
    value: "healthcare",
    label: "Healthcare",
    description: "Healthcare providers, healthtech, and patient-facing services.",
  },
  {
    value: "ecommerce",
    label: "E-commerce",
    description: "Retail, commerce operations, and direct-to-consumer brands.",
  },
  {
    value: "education",
    label: "Education",
    description: "Educational institutions, edtech, and learning platforms.",
  },
] as const satisfies readonly SelectOption[];

export type Industry = (typeof industryOptions)[number]["value"];

export const industryValues = industryOptions.map((option) => option.value) as [
  Industry,
  ...Industry[],
];

export const notificationFrequencyOptions = [
  {
    value: "instant",
    label: "Instant",
    description: "Receive important updates as soon as they happen.",
  },
  {
    value: "daily",
    label: "Daily digest",
    description: "Get a consolidated summary once per day.",
  },
  {
    value: "weekly",
    label: "Weekly digest",
    description: "Receive a summary of changes once per week.",
  },
] as const satisfies readonly SelectOption[];

export type NotificationFrequency =
  (typeof notificationFrequencyOptions)[number]["value"];

export const notificationFrequencyValues = notificationFrequencyOptions.map(
  (option) => option.value,
) as [NotificationFrequency, ...NotificationFrequency[]];

export const ssoProviderOptions = [
  {
    value: "okta",
    label: "Okta",
    description: "Common enterprise identity provider for workforce SSO.",
  },
  {
    value: "google-workspace",
    label: "Google Workspace",
    description: "Use Google Workspace as the identity source for sign-in.",
  },
  {
    value: "microsoft-entra",
    label: "Microsoft Entra ID",
    description: "Integrate with Microsoft's cloud identity platform.",
  },
  {
    value: "one-login",
    label: "OneLogin",
    description: "Connect an existing OneLogin workforce identity setup.",
  },
] as const satisfies readonly SelectOption[];

export type SsoProvider = (typeof ssoProviderOptions)[number]["value"];

export const ssoProviderValues = ssoProviderOptions.map((option) => option.value) as [
  SsoProvider,
  ...SsoProvider[],
];

export const timezoneOptions = [
  {
    value: "UTC",
    label: "UTC",
    description: "Coordinated Universal Time.",
  },
  {
    value: "Europe/Berlin",
    label: "Europe/Berlin",
    description: "Central European time for Berlin and similar regions.",
  },
  {
    value: "America/New_York",
    label: "America/New_York",
    description: "Eastern Time for New York and the U.S. East Coast.",
  },
  {
    value: "America/Los_Angeles",
    label: "America/Los_Angeles",
    description: "Pacific Time for Los Angeles and the U.S. West Coast.",
  },
  {
    value: "Asia/Dubai",
    label: "Asia/Dubai",
    description: "Gulf Standard Time for Dubai and nearby regions.",
  },
] as const satisfies readonly SelectOption[];

export type Timezone = (typeof timezoneOptions)[number]["value"];

export const timezoneValues = timezoneOptions.map((option) => option.value) as [
  Timezone,
  ...Timezone[],
];
