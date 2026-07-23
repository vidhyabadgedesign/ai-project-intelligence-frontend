import { type ReactNode } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConnectedSourceCardProps {
  icon: string;
  label: string;
  description: string;
  connected: boolean;
  /** When provided and not yet connected, renders a "Connect" button instead of the "Connected" badge (Create Project's pre-connection state). */
  onConnect?: () => void;
  children?: ReactNode;
}

export function ConnectedSourceCard({ icon, label, description, connected, onConnect, children }: ConnectedSourceCardProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-md border border-border p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative size-6 shrink-0">
            <Image src={icon} alt="" fill sizes="24px" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-[#101828]">{label}</p>
            <p className="text-xs font-medium text-text-tertiary">{description}</p>
          </div>
        </div>
        {connected ? (
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="text-sm font-medium text-primary">Connected</span>
            <CheckCircle className="size-4 text-primary" aria-hidden />
          </div>
        ) : (
          onConnect && (
            <Button variant="secondary" onClick={onConnect} className="h-9 w-[115px] shrink-0 text-sm">
              Connect
            </Button>
          )
        )}
      </div>
      {children}
    </div>
  );
}
