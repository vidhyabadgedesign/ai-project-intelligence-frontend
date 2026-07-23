"use client";

import { useState } from "react";
import { ProjectDetailsHeader } from "./project-details-header";
import { TodaysSummary } from "./todays-summary";
import { IncidentsTable } from "./incidents-table";
import { EvidenceDrawer } from "./evidence-drawer";
import type { Incident, ProjectDetailsData } from "@/lib/types";

interface ProjectDetailsContentProps {
  project: ProjectDetailsData;
}

export function ProjectDetailsContent({ project }: ProjectDetailsContentProps) {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <ProjectDetailsHeader
        projectId={project.id}
        name={project.name}
        severity={project.severity}
        lastSyncedLabel={project.lastSyncedLabel}
      />

      <TodaysSummary summary={project.summary} />

      <IncidentsTable
        incidents={project.incidents}
        onSelectIncident={(incident) => {
          setSelectedIncident(incident);
          setDrawerOpen(true);
        }}
      />

      <EvidenceDrawer
        incident={selectedIncident}
        evidence={selectedIncident ? project.evidence[selectedIncident.id] : undefined}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </>
  );
}
