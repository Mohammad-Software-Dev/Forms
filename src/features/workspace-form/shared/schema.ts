import { z } from "zod";

import {
  companySizeValues,
  industryValues,
  notificationFrequencyValues,
  ssoProviderValues,
  teamRoleValues,
  timezoneValues,
} from "./options";

export const companySizeSchema = z.enum(companySizeValues);
export const industrySchema = z.enum(industryValues);
export const timezoneSchema = z.enum(timezoneValues);
export const notificationFrequencySchema = z.enum(notificationFrequencyValues);
export const ssoProviderSchema = z.enum(ssoProviderValues);
export const ssoProviderSelectionSchema = z.union([
  ssoProviderSchema,
  z.literal(""),
]);

export const teamRoleSchema = z.enum(teamRoleValues);

export const organizationSchema = z.object({
  companySize: companySizeSchema,
  industry: industrySchema,
  timezone: timezoneSchema,
});

export const securitySchema = z.object({
  enableSSO: z.boolean(),
  ssoProvider: ssoProviderSelectionSchema,
  ssoDomain: z.string(),
  ssoMetadataUrl: z.string(),
});

export const notificationsSchema = z.object({
  email: z.boolean(),
  sms: z.boolean(),
  frequency: notificationFrequencySchema,
});

export const teamMemberSchema = z.object({
  id: z.string().trim().min(1, "Team member id is required."),
  name: z.string().trim().min(1, "Team member name is required."),
  email: z.string().trim().email("Enter a valid team member email."),
  role: teamRoleSchema,
});

export const teamMembersSchema = z
  .array(teamMemberSchema)
  .min(1, "Add at least one team member.")
  .refine(
    (members) =>
      new Set(members.map((member) => member.email.trim().toLowerCase())).size ===
      members.length,
    {
      message: "Team member emails must be unique.",
    },
  )
  .refine(
    (members) => members.filter((member) => member.role === "owner").length === 1,
    {
      message: 'Exactly one team member must have the role "owner".',
    },
  );

export const workspaceSchema = z.object({
  organization: organizationSchema,
  security: securitySchema,
  notifications: notificationsSchema,
  teamMembers: teamMembersSchema,
});
