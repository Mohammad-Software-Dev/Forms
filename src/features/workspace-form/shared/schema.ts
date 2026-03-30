import { z } from "zod";

import {
  companySizeValues,
  industryValues,
  notificationFrequencyValues,
  ssoProviderValues,
  teamRoleValues,
  timezoneValues,
} from "./options";

export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const billingEmailSchema = z
  .string()
  .trim()
  .email("Enter a valid billing email address.");

const metadataUrlSchema = z
  .string()
  .trim()
  .url("Enter a valid metadata URL.");

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

export const workspaceBasicsSchema = z.object({
  workspaceName: z
    .string()
    .trim()
    .min(3, "Workspace name must be at least 3 characters."),
  slug: z
    .string()
    .trim()
    .min(3, "Slug must be at least 3 characters.")
    .max(50, "Slug must be 50 characters or fewer.")
    .regex(
      slugPattern,
      "Slug must use lowercase letters, numbers, and hyphens only.",
    ),
  adminEmail: z
    .string()
    .trim()
    .email("Enter a valid admin email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string().min(1, "Please confirm the password."),
});

export const organizationSchema = z.object({
  companySize: companySizeSchema,
  industry: industrySchema,
  timezone: timezoneSchema,
});

export const billingSchema = z.object({
  useDifferentBillingContact: z.boolean(),
  billingEmail: z.string().trim(),
});

export const securitySchema = z.object({
  enableSSO: z.boolean(),
  ssoProvider: ssoProviderSelectionSchema,
  ssoDomain: z.string().trim(),
  ssoMetadataUrl: z.string().trim(),
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

export const workspaceSchema = z
  .object({
    workspaceName: workspaceBasicsSchema.shape.workspaceName,
    slug: workspaceBasicsSchema.shape.slug,
    adminEmail: workspaceBasicsSchema.shape.adminEmail,
    password: workspaceBasicsSchema.shape.password,
    confirmPassword: workspaceBasicsSchema.shape.confirmPassword,
    organization: organizationSchema,
    billing: billingSchema,
    security: securitySchema,
    notifications: notificationsSchema,
    teamMembers: teamMembersSchema,
  })
  .superRefine((values, ctx) => {
    if (values.confirmPassword !== values.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      });
    }

    if (values.billing.useDifferentBillingContact) {
      if (!values.billing.billingEmail) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Billing email is required when a different contact is used.",
          path: ["billing", "billingEmail"],
        });
      } else if (
        !billingEmailSchema.safeParse(values.billing.billingEmail).success
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enter a valid billing email address.",
          path: ["billing", "billingEmail"],
        });
      }
    }

    if (values.security.enableSSO) {
      if (!values.security.ssoProvider) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Select an SSO provider.",
          path: ["security", "ssoProvider"],
        });
      }

      if (!values.security.ssoDomain) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "SSO domain is required when SSO is enabled.",
          path: ["security", "ssoDomain"],
        });
      }

      if (!values.security.ssoMetadataUrl) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Metadata URL is required when SSO is enabled.",
          path: ["security", "ssoMetadataUrl"],
        });
      } else if (
        !metadataUrlSchema.safeParse(values.security.ssoMetadataUrl).success
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enter a valid metadata URL.",
          path: ["security", "ssoMetadataUrl"],
        });
      }
    }
  });
