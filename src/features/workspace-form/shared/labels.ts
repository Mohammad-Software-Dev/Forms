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
    workspaceBasics: {
      title: "Workspace Basics",
      description:
        "Set the core identity and admin credentials for the new workspace.",
    },
    organization: {
      title: "Organization",
      description:
        "Choose the workspace profile settings that describe the organization.",
    },
    billing: {
      title: "Billing",
      description:
        "Control whether billing messages should go to a separate contact.",
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
    workspaceBasics: {
      workspaceName: {
        label: "Workspace Name",
        placeholder: "Acme Operations",
        description:
          "Use a clear, recognizable name for the team workspace.",
      },
      slug: {
        label: "Workspace Slug",
        placeholder: "acme-operations",
        description:
          "Used in workspace URLs. Lowercase letters, numbers, and hyphens only.",
      },
      adminEmail: {
        label: "Admin Email",
        placeholder: "admin@acme.com",
        description:
          "Primary administrative contact for invitations and system messages.",
      },
      password: {
        label: "Password",
        placeholder: "Create a secure password",
        description:
          "Must be at least 8 characters for this demo workspace setup.",
      },
      confirmPassword: {
        label: "Confirm Password",
        placeholder: "Re-enter the password",
        description: "Must match the password entered above.",
      },
    },
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
    billing: {
      useDifferentBillingContact: {
        label: "Use Different Billing Contact",
        description:
          "Enable this if billing communications should go to a separate inbox.",
      },
      billingEmail: {
        label: "Billing Email",
        placeholder: "billing@acme.com",
        description:
          "Required only when a separate billing contact is enabled.",
      },
    },
    security: {
      enableSSO: {
        label: "Enable SSO",
        description:
          "Turn this on if the workspace should sign in through an identity provider.",
      },
      ssoProvider: {
        label: "SSO Provider",
        placeholder: "Select SSO provider",
        description:
          "Available providers are sourced from the shared SSO option list.",
      },
      ssoDomain: {
        label: "SSO Domain",
        placeholder: "acme.com",
        description:
          "Used to associate the workspace with the correct identity domain.",
      },
      ssoMetadataUrl: {
        label: "SSO Metadata URL",
        placeholder: "https://idp.acme.com/metadata",
        description:
          "Provide the metadata endpoint for the configured identity provider.",
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
      email: {
        label: "Email Notifications",
        description:
          "Enable email delivery for workspace activity and updates.",
      },
      sms: {
        label: "SMS Notifications",
        description: "Enable text-message alerts for important events.",
      },
      frequency: {
        label: "Notification Frequency",
        placeholder: "Select notification frequency",
        description:
          "Use the same shared notification cadence options across all routes.",
      },
    },
  },
  actions: {
    addTeamMember: "Add Team Member",
    submit: "Create Workspace",
  },
} as const;
