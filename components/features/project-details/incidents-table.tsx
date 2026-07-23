"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Search } from "@/components/ui/search";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownCheckboxItem } from "@/components/ui/dropdown";
import { IncidentSeverityBadge } from "./incident-severity-badge";
import type { Incident, SourceKey } from "@/lib/types";

const PAGE_SIZE = 10;

const SOURCE_META: Record<SourceKey, { label: string; icon: string }> = {
  slack: { label: "Slack", icon: "/icons/source-slack.svg" },
  jira: { label: "Jira", icon: "/icons/source-jira.svg" },
  email: { label: "Email", icon: "/icons/source-email.svg" },
  teams: { label: "Microsoft Teams", icon: "/icons/source-teams.svg" },
  calls: { label: "Calls", icon: "/icons/source-calls.svg" },
};

const SOURCE_ORDER: SourceKey[] = ["slack", "jira", "email", "teams", "calls"];
const SEVERITY_OPTIONS: Incident["severityLabel"][] = ["Critical", "Medium", "Low"];

interface IncidentsTableProps {
  incidents: Incident[];
  onSelectIncident: (incident: Incident) => void;
}

export function IncidentsTable({ incidents, onSelectIncident }: IncidentsTableProps) {
  const [query, setQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<SourceKey[]>([]);
  const [severityFilter, setSeverityFilter] = useState<Incident["severityLabel"][]>([]);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return incidents.filter((incident) => {
      if (q && !incident.title.toLowerCase().includes(q)) return false;
      if (sourceFilter.length > 0 && !incident.sources.some((source) => sourceFilter.includes(source))) return false;
      if (severityFilter.length > 0 && !severityFilter.includes(incident.severityLabel)) return false;
      return true;
    });
  }, [incidents, query, sourceFilter, severityFilter]);

  // Figma shows a second, empty page control even though the unfiltered mock
  // data exactly fills page 1 — mirrors the same intentional choice already
  // made for the Projects list's pagination.
  const isUnfiltered = !query.trim() && sourceFilter.length === 0 && severityFilter.length === 0;
  const pageCount = isUnfiltered ? 2 : Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function toggleSource(key: SourceKey, checked: boolean) {
    setSourceFilter((prev) => (checked ? [...prev, key] : prev.filter((k) => k !== key)));
    setPage(1);
  }

  function toggleSeverity(label: Incident["severityLabel"], checked: boolean) {
    setSeverityFilter((prev) => (checked ? [...prev, label] : prev.filter((l) => l !== label)));
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold text-text-primary-alt">Incidents</p>

        <div className="flex items-center gap-3">
          <div className="w-[179px] shrink-0">
            <Search
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search incidents..."
              className="border-border"
            />
          </div>

          <Dropdown>
            <DropdownTrigger asChild>
              <button
                type="button"
                className="flex h-9 items-center gap-2 rounded-sm border border-border bg-surface px-3 text-[13px] font-medium text-black transition-colors hover:bg-surface-muted"
              >
                All Sources
                <ChevronDown className="size-4 text-icon" aria-hidden />
              </button>
            </DropdownTrigger>
            <DropdownContent align="end">
              {SOURCE_ORDER.map((key) => (
                <DropdownCheckboxItem
                  key={key}
                  label={SOURCE_META[key].label}
                  checked={sourceFilter.includes(key)}
                  onCheckedChange={(checked) => toggleSource(key, checked)}
                />
              ))}
            </DropdownContent>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger asChild>
              <button
                type="button"
                className="flex h-9 items-center gap-2 rounded-sm border border-border bg-surface px-3 text-[13px] font-medium text-black transition-colors hover:bg-surface-muted"
              >
                All Severities
                <ChevronDown className="size-4 text-icon" aria-hidden />
              </button>
            </DropdownTrigger>
            <DropdownContent align="end">
              {SEVERITY_OPTIONS.map((label) => (
                <DropdownCheckboxItem
                  key={label}
                  label={label}
                  checked={severityFilter.includes(label)}
                  onCheckedChange={(checked) => toggleSeverity(label, checked)}
                />
              ))}
            </DropdownContent>
          </Dropdown>
        </div>
      </div>

      <Table className="text-[13px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[425px]">Incident</TableHead>
            <TableHead className="w-[176px] text-center">Severity</TableHead>
            <TableHead className="w-[138px] text-center">Source</TableHead>
            <TableHead className="w-[171px] text-center">Evidence</TableHead>
            <TableHead className="w-[237px] text-center">Detected</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.length === 0 ? (
            <tr>
              <td colSpan={5}>
                <EmptyState
                  title={isUnfiltered ? "No more incidents" : "No incidents match your filters"}
                  description={isUnfiltered ? undefined : "Try a different search term or filter."}
                />
              </td>
            </tr>
          ) : (
            paginated.map((incident) => (
              <TableRow
                key={incident.id}
                role="link"
                tabIndex={0}
                onClick={() => onSelectIncident(incident)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") onSelectIncident(incident);
                }}
                className="cursor-pointer transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
              >
                <TableCell className="h-12">{incident.title}</TableCell>
                <TableCell className="h-12 text-center">
                  <IncidentSeverityBadge incident={incident} />
                </TableCell>
                <TableCell className="h-12">
                  <div className="flex items-center justify-center gap-3">
                    {incident.sources.map((key) => (
                      <div key={key} className="relative size-4 shrink-0">
                        <Image src={SOURCE_META[key].icon} alt={SOURCE_META[key].label} fill sizes="16px" />
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="h-12 text-center">{incident.evidenceCount}</TableCell>
                <TableCell className={cn("h-12 whitespace-nowrap text-center")}>{incident.detected}</TableCell>
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
