"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "@/components/ui/dropdown";

const DATE_RANGE_OPTIONS = ["Today", "Yesterday", "Last 7 days", "Last 30 days"] as const;

export function DateFilterDropdown() {
  const [selected, setSelected] = useState<(typeof DATE_RANGE_OPTIONS)[number]>("Today");
  const [open, setOpen] = useState(false);

  return (
    <Dropdown open={open} onOpenChange={setOpen}>
      <DropdownTrigger asChild>
        <button
          type="button"
          className="flex h-9 w-32 items-center justify-between rounded-sm border border-border-input bg-surface p-3 transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span className="font-poppins-sans text-[13px] text-text-primary-alt">{selected}</span>
          <ChevronDown
            className={`size-4 text-icon transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
      </DropdownTrigger>
      <DropdownContent align="end" className="w-40">
        {DATE_RANGE_OPTIONS.map((option) => (
          <DropdownItem
            key={option}
            selected={option === selected}
            onClick={() => {
              setSelected(option);
              setOpen(false);
            }}
          >
            {option}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
}
