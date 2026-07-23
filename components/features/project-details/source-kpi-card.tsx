import Image from "next/image";
import type { SourceStat } from "@/lib/types";

interface SourceKpiCardProps {
  label: string;
  icon: string;
  stat: SourceStat;
}

export function SourceKpiCard({ label, icon, stat }: SourceKpiCardProps) {
  return (
    <div className="flex min-w-[150px] flex-1 flex-col gap-3 rounded-md bg-surface-muted p-4 lg:flex-none lg:w-auto">
      <div className="flex items-center gap-2">
        <div className="relative size-4 shrink-0">
          <Image src={icon} alt="" fill sizes="16px" />
        </div>
        <p className="whitespace-nowrap text-sm font-semibold text-text-primary">{label}</p>
      </div>

      <div className="flex items-start gap-4">
        <div className="flex flex-col items-start gap-1">
          <p className="text-base font-semibold text-text-primary">{stat.total}</p>
          <p className="whitespace-nowrap text-xs font-medium text-text-tertiary">Total Incidents</p>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-1">
            <p className="text-base font-semibold text-critical">{stat.critical}</p>
            <p className="whitespace-nowrap text-xs font-medium text-text-tertiary">Critical</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-base font-semibold text-high">{stat.medium}</p>
            <p className="whitespace-nowrap text-xs font-medium text-text-tertiary">Medium</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-base font-semibold text-low">{stat.low}</p>
            <p className="whitespace-nowrap text-xs font-medium text-text-tertiary">Low</p>
          </div>
        </div>
      </div>
    </div>
  );
}
