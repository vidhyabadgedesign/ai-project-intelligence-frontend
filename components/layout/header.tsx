"use client";

import { type ReactNode } from "react";
import Image from "next/image";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeaderUser {
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface HeaderProps {
  title: ReactNode;
  user: HeaderUser;
  actions?: ReactNode;
  onSignOut?: () => void;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Header({ title, user, actions, onSignOut }: HeaderProps) {
  return (
    <header className="flex h-topbar shrink-0 items-center justify-between bg-surface px-6 shadow-topbar">
      <div className="font-semibold text-lg text-text-primary">{title}</div>

      <div className="flex items-center gap-3">
        {actions}

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-xs p-2 transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {user.avatarUrl ? (
                <span className="relative size-8 shrink-0 overflow-hidden rounded-full">
                  <Image src={user.avatarUrl} alt="" fill sizes="32px" className="object-cover" />
                </span>
              ) : (
                <span
                  aria-hidden
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white"
                >
                  {initials(user.name)}
                </span>
              )}
              <span className="flex flex-col items-start leading-tight">
                <span className="font-semibold text-sm text-text-primary">{user.name}</span>
                <span className="text-[11px] text-text-tertiary">{user.role}</span>
              </span>
              <ChevronDown className="size-4 text-icon" aria-hidden />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={8}
              className={cn(
                "z-50 w-48 rounded-md border border-border bg-surface p-1 shadow-card",
              )}
            >
              <DropdownMenu.Item
                className="cursor-pointer rounded-xs px-3 py-2 text-sm text-text-primary-alt outline-none data-[highlighted]:bg-surface-muted"
              >
                Profile
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 h-px bg-border-table" />
              <DropdownMenu.Item
                onSelect={onSignOut}
                className="cursor-pointer rounded-xs px-3 py-2 text-sm text-critical outline-none data-[highlighted]:bg-critical-bg"
              >
                Sign Out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}
