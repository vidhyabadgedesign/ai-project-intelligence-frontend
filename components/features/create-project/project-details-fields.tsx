"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AddActionLink } from "@/components/features/project-settings/add-action-link";
import { Chip } from "@/components/features/project-settings/chip";
import { AddManagerModal } from "@/components/features/project-settings/add-manager-modal";
import { AddTeamMembersModal } from "@/components/features/project-settings/add-team-members-modal";
import type { TeamMember } from "@/lib/types";

interface ProjectDetailsFieldsProps {
  projectName: string;
  onProjectNameChange: (value: string) => void;
  projectManager: string;
  managerOptions: string[];
  onAddManager: (manager: string, email: string) => void;
  teamMembers: TeamMember[];
  teamMemberOptions: string[];
  onUpdateMembers: (members: TeamMember[]) => void;
  onRemoveMember: (name: string) => void;
}

export function ProjectDetailsFields({
  projectName,
  onProjectNameChange,
  projectManager,
  managerOptions,
  onAddManager,
  teamMembers,
  teamMemberOptions,
  onUpdateMembers,
  onRemoveMember,
}: ProjectDetailsFieldsProps) {
  const [managerModalOpen, setManagerModalOpen] = useState(false);
  const [membersModalOpen, setMembersModalOpen] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4">
      <p className="border-b border-border pb-3 text-base font-semibold text-black">Project Details</p>

      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex w-full flex-col gap-4 lg:w-[566px] lg:shrink-0">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-black">Project Name</p>
            <Input
              value={projectName}
              onChange={(event) => onProjectNameChange(event.target.value)}
              placeholder="e.g. BOSSO Platform"
              className="h-11 rounded-sm border-border text-sm font-medium"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-black">Project Manager</p>
              <AddActionLink label="Add Manager" onClick={() => setManagerModalOpen(true)} />
            </div>
            <div className="flex h-11 items-center justify-center rounded-sm border border-border px-3">
              <p className="text-[13px] text-text-tertiary">{projectManager || "No manager added."}</p>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 lg:w-[565px] lg:shrink-0">
          <div className="flex items-center justify-between">
            <p className="text-sm text-black">Team Members</p>
            <AddActionLink label="Add Team Members" onClick={() => setMembersModalOpen(true)} />
          </div>
          {teamMembers.length === 0 ? (
            <div className="flex h-[132px] w-full items-center justify-center rounded-sm border border-border px-[17px]">
              <p className="text-[13px] text-text-tertiary">No team members added.</p>
            </div>
          ) : (
            <div className="flex min-h-[132px] flex-wrap items-start gap-2 rounded-sm border border-border p-[13px]">
              {teamMembers.map((member) => (
                <Chip key={member.name} label={member.name} onRemove={() => onRemoveMember(member.name)} />
              ))}
            </div>
          )}
        </div>
      </div>

      <AddManagerModal
        open={managerModalOpen}
        onOpenChange={setManagerModalOpen}
        managerOptions={managerOptions}
        currentManager={projectManager}
        onAddManager={onAddManager}
      />
      <AddTeamMembersModal
        open={membersModalOpen}
        onOpenChange={setMembersModalOpen}
        teamMembers={teamMembers}
        teamMemberOptions={teamMemberOptions}
        onUpdateMembers={onUpdateMembers}
      />
    </div>
  );
}
