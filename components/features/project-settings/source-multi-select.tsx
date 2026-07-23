"use client";

import { useState } from "react";
import { ChevronDown, SearchIcon } from "lucide-react";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownCheckboxItem } from "@/components/ui/dropdown";
import { Chip } from "./chip";

interface SourceMultiSelectProps {
  label: string;
  placeholder: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function SourceMultiSelect({ label, placeholder, options, selected, onChange }: SourceMultiSelectProps) {
  const [query, setQuery] = useState("");
  const filteredOptions = options.filter((option) => option.toLowerCase().includes(query.trim().toLowerCase()));

  function toggle(option: string, checked: boolean) {
    onChange(checked ? [...selected, option] : selected.filter((item) => item !== option));
  }

  return (
    <div className="flex w-full flex-col gap-1.5 pb-4">
      <p className="text-[13px] font-medium text-black">{label}</p>

      <Dropdown>
        <DropdownTrigger asChild>
          <button
            type="button"
            className="flex h-11 w-full items-center justify-between rounded-sm border border-border px-4 text-[13px] text-[#2d2d2d] transition-colors hover:bg-surface-muted"
          >
            {placeholder}
            <ChevronDown className="size-4 text-icon" aria-hidden />
          </button>
        </DropdownTrigger>
        <DropdownContent align="start" className="w-full min-w-[373px]">
          <div className="mb-2 flex h-9 items-center gap-2 rounded-xs border border-border px-3">
            <SearchIcon className="size-3.5 shrink-0 text-icon-secondary" aria-hidden />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-[13px] text-black placeholder:text-text-secondary focus:outline-none"
            />
          </div>
          {filteredOptions.map((option) => (
            <DropdownCheckboxItem
              key={option}
              label={option}
              checked={selected.includes(option)}
              onCheckedChange={(checked) => toggle(option, checked)}
            />
          ))}
        </DropdownContent>
      </Dropdown>

      {selected.length > 0 && (
        <div className="flex flex-wrap items-start gap-2 pt-2">
          {selected.map((item) => (
            <Chip key={item} label={item} onRemove={() => toggle(item, false)} />
          ))}
        </div>
      )}
    </div>
  );
}
