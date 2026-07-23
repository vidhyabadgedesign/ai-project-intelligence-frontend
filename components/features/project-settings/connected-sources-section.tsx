"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ConnectedSourceCard } from "./connected-source-card";
import { SourceMultiSelect } from "./source-multi-select";
import type { CallsSettings, EmailSettings, JiraSettings, SlackSettings, TeamsSettings } from "@/lib/types";

interface ConnectedSourcesSectionProps {
  slack: SlackSettings;
  onSlackChannelsChange: (channels: string[]) => void;
  jira: JiraSettings;
  teams: TeamsSettings;
  onTeamsChange: (teams: string[]) => void;
  calls: CallsSettings;
  email: EmailSettings;
}

export function ConnectedSourcesSection({
  slack,
  onSlackChannelsChange,
  jira,
  teams,
  onTeamsChange,
  calls,
  email,
}: ConnectedSourcesSectionProps) {
  const [tokenVisible, setTokenVisible] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4">
      <p className="border-b border-border pb-3 text-base font-semibold text-black">Connected Data Sources</p>

      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex w-full flex-col gap-4 lg:w-[566px] lg:shrink-0">
          <ConnectedSourceCard
            icon="/icons/source-slack.svg"
            label="Slack Workspace"
            description="Conversation & collaboration analysis"
            connected={slack.connected}
          >
            <SourceMultiSelect
              label="Slack Channel"
              placeholder="Select channels"
              options={slack.channelOptions}
              selected={slack.channels}
              onChange={onSlackChannelsChange}
            />
          </ConnectedSourceCard>

          <ConnectedSourceCard
            icon="/icons/source-jira.svg"
            label="Jira Workspace"
            description="Sprint, issue & project activity tracking"
            connected={jira.connected}
          >
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Input
                  type={tokenVisible ? "text" : "password"}
                  defaultValue={jira.apiToken}
                  readOnly
                  className="h-11 rounded-sm border-border pr-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setTokenVisible((prev) => !prev)}
                  aria-label={tokenVisible ? "Hide API token" : "Show API token"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-icon transition-colors hover:text-text-primary"
                >
                  {tokenVisible ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
                </button>
              </div>
              <Button variant="secondary" className="h-9 shrink-0 px-2 text-sm">
                Update
              </Button>
            </div>
          </ConnectedSourceCard>

          <ConnectedSourceCard
            icon="/icons/source-calls.svg"
            label="Calls"
            description="Real-time meetings"
            connected={calls.connected}
          />
        </div>

        <div className="flex w-full flex-col gap-4 lg:w-[565px] lg:shrink-0">
          <ConnectedSourceCard
            icon="/icons/source-teams.svg"
            label="Microsoft Teams"
            description="Team collaboration and updates"
            connected={teams.connected}
          >
            <SourceMultiSelect
              label="Teams"
              placeholder="Select teams"
              options={teams.teamOptions}
              selected={teams.teams}
              onChange={onTeamsChange}
            />
          </ConnectedSourceCard>

          <ConnectedSourceCard
            icon="/icons/source-email.svg"
            label="Email"
            description="Email & communication analysis"
            connected={email.connected}
          />
        </div>
      </div>
    </div>
  );
}
