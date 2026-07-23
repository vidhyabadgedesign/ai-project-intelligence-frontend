"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { ProjectDetailsSection } from "./project-details-section";
import { TerminologySection } from "./terminology-section";
import { ClientEmailsSection } from "./client-emails-section";
import { ConnectedSourcesSection } from "./connected-sources-section";
import { cn } from "@/lib/utils";
import type { ProjectSettingsData, TeamMember, TerminologyEntry } from "@/lib/types";

interface ProjectSettingsContentProps {
  projectId: string;
  settings: ProjectSettingsData;
}

export function ProjectSettingsContent({ projectId, settings: initial }: ProjectSettingsContentProps) {
  const router = useRouter();
  const [projectName, setProjectName] = useState(initial.projectName);
  const [projectManager, setProjectManager] = useState(initial.projectManager);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initial.teamMembers);
  const [terminology, setTerminology] = useState<TerminologyEntry[]>(initial.terminology);
  const [slackChannels, setSlackChannels] = useState(initial.slack.channels);
  const [teams, setTeams] = useState(initial.teams.teams);

  function handleAddManager(manager: string, email: string) {
    setProjectManager(manager || projectManager);
    void email;
  }

  function handleRemoveMember(name: string) {
    setTeamMembers((prev) => prev.filter((member) => member.name !== name));
  }

  function handleAddTerminology(entry: TerminologyEntry) {
    setTerminology((prev) => [...prev, entry]);
  }

  return (
    <div className="flex flex-col gap-8">
      <ProjectDetailsSection
        projectName={projectName}
        onProjectNameChange={setProjectName}
        projectManager={projectManager}
        managerOptions={initial.managerOptions}
        onAddManager={handleAddManager}
        teamMembers={teamMembers}
        teamMemberOptions={initial.teamMemberOptions}
        onUpdateMembers={setTeamMembers}
        onRemoveMember={handleRemoveMember}
      />

      <TerminologySection terminology={terminology} onAddTerminology={handleAddTerminology} />

      <ClientEmailsSection clientEmails={initial.clientEmails} />

      <ConnectedSourcesSection
        slack={{ ...initial.slack, channels: slackChannels }}
        onSlackChannelsChange={setSlackChannels}
        jira={initial.jira}
        teams={{ ...initial.teams, teams }}
        onTeamsChange={setTeams}
        calls={initial.calls}
        email={initial.email}
      />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push(`/projects/${projectId}`)}
          className={cn(buttonVariants({ variant: "secondary" }), "h-9 px-3 text-sm font-medium")}
        >
          Cancel
        </button>
        <Button onClick={() => router.push(`/projects/${projectId}`)} className="h-9 px-3 text-sm font-semibold">
          Update Changes
        </Button>
      </div>
    </div>
  );
}
