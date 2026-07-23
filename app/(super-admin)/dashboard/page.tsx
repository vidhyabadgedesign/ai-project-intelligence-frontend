import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { PageContainer } from "@/components/layout/page-container";
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

      <PageContainer className="gap-8">
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
      </PageContainer>
    </>
  );
}
