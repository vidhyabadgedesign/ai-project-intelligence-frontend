"use client";

import { useState } from "react";
import { Modal, ModalContent, ModalTitle } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { TerminologyEntry } from "@/lib/types";

interface AddTerminologyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTerminology: (entry: TerminologyEntry) => void;
}

export function AddTerminologyModal({ open, onOpenChange, onAddTerminology }: AddTerminologyModalProps) {
  const [abbreviation, setAbbreviation] = useState("");
  const [meaning, setMeaning] = useState("");

  const canSubmit = abbreviation.trim().length > 0 && meaning.trim().length > 0;

  function reset() {
    setAbbreviation("");
    setMeaning("");
  }

  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) reset();
      }}
    >
      <ModalContent className="w-[calc(100%-2rem)] max-w-[360px] pt-5">
        <div className="flex flex-col gap-4 pr-2">
          <ModalTitle className="border-b border-border pb-3 text-base">Add Terminology</ModalTitle>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-black">Abbreviation</p>
              <Input
                value={abbreviation}
                onChange={(event) => setAbbreviation(event.target.value)}
                placeholder="Type abbreviation"
                className="h-11 rounded-sm border-border text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm text-black">Full Term</p>
              <Input
                value={meaning}
                onChange={(event) => setMeaning(event.target.value)}
                placeholder="Type full term"
                className="h-11 rounded-sm border-border text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              disabled={!canSubmit}
              onClick={() => {
                onAddTerminology({ abbreviation: abbreviation.trim(), meaning: meaning.trim() });
                onOpenChange(false);
              }}
              className="h-9 w-[112px] px-2 text-sm font-semibold"
            >
              Add
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
