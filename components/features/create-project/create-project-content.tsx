"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { ProjectDetailsFields } from "./project-details-fields";
import { CreateProjectTerminology } from "./create-project-terminology";
import { ClientEmailsField } from "./client-emails-field";
import { CreateProjectSources } from "./create-project-sources";
import { cn } from "@/lib/utils";
import type { CreateProjectOptions, SourceKey, TeamMember, TerminologyEntry } from "@/lib/types";

interface CreateProjectContentProps {
  options: CreateProjectOptions;
}

const INITIAL_CONNECTED: Record<SourceKey, boolean> = {
  slack: false,
  jira: false,
  teams: false,
  calls: false,
  email: false,
};

export function CreateProjectContent({ options }: CreateProjectContentProps) {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [terminology, setTerminology] = useState<TerminologyEntry[]>([]);
  const [clientEmails, setClientEmails] = useState<string[]>([]);
  const [connected, setConnected] = useState<Record<SourceKey, boolean>>(INITIAL_CONNECTED);

  const canSubmit = projectName.trim().length > 0;

  function handleAddManager(manager: string, email: string) {
    setProjectManager(manager);
    void email;
  }

  function handleRemoveMember(name: string) {
    setTeamMembers((prev) => prev.filter((member) => member.name !== name));
  }

  function handleAddTerminology(entry: TerminologyEntry) {
    setTerminology((prev) => [...prev, entry]);
  }

  function handleEditTerminology(index: number, entry: TerminologyEntry) {
    setTerminology((prev) => prev.map((t, i) => (i === index ? entry : t)));
  }

  function handleDeleteTerminology(index: number) {
    setTerminology((prev) => prev.filter((_, i) => i !== index));
  }

  function handleConnect(source: SourceKey) {
    setConnected((prev) => ({ ...prev, [source]: true }));
  }

  return (
    <div className="flex flex-col gap-8">
      <ProjectDetailsFields
        projectName={projectName}
        onProjectNameChange={setProjectName}
        projectManager={projectManager}
        managerOptions={options.managerOptions}
        onAddManager={handleAddManager}
        teamMembers={teamMembers}
        teamMemberOptions={options.teamMemberOptions}
        onUpdateMembers={setTeamMembers}
        onRemoveMember={handleRemoveMember}
      />

      <CreateProjectTerminology
        terminology={terminology}
        onAddTerminology={handleAddTerminology}
        onEditTerminology={handleEditTerminology}
        onDeleteTerminology={handleDeleteTerminology}
      />

      <ClientEmailsField emails={clientEmails} onChange={setClientEmails} />

      <CreateProjectSources connected={connected} onConnect={handleConnect} />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/projects")}
          className={cn(buttonVariants({ variant: "secondary" }), "h-9 px-3 text-sm font-medium")}
        >
          Cancel
        </button>
        <Button
          disabled={!canSubmit}
          onClick={() => router.push("/projects")}
          className="h-9 px-3 text-sm font-semibold"
        >
          Add Project
        </Button>
      </div>
    </div>
  );
}
