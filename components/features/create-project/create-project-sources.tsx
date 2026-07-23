"use client";

import { ConnectedSourceCard } from "@/components/features/project-settings/connected-source-card";
import type { SourceKey } from "@/lib/types";

interface CreateProjectSourcesProps {
  connected: Record<SourceKey, boolean>;
  onConnect: (source: SourceKey) => void;
}

const LEFT_COLUMN: { key: SourceKey; icon: string; label: string; description: string }[] = [
  { key: "slack", icon: "/icons/source-slack.svg", label: "Slack Workspace", description: "Conversation & collaboration analysis" },
  { key: "jira", icon: "/icons/source-jira.svg", label: "Jira Workspace", description: "Sprint, issue & project activity tracking" },
  { key: "calls", icon: "/icons/source-calls.svg", label: "Calls", description: "Real-time meetings" },
];

const RIGHT_COLUMN: { key: SourceKey; icon: string; label: string; description: string }[] = [
  { key: "teams", icon: "/icons/source-teams.svg", label: "Microsoft Teams", description: "Team collaboration and updates" },
  { key: "email", icon: "/icons/source-email.svg", label: "Email", description: "Email & communication analysis" },
];

export function CreateProjectSources({ connected, onConnect }: CreateProjectSourcesProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="border-b border-border pb-3 text-base font-semibold text-black">Connected Data Sources</p>

      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex w-full flex-col gap-4 lg:w-[566px] lg:shrink-0">
          {LEFT_COLUMN.map(({ key, icon, label, description }) => (
            <ConnectedSourceCard
              key={key}
              icon={icon}
              label={label}
              description={description}
              connected={connected[key]}
              onConnect={() => onConnect(key)}
            />
          ))}
        </div>

        <div className="flex w-full flex-col gap-4 lg:w-[565px] lg:shrink-0">
          {RIGHT_COLUMN.map(({ key, icon, label, description }) => (
            <ConnectedSourceCard
              key={key}
              icon={icon}
              label={label}
              description={description}
              connected={connected[key]}
              onConnect={() => onConnect(key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
