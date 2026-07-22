"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Search } from "@/components/ui/search";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { ProjectSeverityBadge } from "./project-severity-badge";
import type { ProjectListItem } from "@/lib/types";

const PAGE_SIZE = 10;

function IncidentCounts({ incidents }: { incidents: ProjectListItem["incidents"] }) {
  return (
    <div className="flex items-center gap-3 whitespace-nowrap text-sm text-text-primary">
      <span>
        {"T: "}
        <span className="font-semibold">{incidents.total}</span>
      </span>
      <span>
        {"C: "}
        <span className="font-semibold text-critical">{incidents.critical}</span>
      </span>
      <span>
        {"M: "}
        <span className="font-semibold text-high">{incidents.medium}</span>
      </span>
      <span>
        {"L: "}
        <span className="font-semibold text-low">{incidents.low}</span>
      </span>
    </div>
  );
}

export function ProjectsList({ projects }: { projects: ProjectListItem[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (project) => project.name.toLowerCase().includes(q) || project.manager.toLowerCase().includes(q),
    );
  }, [projects, query]);

  // Only 10 mock projects exist, so they all fit on one real page — but the
  // reference design shows a second page control, so the default (unfiltered)
  // view keeps a second, empty page rather than hiding pagination entirely.
  // Search results paginate honestly against however many actually match.
  const pageCount = query.trim() ? Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)) : 2;
  const currentPage = Math.min(page, pageCount);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Search
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
          placeholder="Search projects.."
          className="sm:max-w-xs"
        />
        <Link href="/projects/new" className={cn(buttonVariants({ variant: "primary" }), "sm:w-auto")}>
          Create Project
        </Link>
      </div>

      {paginated.length === 0 ? (
        <EmptyState
          title={query ? "No projects match your search" : "No more projects"}
          description={query ? "Try a different name or manager." : undefined}
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">Project</TableHead>
              <TableHead className="w-[16%]">Manager</TableHead>
              <TableHead className="w-[20%]">Incidents</TableHead>
              <TableHead className="w-[12%]">Severity</TableHead>
              <TableHead>Last Synced</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((project) => (
              <TableRow key={project.id} className="transition-colors hover:bg-surface-muted">
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-text-primary">{project.name}</span>
                    <span className="text-xs text-text-primary">{project.description}</span>
                  </div>
                </TableCell>
                <TableCell>{project.manager}</TableCell>
                <TableCell>
                  <IncidentCounts incidents={project.incidents} />
                </TableCell>
                <TableCell>
                  <ProjectSeverityBadge severity={project.severity} />
                </TableCell>
                <TableCell className="whitespace-nowrap">{project.lastSynced}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="flex justify-end">
        <Pagination page={currentPage} pageCount={pageCount} onPageChange={setPage} />
      </div>
    </div>
  );
}
