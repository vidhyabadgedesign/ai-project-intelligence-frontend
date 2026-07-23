"use client";

import { useState } from "react";
import { AddActionLink } from "./add-action-link";
import { AddTerminologyModal } from "./add-terminology-modal";
import type { TerminologyEntry } from "@/lib/types";

interface TerminologySectionProps {
  terminology: TerminologyEntry[];
  onAddTerminology: (entry: TerminologyEntry) => void;
}

function chunk<T>(items: T[], columns: number): T[][] {
  const size = Math.ceil(items.length / columns);
  const groups: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    groups.push(items.slice(i, i + size));
  }
  return groups;
}

export function TerminologySection({ terminology, onAddTerminology }: TerminologySectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const columns = chunk(terminology, 4);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <p className="text-base font-semibold text-black">Terminology</p>
        <AddActionLink label="Add Terminology" onClick={() => setModalOpen(true)} />
      </div>

      <div className="flex w-full gap-0 overflow-x-auto rounded-sm border border-border p-[11px]">
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="flex flex-1 flex-col gap-4 border-border px-3 first:pl-0 last:border-r-0"
            style={{ borderRightWidth: columnIndex < columns.length - 1 ? 1 : 0 }}
          >
            {column.map(({ abbreviation, meaning }) => (
              <p key={`${abbreviation}-${meaning}`} className="whitespace-nowrap text-sm text-black">
                <span className="font-semibold">{abbreviation} = </span>
                <span className="font-medium">{meaning}</span>
              </p>
            ))}
          </div>
        ))}
      </div>

      <AddTerminologyModal open={modalOpen} onOpenChange={setModalOpen} onAddTerminology={onAddTerminology} />
    </div>
  );
}
