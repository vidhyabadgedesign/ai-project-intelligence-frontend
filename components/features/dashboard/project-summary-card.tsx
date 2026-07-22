import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICON } from "@/lib/categories";
import type { DashboardProject, SourceKey } from "@/lib/types";

interface ProjectSummaryCardProps {
  project: DashboardProject;
}

const SOURCE_META: Record<SourceKey, { label: string; icon: string }> = {
  slack: { label: "Slack", icon: "/icons/source-slack.svg" },
  jira: { label: "Jira", icon: "/icons/source-jira.svg" },
  email: { label: "Email", icon: "/icons/source-email.svg" },
  teams: { label: "Microsoft Teams", icon: "/icons/source-teams.svg" },
  calls: { label: "Calls", icon: "/icons/source-calls.svg" },
};

const SOURCE_ORDER: SourceKey[] = ["slack", "jira", "email", "teams", "calls"];

function chunk<T>(items: T[], size: number): T[][] {
  const groups: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    groups.push(items.slice(i, i + size));
  }
  return groups;
}

function SectionCard({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-start rounded-t-sm border border-border bg-surface-muted px-3 py-2">
        <p className="text-sm font-semibold text-text-primary-alt">{title}</p>
      </div>
      <div className="flex flex-1 items-start gap-3 rounded-b-sm border-b border-l border-r border-border p-3">
        {children}
      </div>
    </div>
  );
}

export function ProjectSummaryCard({ project }: ProjectSummaryCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <Card className="flex flex-col gap-[17px] p-4 transition-colors hover:border-primary/40 hover:shadow-card">
        <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col items-start gap-[7px] lg:w-[331px]">
            <div className="flex items-center gap-[7px]">
              <p className="text-[15px] font-semibold text-text-primary">{project.name}</p>
              <Badge severity={project.severity} />
            </div>
            <p className="text-sm text-text-primary">{project.description}</p>
          </div>

          <div className="flex w-full flex-wrap items-center gap-3 lg:w-auto lg:flex-nowrap">
            {SOURCE_ORDER.map((key) => {
              const source = project.sources[key];
              const meta = SOURCE_META[key];
              return (
                <div
                  key={key}
                  className="flex min-w-[130px] flex-1 flex-col items-start gap-2 overflow-hidden rounded-sm border border-border bg-surface-muted p-3 lg:flex-none lg:w-auto"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative size-4 shrink-0">
                      <Image src={meta.icon} alt="" fill sizes="16px" />
                    </div>
                    <p className="whitespace-nowrap text-sm font-semibold text-text-primary">{meta.label}</p>
                  </div>
                  <div className="flex items-center gap-3 whitespace-nowrap text-sm text-text-primary">
                    <p>
                      {"C: "}
                      <span className="font-semibold text-critical">{source.critical}</span>
                    </p>
                    <p>
                      {"M: "}
                      <span className="font-semibold text-high">{source.medium}</span>
                    </p>
                    <p>
                      {"L: "}
                      <span className="font-semibold text-low abc">{source.low}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-4 lg:flex-row">
          {/* Column counts (3 per column / 2 per column) match the fixed 6-item
              mock data, mirroring the exact column-major grouping Figma uses
              (first N items in column 1, next N in column 2, ...) rather than
              a row-major grid. */}
          <SectionCard title="Action Points" className="lg:w-[506px] lg:shrink-0">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start">
              {chunk(project.actionPoints, 3).map((column, columnIndex) => (
                <div key={columnIndex} className="flex shrink-0 flex-col gap-1">
                  {column.map((point) => (
                    <div key={point} className="flex items-center gap-2">
                      <span aria-hidden className="size-[5px] shrink-0 rounded-full bg-text-primary" />
                      <p className="whitespace-nowrap text-sm text-text-primary">{point}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Incidents by category" className="lg:w-[593px] lg:shrink-0">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start">
              {chunk(project.categories, 2).map((column, columnIndex) => (
                <div key={columnIndex} className="flex shrink-0 flex-col gap-4">
                  {column.map(({ category, count }) => (
                    <div key={category} className="flex items-center gap-2">
                      <div className="relative size-3.5 shrink-0">
                        <Image src={CATEGORY_ICON[category]} alt="" fill sizes="14px" />
                      </div>
                      <p className="whitespace-nowrap text-sm text-text-primary">
                        <span className="font-semibold">{count}</span> <span>{category}</span>
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </Card>
    </Link>
  );
}
