import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PageContainer } from "@/components/layout/page-container";
import { ProjectSettingsContent } from "@/components/features/project-settings/project-settings-content";
import { CURRENT_USER } from "@/lib/constants";
import projectSettingsData from "@/lib/data/project-settings.json";
import type { ProjectSettingsData } from "@/lib/types";

const PROJECT_SETTINGS = projectSettingsData as Record<string, ProjectSettingsData>;

export const metadata: Metadata = {
  title: "Settings — AI Project Intelligence Platform",
};

export default async function ProjectSettingsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const settings = PROJECT_SETTINGS[projectId];

  if (!settings) notFound();

  return (
    <>
      <Header title={<Breadcrumb label="Settings" href={`/projects/${projectId}`} />} user={CURRENT_USER} />

      <PageContainer mainClassName="bg-white">
        <ProjectSettingsContent projectId={projectId} settings={settings} />
      </PageContainer>
    </>
  );
}
