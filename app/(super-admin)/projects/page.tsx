import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { PageContainer } from "@/components/layout/page-container";
import { ProjectsList } from "@/components/features/projects/projects-list";
import { CURRENT_USER } from "@/lib/constants";
import projectsData from "@/lib/data/projects.json";
import type { ProjectListItem } from "@/lib/types";

const projects = projectsData as ProjectListItem[];

export const metadata: Metadata = {
  title: "Projects — AI Project Intelligence Platform",
};

export default function ProjectsPage() {
  return (
    <>
      <Header title="Projects" user={CURRENT_USER} />

      <PageContainer mainClassName="bg-white">
        <ProjectsList projects={projects} />
      </PageContainer>
    </>
  );
}
