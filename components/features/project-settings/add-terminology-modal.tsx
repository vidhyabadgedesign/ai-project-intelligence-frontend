"use client";

import { useState } from "react";
import { Modal, ModalContent, ModalTitle } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { TerminologyEntry } from "@/lib/types";

interface AddTerminologyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // Add mode
  onAddTerminology?: (entry: TerminologyEntry) => void;
  // Edit mode — when provided, modal opens in edit mode
  editEntry?: TerminologyEntry;
  onUpdateTerminology?: (entry: TerminologyEntry) => void;
  onDeleteTerminology?: () => void;
}

export function AddTerminologyModal({
  open,
  onOpenChange,
  onAddTerminology,
  editEntry,
  onUpdateTerminology,
  onDeleteTerminology,
}: AddTerminologyModalProps) {
  const isEditMode = !!editEntry;

  // Initialized from editEntry on mount; parent supplies a key prop to force
  // remount whenever editEntry changes so we always start with the right values.
  const [abbreviation, setAbbreviation] = useState(editEntry?.abbreviation ?? "");
  const [meaning, setMeaning] = useState(editEntry?.meaning ?? "");

  const canSubmit = abbreviation.trim().length > 0 && meaning.trim().length > 0;

  function handleAdd() {
    if (!canSubmit || !onAddTerminology) return;
    onAddTerminology({ abbreviation: abbreviation.trim(), meaning: meaning.trim() });
    onOpenChange(false);
  }

  function handleUpdate() {
    if (!canSubmit || !onUpdateTerminology) return;
    onUpdateTerminology({ abbreviation: abbreviation.trim(), meaning: meaning.trim() });
    onOpenChange(false);
  }

  function handleDelete() {
    onDeleteTerminology?.();
    onOpenChange(false);
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="w-[calc(100%-2rem)] max-w-[360px] pt-5">
        <div className="flex flex-col gap-4 pr-2">
          <ModalTitle className="border-b border-border pb-3 text-base">
            {isEditMode ? "Terminology" : "Add Terminology"}
          </ModalTitle>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-black">Abbreviation</p>
              <Input
                value={abbreviation}
                onChange={(e) => setAbbreviation(e.target.value)}
                placeholder="Type abbreviation"
                className="h-11 rounded-sm border-border text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm text-black">Full Term</p>
              <Input
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                placeholder="Type full term"
                className="h-11 rounded-sm border-border text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            {isEditMode ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  className="h-9 px-4 text-sm font-medium"
                >
                  Delete
                </Button>
                <Button
                  disabled={!canSubmit}
                  onClick={handleUpdate}
                  className="h-9 px-4 text-sm font-semibold"
                >
                  Update
                </Button>
              </>
            ) : (
              <Button
                disabled={!canSubmit}
                onClick={handleAdd}
                className="h-9 w-[112px] px-2 text-sm font-semibold"
              >
                Add
              </Button>
            )}
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
