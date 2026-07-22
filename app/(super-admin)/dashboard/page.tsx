import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { HeroBanner } from "@/components/features/dashboard/hero-banner";
import { ProjectSummaryCard } from "@/components/features/dashboard/project-summary-card";
import { DateFilterDropdown } from "@/components/features/dashboard/date-filter-dropdown";
import { EmptyState } from "@/components/ui/empty-state";
import { CURRENT_USER } from "@/lib/constants";
import dashboardData from "@/lib/data/dashboard.json";
import type { DashboardData } from "@/lib/types";

const data = dashboardData as DashboardData;

export const metadata: Metadata = {
  title: "Dashboard — AI Project Intelligence Platform",
};

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" user={CURRENT_USER} actions={<DateFilterDropdown />} />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto flex max-w-[1147px] flex-col gap-8">
          <HeroBanner data={data} />

          <div className="flex flex-col gap-4">
            <p className="text-base font-semibold leading-4 text-text-primary">Projects</p>

            {data.projects.length === 0 ? (
              <EmptyState title="No projects yet" description="Projects you create will show up here." />
            ) : (
              <div className="flex flex-col gap-4">
                {data.projects.map((project) => (
                  <ProjectSummaryCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
