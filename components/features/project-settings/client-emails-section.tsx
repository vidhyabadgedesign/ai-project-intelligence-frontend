interface ClientEmailsSectionProps {
  clientEmails: string[];
}

export function ClientEmailsSection({ clientEmails }: ClientEmailsSectionProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="border-b border-border pb-3 text-base font-semibold text-black">Client Emails</p>
      <div className="flex h-11 w-full items-center rounded-sm border border-border px-[17px]">
        <p className="truncate text-sm font-medium text-black">{clientEmails.join(", ")}</p>
      </div>
    </div>
  );
}
