import Image from "next/image";
import { formatLongDate } from "@/lib/utils";
import type { DashboardData } from "@/lib/types";

interface HeroBannerProps {
  data: DashboardData;
}

export function HeroBanner({ data }: HeroBannerProps) {
  const { briefingDate, totalProjects, criticalProjectCount, mediumRiskCount, totalIncidents, narrative } = data;

  return (
    <div className="relative flex w-full flex-col items-start overflow-hidden rounded-lg p-6">
      {/* Figma positions this background at an explicit 174.87% height / -6.68%
          top offset rather than a natural-aspect object-fit:cover crop —
          reproduced literally (not object-cover) to match the exact crop. */}
      <Image
        src="/images/dashboard-hero-bg.png"
        alt=""
        width={1518}
        height={454}
        priority
        sizes="100vw"
        className="pointer-events-none absolute left-0 top-[-6.68%] h-[174.87%] w-full max-w-none object-fill"
      />

      <div className="relative z-10 flex w-full flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="flex size-[18.75px] shrink-0 items-center justify-center rounded-[3.75px] bg-white/20">
            <div className="relative size-[11.25px]">
              <Image src="/icons/hero-briefing.svg" alt="" fill sizes="12px" priority />
            </div>
          </div>
          <p className="font-semibold text-[13px] uppercase tracking-[1.125px] text-white">
            {`Here's your executive briefing • ${formatLongDate(briefingDate)}`}
          </p>
        </div>

        <div className="flex w-full flex-col items-start gap-4 lg:flex-row lg:items-center">
          <p className="text-sm font-medium leading-[18.75px] text-white lg:flex-1">
            {`Across your `}
            <span className="font-bold">{totalProjects}</span>
            {` projects, `}
            <span className="font-bold">{totalIncidents}</span>
            {` incidents were detected in the last 24 hours. ${narrative.highlightProjectName} needs attention today: two critical delivery risks are tied to unresolved cross-team dependencies. Pallium and Skill Sync are progressing without blockers.`}
          </p>

          <div className="flex w-full items-center rounded-xs bg-white/5 py-3 pl-4 pr-3 lg:w-[378px]">
            <div className="flex flex-wrap items-center gap-x-[26px] gap-y-3">
              <div className="flex w-24 flex-col">
                <p className="text-2xl font-semibold leading-[30px] text-white">{totalProjects}</p>
                <p className="text-sm font-semibold leading-[15px] text-white">Total Projects</p>
              </div>
              <div className="flex w-[106px] flex-col">
                <p className="text-2xl font-semibold leading-[30px] text-critical">{criticalProjectCount}</p>
                <p className="text-sm font-semibold leading-[15px] text-white">Critical Project</p>
              </div>
              <div className="flex w-[89px] flex-col">
                <p className="text-2xl font-semibold leading-[30px] text-medium">{mediumRiskCount}</p>
                <p className="text-sm font-semibold leading-[15px] text-white">Medium Risk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
