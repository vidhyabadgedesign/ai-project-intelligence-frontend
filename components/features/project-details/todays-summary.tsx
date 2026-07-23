import { DateFilterDropdown } from "@/components/features/dashboard/date-filter-dropdown";
import { SourceKpiCard } from "./source-kpi-card";
import { ActionPointsList } from "./action-points-list";
import { CategoryChip } from "./category-chip";
import type { ProjectDetailsSummary, SourceKey } from "@/lib/types";

interface TodaysSummaryProps {
  summary: ProjectDetailsSummary;
}

const SOURCE_ORDER: { key: SourceKey; label: string; icon: string }[] = [
  { key: "slack", label: "Slack", icon: "/icons/source-slack.svg" },
  { key: "jira", label: "Jira", icon: "/icons/source-jira.svg" },
  { key: "email", label: "Email", icon: "/icons/source-email.svg" },
  { key: "calls", label: "Calls", icon: "/icons/source-calls.svg" },
];

export function TodaysSummary({ summary }: TodaysSummaryProps) {
  return (
    <div className="flex flex-col gap-6 rounded-md border border-border p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-text-primary-alt">
              {"Today's Summary "}
              <span className="font-medium">({summary.date})</span>
            </p>
            <DateFilterDropdown />
          </div>
          <p className="text-sm font-medium text-black">{summary.narrative}</p>
        </div>

        <div className="flex flex-wrap items-stretch gap-3">
          {SOURCE_ORDER.map(({ key, label, icon }) => {
            const stat = summary.sourceStats[key];
            if (!stat) return null;
            return <SourceKpiCard key={key} label={label} icon={icon} stat={stat} />;
          })}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <ActionPointsList points={summary.actionPoints} />

        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold text-text-primary-alt">Incidents by category</p>
          <div className="flex flex-wrap items-start gap-2">
            {summary.categories.map(({ category, count }) => (
              <CategoryChip key={category} category={category} count={count} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
