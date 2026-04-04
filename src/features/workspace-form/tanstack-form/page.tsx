import { useStore } from "@tanstack/react-form";
import { CircleAlert, CircleCheckBig, Plus } from "lucide-react";

import { FormSectionCard } from "@/components/form-ui/form-section-card";
import { PageHeader } from "@/components/form-ui/page-header";
import { WorkspaceDiagnosticsSidebar } from "@/features/workspace-form/shared/workspace-diagnostics-sidebar";
import { createEmptyTeamMember } from "@/features/workspace-form/shared/default-values";
import { workspaceFormLabels } from "@/features/workspace-form/shared/labels";
import {
  companySizeOptions,
  industryOptions,
  notificationFrequencyOptions,
  ssoProviderOptions,
  timezoneOptions,
} from "@/features/workspace-form/shared/options";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  TanStackCheckboxField,
  TanStackSelectField,
  TanStackSwitchField,
  TanStackTextField,
} from "./adapters";
import {
  createTanStackWorkspaceDiagnostics,
  tanStackComparisonNotes,
} from "./diagnostics";
import { getFieldErrorText } from "./field-errors";
import { TeamMemberRow } from "./team-member-row";
import { useWorkspaceTanStackForm } from "./use-workspace-tanstack-form";

function TanStackFormPage() {
  const {
    form,
    slugAvailability,
    submitBanner,
    submittedPayload,
    validateSlugAvailability,
  } = useWorkspaceTanStackForm();

  const submissionAttempts = useStore(form.store, (state) => state.submissionAttempts);
  const billingEnabled = useStore(
    form.store,
    (state) => state.values.billing.useDifferentBillingContact,
  );
  const ssoEnabled = useStore(
    form.store,
    (state) => state.values.security.enableSSO,
  );

  return (
    <div className="grid gap-8">
      <PageHeader
        title="TanStack Form"
        description="A live implementation of the shared workspace setup flow using TanStack Form, the shared Zod contract, the shared UI layer, and the same mocked async behavior used across the comparison app."
        badges={[
          { label: "TanStack Form", variant: "secondary" },
          { label: "Live Implementation", variant: "outline" },
          { label: "Shared Zod Schema", variant: "outline" },
          { label: "Shared UI", variant: "outline" },
          { label: "Phase 4", variant: "outline" },
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(340px,0.95fr)]">
        <form
          className="grid gap-6"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <FormSectionCard
            title={workspaceFormLabels.sections.workspaceBasics.title}
            description={workspaceFormLabels.sections.workspaceBasics.description}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <TanStackTextField
                form={form}
                name="workspaceName"
                label={workspaceFormLabels.fields.workspaceBasics.workspaceName.label}
                description={
                  workspaceFormLabels.fields.workspaceBasics.workspaceName.description
                }
                placeholder={
                  workspaceFormLabels.fields.workspaceBasics.workspaceName.placeholder
                }
                autoComplete="organization"
                required
                renderCounterLabel="workspaceName field renders"
              />

              <TanStackTextField
                form={form}
                name="slug"
                label={workspaceFormLabels.fields.workspaceBasics.slug.label}
                description={workspaceFormLabels.fields.workspaceBasics.slug.description}
                placeholder={workspaceFormLabels.fields.workspaceBasics.slug.placeholder}
                autoComplete="off"
                required
                asyncValidator={validateSlugAvailability}
                afterField={
                  <form.Subscribe
                    selector={(state) => {
                      const fieldMeta = (
                        state.fieldMeta as Record<
                          string,
                          | {
                              errors?: unknown[];
                              isValidating?: boolean;
                            }
                          | undefined
                        >
                      ).slug;

                      return {
                        slug: state.values.slug,
                        isValidating: Boolean(fieldMeta?.isValidating),
                        hasSyncError:
                          Boolean(getFieldErrorText(fieldMeta?.errors)) &&
                          (submissionAttempts > 0 || Boolean(fieldMeta?.errors?.length)),
                      };
                    }}
                  >
                    {({ slug, isValidating, hasSyncError }) => {
                      if (!slug || hasSyncError) {
                        return null;
                      }

                      if (isValidating) {
                        return (
                          <p className="text-xs text-muted-foreground">
                            Checking slug availability...
                          </p>
                        );
                      }

                      if (!slugAvailability || slugAvailability.slug !== slug.trim()) {
                        return (
                          <p className="text-xs text-muted-foreground">
                            Pause typing to run the async availability check.
                          </p>
                        );
                      }

                      return (
                        <p
                          className={
                            slugAvailability.available
                              ? "text-xs font-medium text-emerald-600"
                              : "text-xs font-medium text-destructive"
                          }
                        >
                          {slugAvailability.message}
                        </p>
                      );
                    }}
                  </form.Subscribe>
                }
              />

              <TanStackTextField
                form={form}
                name="adminEmail"
                label={workspaceFormLabels.fields.workspaceBasics.adminEmail.label}
                description={
                  workspaceFormLabels.fields.workspaceBasics.adminEmail.description
                }
                placeholder={
                  workspaceFormLabels.fields.workspaceBasics.adminEmail.placeholder
                }
                type="email"
                autoComplete="email"
                required
              />

              <TanStackTextField
                form={form}
                name="password"
                label={workspaceFormLabels.fields.workspaceBasics.password.label}
                description={workspaceFormLabels.fields.workspaceBasics.password.description}
                placeholder={workspaceFormLabels.fields.workspaceBasics.password.placeholder}
                type="password"
                autoComplete="new-password"
                required
              />

              <TanStackTextField
                form={form}
                name="confirmPassword"
                className="md:col-span-2"
                label={workspaceFormLabels.fields.workspaceBasics.confirmPassword.label}
                description={
                  workspaceFormLabels.fields.workspaceBasics.confirmPassword.description
                }
                placeholder={
                  workspaceFormLabels.fields.workspaceBasics.confirmPassword.placeholder
                }
                type="password"
                autoComplete="new-password"
                required
              />
            </div>
          </FormSectionCard>

          <FormSectionCard
            title={workspaceFormLabels.sections.organization.title}
            description={workspaceFormLabels.sections.organization.description}
          >
            <div className="grid gap-4 md:grid-cols-3">
              <TanStackSelectField
                form={form}
                name="organization.companySize"
                label={workspaceFormLabels.fields.organization.companySize.label}
                description={
                  workspaceFormLabels.fields.organization.companySize.description
                }
                valuePlaceholder={
                  workspaceFormLabels.fields.organization.companySize.placeholder
                }
                options={companySizeOptions}
                required
              />

              <TanStackSelectField
                form={form}
                name="organization.industry"
                label={workspaceFormLabels.fields.organization.industry.label}
                description={workspaceFormLabels.fields.organization.industry.description}
                valuePlaceholder={
                  workspaceFormLabels.fields.organization.industry.placeholder
                }
                options={industryOptions}
                required
              />

              <TanStackSelectField
                form={form}
                name="organization.timezone"
                label={workspaceFormLabels.fields.organization.timezone.label}
                description={workspaceFormLabels.fields.organization.timezone.description}
                valuePlaceholder={
                  workspaceFormLabels.fields.organization.timezone.placeholder
                }
                options={timezoneOptions}
                required
              />
            </div>
          </FormSectionCard>

          <FormSectionCard
            title={workspaceFormLabels.sections.billing.title}
            description={workspaceFormLabels.sections.billing.description}
          >
            <div className="grid gap-4">
              <TanStackSwitchField
                form={form}
                name="billing.useDifferentBillingContact"
                label={
                  workspaceFormLabels.fields.billing.useDifferentBillingContact.label
                }
                description={
                  workspaceFormLabels.fields.billing.useDifferentBillingContact.description
                }
                onValueChange={(checked) => {
                  if (!checked) {
                    form.setFieldValue("billing.billingEmail", "");
                  }
                }}
              />

              {billingEnabled ? (
                <TanStackTextField
                  form={form}
                  name="billing.billingEmail"
                  label={workspaceFormLabels.fields.billing.billingEmail.label}
                  description={workspaceFormLabels.fields.billing.billingEmail.description}
                  placeholder={workspaceFormLabels.fields.billing.billingEmail.placeholder}
                  type="email"
                  autoComplete="email"
                  required
                />
              ) : null}
            </div>
          </FormSectionCard>

          <FormSectionCard
            title={workspaceFormLabels.sections.security.title}
            description={workspaceFormLabels.sections.security.description}
          >
            <div className="grid gap-4">
              <TanStackSwitchField
                form={form}
                name="security.enableSSO"
                label={workspaceFormLabels.fields.security.enableSSO.label}
                description={workspaceFormLabels.fields.security.enableSSO.description}
                onValueChange={(checked) => {
                  if (!checked) {
                    form.setFieldValue("security.ssoProvider", "");
                    form.setFieldValue("security.ssoDomain", "");
                    form.setFieldValue("security.ssoMetadataUrl", "");
                  }
                }}
              />

              {ssoEnabled ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <TanStackSelectField
                    form={form}
                    name="security.ssoProvider"
                    label={workspaceFormLabels.fields.security.ssoProvider.label}
                    description={workspaceFormLabels.fields.security.ssoProvider.description}
                    valuePlaceholder={
                      workspaceFormLabels.fields.security.ssoProvider.placeholder
                    }
                    options={ssoProviderOptions}
                    required
                  />

                  <TanStackTextField
                    form={form}
                    name="security.ssoDomain"
                    label={workspaceFormLabels.fields.security.ssoDomain.label}
                    description={workspaceFormLabels.fields.security.ssoDomain.description}
                    placeholder={workspaceFormLabels.fields.security.ssoDomain.placeholder}
                    autoComplete="off"
                    required
                  />

                  <TanStackTextField
                    form={form}
                    name="security.ssoMetadataUrl"
                    className="md:col-span-2"
                    label={workspaceFormLabels.fields.security.ssoMetadataUrl.label}
                    description={
                      workspaceFormLabels.fields.security.ssoMetadataUrl.description
                    }
                    placeholder={
                      workspaceFormLabels.fields.security.ssoMetadataUrl.placeholder
                    }
                    type="url"
                    autoComplete="url"
                    required
                  />
                </div>
              ) : null}
            </div>
          </FormSectionCard>

          <form.Field name="teamMembers" mode="array">
            {(teamMembersField) => {
              const teamMembers = teamMembersField.state.value ?? [];
              const teamMembersError =
                teamMembersField.state.meta.isTouched || submissionAttempts > 0
                  ? getFieldErrorText(teamMembersField.state.meta.errors)
                  : undefined;

              return (
                <FormSectionCard
                  title={workspaceFormLabels.sections.teamMembers.title}
                  description={workspaceFormLabels.sections.teamMembers.description}
                  action={
                    <Button
                      type="button"
                      size="sm"
                      onClick={() =>
                        teamMembersField.pushValue(createEmptyTeamMember())
                      }
                    >
                      <Plus className="size-4" />
                      {workspaceFormLabels.actions.addTeamMember}
                    </Button>
                  }
                >
                  {teamMembersError ? (
                    <Alert variant="destructive">
                      <CircleAlert className="size-4" />
                      <AlertTitle>Team member validation</AlertTitle>
                      <AlertDescription>{teamMembersError}</AlertDescription>
                    </Alert>
                  ) : null}

                  <div className="grid gap-4">
                    {teamMembers.map((member, index) => (
                      <TeamMemberRow
                        key={member.id ?? `team-member-${index + 1}`}
                        form={form}
                        index={index}
                        canRemove={teamMembers.length > 1}
                        onRemove={() => teamMembersField.removeValue(index)}
                      />
                    ))}
                  </div>
                </FormSectionCard>
              );
            }}
          </form.Field>

          <FormSectionCard
            title={workspaceFormLabels.sections.notifications.title}
            description={workspaceFormLabels.sections.notifications.description}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <TanStackCheckboxField
                form={form}
                name="notifications.email"
                label={workspaceFormLabels.fields.notifications.email.label}
                description={workspaceFormLabels.fields.notifications.email.description}
              />

              <TanStackCheckboxField
                form={form}
                name="notifications.sms"
                label={workspaceFormLabels.fields.notifications.sms.label}
                description={workspaceFormLabels.fields.notifications.sms.description}
              />

              <TanStackSelectField
                form={form}
                name="notifications.frequency"
                className="md:col-span-2"
                label={workspaceFormLabels.fields.notifications.frequency.label}
                description={workspaceFormLabels.fields.notifications.frequency.description}
                valuePlaceholder={
                  workspaceFormLabels.fields.notifications.frequency.placeholder
                }
                options={notificationFrequencyOptions}
                required
              />
            </div>
          </FormSectionCard>

          <FormSectionCard
            title="Review / Submit"
            description="Submission uses the same mocked backend flow planned for the other routes, so success and failure states remain comparable."
          >
            <form.Subscribe
              selector={(state) => ({
                canSubmit: state.canSubmit,
                isSubmitting: state.isSubmitting,
                isValid: state.isValid,
                isValidating: state.isValidating,
                submissionAttempts: state.submissionAttempts,
                teamMemberCount: state.values.teamMembers.length,
                billingEnabled: state.values.billing.useDifferentBillingContact,
                ssoEnabled: state.values.security.enableSSO,
              })}
            >
              {(submitState) => (
                <div className="grid gap-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={submitState.isValid ? "secondary" : "outline"}
                      className="rounded-full px-2.5"
                    >
                      {submitState.isValid ? "Valid" : "Needs attention"}
                    </Badge>
                    <Badge variant="outline" className="rounded-full px-2.5">
                      Team Members: {submitState.teamMemberCount}
                    </Badge>
                    <Badge variant="outline" className="rounded-full px-2.5">
                      Billing Contact:{" "}
                      {submitState.billingEnabled ? "Separate" : "Primary Admin"}
                    </Badge>
                    <Badge variant="outline" className="rounded-full px-2.5">
                      SSO: {submitState.ssoEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>

                  {submitBanner ? (
                    <Alert
                      variant={
                        submitBanner.variant === "success"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {submitBanner.variant === "success" ? (
                        <CircleCheckBig className="size-4" />
                      ) : (
                        <CircleAlert className="size-4" />
                      )}
                      <AlertTitle>{submitBanner.title}</AlertTitle>
                      <AlertDescription>
                        {submitBanner.message}
                      </AlertDescription>
                    </Alert>
                  ) : null}

                  <div className="rounded-2xl border border-border/80 bg-muted/25 px-4 py-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Diagnostics, dirty state, touched state, and the last
                      successful payload are mirrored in the sidebar through the
                      shared diagnostics contract.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted-foreground">
                      Submission attempts: {submitState.submissionAttempts}
                      {submitState.isValidating
                        ? " • validation in progress"
                        : ""}
                    </p>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={
                        !submitState.canSubmit || submitState.isSubmitting
                      }
                    >
                      {submitState.isSubmitting
                        ? "Creating Workspace..."
                        : workspaceFormLabels.actions.submit}
                    </Button>
                  </div>
                </div>
              )}
            </form.Subscribe>
          </FormSectionCard>
        </form>

        <form.Subscribe
          selector={(state) =>
            createTanStackWorkspaceDiagnostics({
              state,
              submittedPayload,
              submitBanner,
              slugAvailability,
            })
          }
        >
          {(diagnostics) => (
            <div className="self-start xl:sticky xl:top-6">
              <WorkspaceDiagnosticsSidebar
                libraryLabel="TanStack Form"
                diagnostics={diagnostics}
                notes={tanStackComparisonNotes}
              />
            </div>
          )}
        </form.Subscribe>
      </div>
    </div>
  );
}

export { TanStackFormPage };
