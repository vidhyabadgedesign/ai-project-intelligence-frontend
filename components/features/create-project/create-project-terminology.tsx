"use client";

import { useState } from "react";
import { AddActionLink } from "@/components/features/project-settings/add-action-link";
import { AddTerminologyModal } from "@/components/features/project-settings/add-terminology-modal";
import type { TerminologyEntry } from "@/lib/types";

interface CreateProjectTerminologyProps {
  terminology: TerminologyEntry[];
  onAddTerminology: (entry: TerminologyEntry) => void;
}

export function CreateProjectTerminology({ terminology, onAddTerminology }: CreateProjectTerminologyProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <p className="text-base font-semibold text-black">Terminology</p>
        <AddActionLink label="Add Terminology" onClick={() => setModalOpen(true)} />
      </div>

      {terminology.length === 0 ? (
        <div className="flex h-[89px] w-full flex-col items-center justify-center gap-1 rounded-sm border border-border">
          <p className="text-[15px] font-medium text-black">No terminology added yet</p>
          <p className="text-sm text-text-tertiary">
            Add project-specific terms and abbreviations to provide better context for incident detection and reports.
          </p>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-2">
          {terminology.map(({ abbreviation, meaning }) => (
            <div
              key={`${abbreviation}-${meaning}`}
              className="flex h-12 w-full items-center rounded-sm border border-border px-[11px] py-[11px]"
            >
              <p className="whitespace-nowrap text-sm text-black">
                <span className="font-semibold">{abbreviation} = </span>
                <span className="font-medium">{meaning}</span>
              </p>
            </div>
          ))}
        </div>
      )}

      <AddTerminologyModal open={modalOpen} onOpenChange={setModalOpen} onAddTerminology={onAddTerminology} />
    </div>
  );
}
