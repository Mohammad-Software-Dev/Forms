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

const trimmedStringSchema = z.string().trim();
export const workspaceSlugSchema = trimmedStringSchema
  .min(3, { error: "Slug must be at least 3 characters." })
  .max(50, { error: "Slug must be 50 characters or fewer." })
  .regex(slugPattern, {
    error: "Slug must use lowercase letters, numbers, and hyphens only.",
  });

const billingEmailSchema = trimmedStringSchema.pipe(
  z.email({ error: "Enter a valid billing email address." }),
);

const metadataUrlSchema = trimmedStringSchema.pipe(
  z.url({ error: "Enter a valid metadata URL." }),
);

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
  workspaceName: trimmedStringSchema.min(3, {
    error: "Workspace name must be at least 3 characters.",
  }),
  slug: workspaceSlugSchema,
  adminEmail: trimmedStringSchema.pipe(
    z.email({ error: "Enter a valid admin email address." }),
  ),
  password: z.string().min(8, {
    error: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(1, {
    error: "Please confirm the password.",
  }),
});

export const organizationSchema = z.object({
  companySize: companySizeSchema,
  industry: industrySchema,
  timezone: timezoneSchema,
});

export const billingSchema = z.object({
  useDifferentBillingContact: z.boolean(),
  billingEmail: trimmedStringSchema,
});

export const securitySchema = z.object({
  enableSSO: z.boolean(),
  ssoProvider: ssoProviderSelectionSchema,
  ssoDomain: trimmedStringSchema,
  ssoMetadataUrl: trimmedStringSchema,
});

export const notificationsSchema = z.object({
  email: z.boolean(),
  sms: z.boolean(),
  frequency: notificationFrequencySchema,
});

export const teamMemberSchema = z.object({
  id: trimmedStringSchema.min(1, {
    error: "Team member id is required.",
  }),
  name: trimmedStringSchema.min(1, {
    error: "Team member name is required.",
  }),
  email: trimmedStringSchema.pipe(
    z.email({ error: "Enter a valid team member email." }),
  ),
  role: teamRoleSchema,
});

export const teamMembersSchema = z
  .array(teamMemberSchema)
  .min(1, { error: "Add at least one team member." })
  .check((ctx) => {
    const normalizedEmails = ctx.value.map((member) =>
      member.email.trim().toLowerCase(),
    );

    if (new Set(normalizedEmails).size !== normalizedEmails.length) {
      ctx.issues.push({
        code: "custom",
        input: ctx.value,
        message: "Team member emails must be unique.",
      });
    }

    if (
      ctx.value.filter((member) => member.role === "owner").length !== 1
    ) {
      ctx.issues.push({
        code: "custom",
        input: ctx.value,
        message: 'Exactly one team member must have the role "owner".',
      });
    }
  });

const workspaceSchemaBase = workspaceBasicsSchema.extend({
  organization: organizationSchema,
  billing: billingSchema,
  security: securitySchema,
  notifications: notificationsSchema,
  teamMembers: teamMembersSchema,
});

export const workspaceSchema = workspaceSchemaBase.check((ctx) => {
  const values = ctx.value;

  if (values.confirmPassword !== values.password) {
    ctx.issues.push({
      code: "custom",
      input: values.confirmPassword,
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    });
  }

  if (values.billing.useDifferentBillingContact) {
    if (!values.billing.billingEmail) {
      ctx.issues.push({
        code: "custom",
        input: values.billing.billingEmail,
        message: "Billing email is required when a different contact is used.",
        path: ["billing", "billingEmail"],
      });
    } else if (!billingEmailSchema.safeParse(values.billing.billingEmail).success) {
      ctx.issues.push({
        code: "custom",
        input: values.billing.billingEmail,
        message: "Enter a valid billing email address.",
        path: ["billing", "billingEmail"],
      });
    }
  }

  if (values.security.enableSSO) {
    if (!values.security.ssoProvider) {
      ctx.issues.push({
        code: "custom",
        input: values.security.ssoProvider,
        message: "Select an SSO provider.",
        path: ["security", "ssoProvider"],
      });
    }

    if (!values.security.ssoDomain) {
      ctx.issues.push({
        code: "custom",
        input: values.security.ssoDomain,
        message: "SSO domain is required when SSO is enabled.",
        path: ["security", "ssoDomain"],
      });
    }

    if (!values.security.ssoMetadataUrl) {
      ctx.issues.push({
        code: "custom",
        input: values.security.ssoMetadataUrl,
        message: "Metadata URL is required when SSO is enabled.",
        path: ["security", "ssoMetadataUrl"],
      });
    } else if (
      !metadataUrlSchema.safeParse(values.security.ssoMetadataUrl).success
    ) {
      ctx.issues.push({
        code: "custom",
        input: values.security.ssoMetadataUrl,
        message: "Enter a valid metadata URL.",
        path: ["security", "ssoMetadataUrl"],
      });
    }
  }
});
