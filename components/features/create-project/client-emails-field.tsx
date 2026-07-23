"use client";

import { useState, type KeyboardEvent } from "react";
import { Chip } from "@/components/features/project-settings/chip";

interface ClientEmailsFieldProps {
  emails: string[];
  onChange: (emails: string[]) => void;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ClientEmailsField({ emails, onChange }: ClientEmailsFieldProps) {
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);

  function commitDraft() {
    const value = draft.trim().replace(/,$/, "");
    if (!value) return;
    if (!EMAIL_PATTERN.test(value)) {
      setError("Enter a valid email address.");
      return;
    }
    if (emails.includes(value)) {
      setError("This email has already been added.");
      return;
    }
    onChange([...emails, value]);
    setDraft("");
    setError(null);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      commitDraft();
    } else if (event.key === "Backspace" && draft === "" && emails.length > 0) {
      onChange(emails.slice(0, -1));
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <p className="border-b border-border pb-3 text-base font-semibold text-black">Client Emails</p>

      <div className="flex flex-col gap-2">
        <div className="flex min-h-11 w-full flex-wrap items-center gap-2 rounded-sm border border-border px-[17px] py-2">
          {emails.map((email) => (
            <Chip key={email} label={email} onRemove={() => onChange(emails.filter((e) => e !== email))} />
          ))}
          <input
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              if (error) setError(null);
            }}
            onKeyDown={handleKeyDown}
            onBlur={commitDraft}
            placeholder={emails.length === 0 ? "Enter client email" : ""}
            className="min-w-[160px] flex-1 bg-transparent text-sm text-text-primary-alt placeholder:text-text-disabled focus:outline-none"
          />
        </div>
        {error && <p className="text-xs text-critical">{error}</p>}
      </div>
    </div>
  );
}
