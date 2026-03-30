import type { TeamMember, WorkspaceFormValues } from "./types";

export function createEmptyTeamMember(
  overrides: Partial<TeamMember> = {},
): TeamMember {
  return {
    id: overrides.id ?? "team-member-1",
    name: "",
    email: "",
    role: "member",
    ...overrides,
  };
}

export const defaultWorkspaceValues: WorkspaceFormValues = {
  organization: {
    companySize: "11-50",
    industry: "saas",
    timezone: "Europe/Berlin",
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
