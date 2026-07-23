import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PageContainer } from "@/components/layout/page-container";
import { ProjectDetailsContent } from "@/components/features/project-details/project-details-content";
import { CURRENT_USER } from "@/lib/constants";
import projectDetailsData from "@/lib/data/project-details.json";
import type { ProjectDetailsData } from "@/lib/types";

const PROJECT_DETAILS = projectDetailsData as Record<string, ProjectDetailsData>;

export const metadata: Metadata = {
  title: "Project Details — AI Project Intelligence Platform",
};

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = PROJECT_DETAILS[projectId];

  if (!project) notFound();

  return (
    <>
      <Header title={<Breadcrumb label="Project Details" href="/projects" />} user={CURRENT_USER} />

      <PageContainer mainClassName="bg-white">
        <ProjectDetailsContent project={project} />
      </PageContainer>
    </>
  );
}
