import Image from "next/image";
import Link from "next/link";
import { RefreshCw, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Severity } from "@/lib/severity";
import type { SourceKey } from "@/lib/types";

const HEADER_SOURCE_ICONS: { key: SourceKey; icon: string }[] = [
  { key: "slack", icon: "/icons/source-slack.svg" },
  { key: "jira", icon: "/icons/source-jira.svg" },
  { key: "email", icon: "/icons/source-email.svg" },
  { key: "teams", icon: "/icons/source-teams.svg" },
  { key: "calls", icon: "/icons/source-calls.svg" },
];

interface ProjectDetailsHeaderProps {
  projectId: string;
  name: string;
  severity: Severity;
  lastSyncedLabel: string;
}

export function ProjectDetailsHeader({ projectId, name, severity, lastSyncedLabel }: ProjectDetailsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <p className="text-lg font-semibold leading-8 text-black">{name}</p>
        <Badge severity={severity} />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <p className="whitespace-nowrap text-[13px] text-black">Last sync: {lastSyncedLabel}</p>
          <RefreshCw className="size-[18px] shrink-0 text-icon" aria-hidden />
        </div>

        <div className="flex items-center gap-2 rounded-[42px] bg-primary/10 px-3 py-2">
          {HEADER_SOURCE_ICONS.map(({ key, icon }) => (
            <div key={key} className="relative size-4 shrink-0">
              <Image src={icon} alt="" fill sizes="16px" />
            </div>
          ))}
        </div>

        <Link
          href={`/projects/${projectId}/settings`}
          aria-label="Project settings"
          className="text-icon transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Settings className="size-[18px]" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
