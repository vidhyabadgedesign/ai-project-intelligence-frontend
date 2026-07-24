"use client";

import { useState } from "react";
import { AddActionLink } from "@/components/features/project-settings/add-action-link";
import { AddTerminologyModal } from "@/components/features/project-settings/add-terminology-modal";
import type { TerminologyEntry } from "@/lib/types";

interface CreateProjectTerminologyProps {
  terminology: TerminologyEntry[];
  onAddTerminology: (entry: TerminologyEntry) => void;
  onEditTerminology: (index: number, entry: TerminologyEntry) => void;
  onDeleteTerminology: (index: number) => void;
}

export function CreateProjectTerminology({
  terminology,
  onAddTerminology,
  onEditTerminology,
  onDeleteTerminology,
}: CreateProjectTerminologyProps) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addModalKey, setAddModalKey] = useState(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const editingEntry = editingIndex !== null ? terminology[editingIndex] : undefined;
  const editModalOpen = editingIndex !== null;

  function openEdit(index: number) {
    setEditingIndex(index);
  }

  function handleEditModalOpenChange(open: boolean) {
    if (!open) setEditingIndex(null);
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <p className="text-base font-semibold text-black">Terminology</p>
        <AddActionLink
          label="Add Terminology"
          onClick={() => {
            setAddModalKey((k) => k + 1);
            setAddModalOpen(true);
          }}
        />
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
          {terminology.map(({ abbreviation, meaning }, index) => (
            <button
              key={`${abbreviation}-${meaning}-${index}`}
              type="button"
              onClick={() => openEdit(index)}
              className="flex h-12 w-full cursor-pointer items-center rounded-sm border border-border px-[11px] py-[11px] text-left transition-colors hover:bg-surface-muted"
            >
              <p className="whitespace-nowrap text-sm text-black">
                <span className="font-semibold">{abbreviation} = </span>
                <span className="font-medium">{meaning}</span>
              </p>
            </button>
          ))}
        </div>
      )}

      {/* Add mode — key resets state on each open */}
      <AddTerminologyModal
        key={addModalKey}
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onAddTerminology={onAddTerminology}
      />

      {/* Edit mode — key resets state when a different entry is opened */}
      <AddTerminologyModal
        key={editingIndex !== null ? `edit-${editingIndex}` : "edit-none"}
        open={editModalOpen}
        onOpenChange={handleEditModalOpenChange}
        editEntry={editingEntry}
        onUpdateTerminology={(entry) => {
          if (editingIndex !== null) onEditTerminology(editingIndex, entry);
        }}
        onDeleteTerminology={() => {
          if (editingIndex !== null) onDeleteTerminology(editingIndex);
        }}
      />
    </div>
  );
}
