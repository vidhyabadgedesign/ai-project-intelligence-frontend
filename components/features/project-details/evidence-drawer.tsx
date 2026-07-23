"use client";

import { useState } from "react";
import { ExternalLink, Hash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Modal, ModalContent, ModalTitle } from "@/components/ui/modal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { IncidentSeverityBadge } from "./incident-severity-badge";
import type { EvidenceItem, Incident, IncidentEvidence } from "@/lib/types";

interface EvidenceDrawerProps {
  incident: Incident | null;
  evidence: IncidentEvidence | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TAB_META = {
  slack: { label: "Slack Evidence" },
  jira: { label: "Jira Evidence" },
  email: { label: "Email Evidence" },
} as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function SlackOrEmailEvidenceCard({ item, isEmail }: { item: EvidenceItem; isEmail: boolean }) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-sm border border-border p-[13px]">
      <div className="flex flex-col gap-1">
        <p className="text-[13px] font-semibold text-black">{item.title}</p>
        <p className="text-[13px] text-text-tertiary">{item.description}</p>
      </div>
      <div className="flex flex-col gap-2 rounded-md bg-primary/5 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isEmail ? (
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
                {initials(item.channel)}
              </span>
            ) : (
              <Hash className="size-3 shrink-0 text-text-primary-alt" aria-hidden />
            )}
            <p className="text-[13px] font-semibold capitalize text-text-primary-alt">{item.channel}</p>
          </div>
          <p className="whitespace-nowrap text-xs text-text-tertiary">{item.timestamp}</p>
        </div>
        <p className="text-xs leading-normal text-black">{`"${item.quote}"`}</p>
      </div>
    </div>
  );
}

function JiraEvidenceRow({ item }: { item: EvidenceItem }) {
  return (
    <div className="flex w-full items-center justify-between rounded-sm border border-border p-[13px]">
      <p className="text-[13px] font-medium text-black">{item.title}</p>
      <div className="flex items-center gap-1">
        <p className="text-xs font-medium text-black">{`Ticket No: ${item.channel}`}</p>
        <ExternalLink className="size-4 shrink-0 text-primary" aria-hidden />
      </div>
    </div>
  );
}

export function EvidenceDrawer({ incident, evidence, open, onOpenChange }: EvidenceDrawerProps) {
  const [tab, setTab] = useState<"slack" | "jira" | "email">("slack");

  if (!incident) return null;

  const counts = {
    slack: evidence?.slack.length ?? 0,
    jira: evidence?.jira.length ?? 0,
    email: evidence?.email.length ?? 0,
  };
  const availableTabs = (["slack", "jira", "email"] as const).filter((key) => counts[key] > 0);
  const activeTab = availableTabs.includes(tab) ? tab : availableTabs[0];

  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setTab("slack");
      }}
    >
      <ModalContent className="max-h-[85vh] w-[calc(100%-2rem)] max-w-[900px] overflow-y-auto">
        <div className="flex flex-col gap-3 pr-6">
          <div className="flex items-center gap-3">
            <ModalTitle className="text-base">{incident.title}</ModalTitle>
            <IncidentSeverityBadge incident={incident} className="text-sm" />
          </div>
          <p className="text-sm font-medium text-black">{incident.description}</p>
        </div>

        {availableTabs.length === 0 ? (
          <p className="mt-6 text-sm text-text-secondary">No evidence recorded for this incident.</p>
        ) : (
          <Tabs value={activeTab} onValueChange={(value) => setTab(value as typeof tab)} className="mt-3 flex flex-col gap-3">
            <TabsList className="gap-3 border-border-table">
              {availableTabs.map((key) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className={cn(
                    "h-auto gap-2 border-b-[1.5px] p-2 text-sm font-medium text-text-tertiary",
                    "data-[state=active]:text-black",
                  )}
                >
                  {`${TAB_META[key].label} (${counts[key]})`}
                </TabsTrigger>
              ))}
            </TabsList>

            {availableTabs.map((key) => (
              <TabsContent key={key} value={key} className="flex flex-col gap-3 pt-0">
                {(evidence?.[key] ?? []).map((item) =>
                  key === "jira" ? (
                    <JiraEvidenceRow key={item.title} item={item} />
                  ) : (
                    <SlackOrEmailEvidenceCard key={item.title} item={item} isEmail={key === "email"} />
                  ),
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </ModalContent>
    </Modal>
  );
}
