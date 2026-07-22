import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
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

      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto flex max-w-[1147px] flex-col gap-6">
          <ProjectsList projects={projects} />
        </div>
      </main>
    </>
  );
}
