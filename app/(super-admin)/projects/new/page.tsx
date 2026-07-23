import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PageContainer } from "@/components/layout/page-container";
import { CreateProjectContent } from "@/components/features/create-project/create-project-content";
import { CURRENT_USER } from "@/lib/constants";
import createProjectOptions from "@/lib/data/create-project-options.json";
import type { CreateProjectOptions } from "@/lib/types";

const OPTIONS = createProjectOptions as CreateProjectOptions;

export const metadata: Metadata = {
  title: "Create Project — AI Project Intelligence Platform",
};

export default function CreateProjectPage() {
  return (
    <>
      <Header title={<Breadcrumb label="Create Project" href="/projects" />} user={CURRENT_USER} />

      <PageContainer mainClassName="bg-white">
        <CreateProjectContent options={OPTIONS} />
      </PageContainer>
    </>
  );
}
