import { Trash2, Users } from "lucide-react";

import { RenderCounter } from "@/components/form-ui/render-counter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { workspaceFormLabels } from "@/features/workspace-form/shared/labels";
import { teamRoleOptions } from "@/features/workspace-form/shared/options";

import {
  TanStackSelectField,
  TanStackTextField,
} from "./adapters";
import type { WorkspaceTanStackFormApi } from "./use-workspace-tanstack-form";

type TeamMemberRowProps = {
  form: WorkspaceTanStackFormApi;
  index: number;
  canRemove: boolean;
  onRemove: () => void;
};

function TeamMemberRow({
  form,
  index,
  canRemove,
  onRemove,
}: TeamMemberRowProps) {
  const memberNumber = index + 1;

  return (
    <div className="grid gap-4 rounded-2xl border border-border/80 bg-background px-4 py-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="grid gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="rounded-full px-2.5">
              <Users className="size-3.5" />
              Member {memberNumber}
            </Badge>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Each row uses the same shared field primitives and exposes its own
            render behavior for comparison.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRemove}
          disabled={!canRemove}
        >
          <Trash2 className="size-4" />
          Remove
        </Button>
      </div>

      <RenderCounter label={`Team member ${memberNumber} row renders`} />

      <div className="grid gap-4 md:grid-cols-2">
        <TanStackTextField
          form={form}
          name={`teamMembers[${index}].name`}
          label={workspaceFormLabels.fields.teamMembers.name.label}
          description={workspaceFormLabels.fields.teamMembers.name.description}
          placeholder={workspaceFormLabels.fields.teamMembers.name.placeholder}
          required
        />
        <TanStackTextField
          form={form}
          name={`teamMembers[${index}].email`}
          label={workspaceFormLabels.fields.teamMembers.email.label}
          description={workspaceFormLabels.fields.teamMembers.email.description}
          placeholder={workspaceFormLabels.fields.teamMembers.email.placeholder}
          type="email"
          autoComplete="email"
          required
        />
        <TanStackSelectField
          form={form}
          name={`teamMembers[${index}].role`}
          className="md:col-span-2"
          label={workspaceFormLabels.fields.teamMembers.role.label}
          description={workspaceFormLabels.fields.teamMembers.role.description}
          valuePlaceholder={workspaceFormLabels.fields.teamMembers.role.placeholder}
          options={teamRoleOptions}
          required
        />
      </div>
    </div>
  );
}

export { TeamMemberRow };
