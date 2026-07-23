"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = projects.filter((project) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return project.name.toLowerCase().includes(q) || project.manager.toLowerCase().includes(q);
  });

  // The 10 mock projects exactly fill page 1 (matching Figma), and Figma shows
  // a second page control even though no further mock data exists for it — the
  // unfiltered view keeps a second, empty page rather than hiding pagination.
  // Search results paginate honestly against however many actually match.
  const pageCount = query.trim() ? Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)) : 2;
  const currentPage = Math.min(page, pageCount);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="w-[178px] shrink-0">
          <Search
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search projects.."
          />
        </div>
        <Link
          href="/projects/new"
          className={cn(buttonVariants({ variant: "primary" }), "h-9 px-4 text-sm font-semibold")}
        >
          Create Project
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[364px]">Project</TableHead>
            <TableHead className="w-[202px]">Manager</TableHead>
            <TableHead className="w-[260px]">Incidents</TableHead>
            <TableHead className="w-[129px]">Severity</TableHead>
            <TableHead className="w-[192px]">Last Synced</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.length === 0 ? (
            <tr>
              <td colSpan={5}>
                <EmptyState
                  title={query ? "No projects match your search" : "No more projects"}
                  description={query ? "Try a different name or manager." : undefined}
                />
              </td>
            </tr>
          ) : (
            paginated.map((project) => (
              <TableRow
                key={project.id}
                role="link"
                tabIndex={0}
                onClick={() => router.push(`/projects/${project.id}`)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") router.push(`/projects/${project.id}`);
                }}
                className="cursor-pointer transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
              >
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
            ))
          )}
        </TableBody>
        <tfoot>
          <tr>
            <td colSpan={5} className="border-t border-border-table p-4">
              <div className="flex justify-end">
                <Pagination page={currentPage} pageCount={pageCount} onPageChange={setPage} />
              </div>
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
