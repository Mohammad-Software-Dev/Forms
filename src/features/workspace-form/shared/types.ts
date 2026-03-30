import { z } from "zod";

import {
  billingSchema,
  companySizeSchema,
  industrySchema,
  notificationFrequencySchema,
  notificationsSchema,
  organizationSchema,
  securitySchema,
  slugPattern,
  ssoProviderSchema,
  ssoProviderSelectionSchema,
  teamMemberSchema,
  teamMembersSchema,
  teamRoleSchema,
  timezoneSchema,
  workspaceBasicsSchema,
  workspaceSchema,
} from "./schema";

export type BillingValues = z.infer<typeof billingSchema>;
export type CompanySizeValue = z.infer<typeof companySizeSchema>;
export type IndustryValue = z.infer<typeof industrySchema>;
export type NotificationFrequencyValue = z.infer<
  typeof notificationFrequencySchema
>;
export type NotificationsValues = z.infer<typeof notificationsSchema>;
export type OrganizationValues = z.infer<typeof organizationSchema>;
export type SecurityValues = z.infer<typeof securitySchema>;
export type SsoProviderValue = z.infer<typeof ssoProviderSchema>;
export type SsoProviderSelectionValue = z.infer<
  typeof ssoProviderSelectionSchema
>;
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMembers = z.infer<typeof teamMembersSchema>;
export type TeamRoleValue = z.infer<typeof teamRoleSchema>;
export type TimezoneValue = z.infer<typeof timezoneSchema>;
export type WorkspaceBasicsValues = z.infer<typeof workspaceBasicsSchema>;
export type WorkspaceFormValues = z.infer<typeof workspaceSchema>;
export type WorkspaceSlugPattern = typeof slugPattern;

export type SlugAvailabilityResult = {
  slug: string;
  available: boolean;
  message: string;
  checkedAt: string;
};

export type WorkspaceSubmissionResult =
  | {
      success: true;
      workspaceId: string;
      submittedAt: string;
      message: string;
      payload: WorkspaceFormValues;
    }
  | {
      success: false;
      submittedAt: string;
      message: string;
    };
