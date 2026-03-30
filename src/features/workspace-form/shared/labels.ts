import {
  companySizeOptions,
  industryOptions,
  notificationFrequencyOptions,
  ssoProviderOptions,
  teamRoleOptions,
  timezoneOptions,
} from "./options";

function createOptionDescriptionMap<TValue extends string>(
  options: readonly { value: TValue; description?: string }[],
) {
  return Object.fromEntries(
    options.map((option) => [option.value, option.description ?? ""]),
  ) as Record<TValue, string>;
}

export const companySizeDescriptions = createOptionDescriptionMap(
  companySizeOptions,
);
export const industryDescriptions = createOptionDescriptionMap(industryOptions);
export const notificationFrequencyDescriptions = createOptionDescriptionMap(
  notificationFrequencyOptions,
);
export const ssoProviderDescriptions = createOptionDescriptionMap(
  ssoProviderOptions,
);
export const teamRoleDescriptions = createOptionDescriptionMap(teamRoleOptions);
export const timezoneDescriptions = createOptionDescriptionMap(timezoneOptions);

export const workspaceFormLabels = {
  sections: {
    organization: {
      title: "Organization",
      description:
        "Choose the workspace profile settings that describe the organization.",
    },
    security: {
      title: "Security / SSO",
      description:
        "Configure identity and sign-in preferences for the workspace.",
    },
    teamMembers: {
      title: "Team Members",
      description:
        "Invite the people who should have access to the workspace from day one.",
    },
    notifications: {
      title: "Notifications",
      description:
        "Control how the workspace should deliver updates to the team.",
    },
  },
  fields: {
    organization: {
      companySize: {
        label: "Company Size",
        placeholder: "Select company size",
        description:
          "Used to tailor onboarding and workspace recommendations.",
      },
      industry: {
        label: "Industry",
        placeholder: "Select industry",
        description:
          "Helps contextualize defaults and example content for the workspace.",
      },
      timezone: {
        label: "Timezone",
        placeholder: "Select timezone",
        description:
          "Used for scheduling, notifications, and activity timestamps.",
      },
    },
    security: {
      ssoProvider: {
        label: "SSO Provider",
        placeholder: "Select SSO provider",
        description:
          "Available providers are sourced from the shared SSO option list.",
      },
    },
    teamMembers: {
      name: {
        label: "Full Name",
        placeholder: "Jane Doe",
        description: "Shown in the team list and invite flow.",
      },
      email: {
        label: "Work Email",
        placeholder: "jane@acme.com",
        description: "Each team member must use a unique email address.",
      },
      role: {
        label: "Role",
        placeholder: "Select a role",
        description:
          "Roles are sourced from the shared team role options so every route uses the same allowed values.",
      },
    },
    notifications: {
      frequency: {
        label: "Notification Frequency",
        placeholder: "Select notification frequency",
        description:
          "Use the same shared notification cadence options across all routes.",
      },
    },
  },
} as const;
