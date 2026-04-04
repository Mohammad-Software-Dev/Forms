import type { TeamMember, WorkspaceFormValues } from "./types";

let nextTeamMemberId = 1;

export function createTeamMemberId() {
  nextTeamMemberId += 1;
  return `team-member-${nextTeamMemberId}`;
}

export function createEmptyTeamMember(
  overrides: Partial<TeamMember> = {},
): TeamMember {
  return {
    id: overrides.id ?? createTeamMemberId(),
    name: "",
    email: "",
    role: "member",
    ...overrides,
  };
}

export const defaultWorkspaceValues: WorkspaceFormValues = {
  workspaceName: "",
  slug: "",
  adminEmail: "",
  password: "",
  confirmPassword: "",
  organization: {
    companySize: "11-50",
    industry: "saas",
    timezone: "Europe/Berlin",
  },
  billing: {
    useDifferentBillingContact: false,
    billingEmail: "",
  },
  security: {
    enableSSO: false,
    ssoProvider: "",
    ssoDomain: "",
    ssoMetadataUrl: "",
  },
  notifications: {
    email: true,
    sms: false,
    frequency: "weekly",
  },
  teamMembers: [
    createEmptyTeamMember({
      id: "team-member-1",
      role: "owner",
    }),
  ],
};
