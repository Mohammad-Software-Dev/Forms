import { z } from "zod";

import {
  companySizeSchema,
  industrySchema,
  notificationFrequencySchema,
  notificationsSchema,
  organizationSchema,
  securitySchema,
  ssoProviderSchema,
  ssoProviderSelectionSchema,
  teamMemberSchema,
  teamMembersSchema,
  teamRoleSchema,
  timezoneSchema,
  workspaceSchema,
} from "./schema";

export type CompanySizeValue = z.infer<typeof companySizeSchema>;
export type IndustryValue = z.infer<typeof industrySchema>;
export type NotificationFrequencyValue = z.infer<
  typeof notificationFrequencySchema
>;
export type OrganizationValues = z.infer<typeof organizationSchema>;
export type SecurityValues = z.infer<typeof securitySchema>;
export type NotificationsValues = z.infer<typeof notificationsSchema>;
export type SsoProviderValue = z.infer<typeof ssoProviderSchema>;
export type SsoProviderSelectionValue = z.infer<
  typeof ssoProviderSelectionSchema
>;
export type TeamRoleValue = z.infer<typeof teamRoleSchema>;
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMembers = z.infer<typeof teamMembersSchema>;
export type TimezoneValue = z.infer<typeof timezoneSchema>;
export type WorkspaceFormValues = z.infer<typeof workspaceSchema>;

export type SlugAvailabilityResult = {
  slug: string;
  available: boolean;
  message: string;
};

export type WorkspaceSubmissionResult = {
  success: true;
  workspaceId: string;
  submittedAt: string;
  payload: WorkspaceFormValues;
};
