"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dropdown = PopoverPrimitive.Root;
export const DropdownTrigger = PopoverPrimitive.Trigger;
export const DropdownAnchor = PopoverPrimitive.Anchor;

export function DropdownContent({
  className,
  children,
  align = "start",
  sideOffset = 4,
  ...props
}: PopoverPrimitive.PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-h-80 w-64 overflow-y-auto rounded-md border border-border bg-surface p-2 shadow-card",
          className,
        )}
        {...props}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

interface DropdownCheckboxItemProps {
  label: ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export function DropdownCheckboxItem({
  label,
  checked,
  onCheckedChange,
  className,
}: DropdownCheckboxItemProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer select-none items-center gap-2 rounded-xs px-2 py-2 text-sm text-text-primary-alt hover:bg-surface-muted",
        className,
      )}
    >
      <CheckboxPrimitive.Root
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value === true)}
        className="flex size-4 shrink-0 items-center justify-center rounded-xs border border-border-input data-[state=checked]:border-primary data-[state=checked]:bg-primary"
      >
        <CheckboxPrimitive.Indicator>
          <Check className="size-3 text-white" aria-hidden />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <span>{label}</span>
    </label>
  );
}

interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

/** Single-select row for menus like a date-range filter (as opposed to DropdownCheckboxItem's multi-select). */
export function DropdownItem({ selected, className, type = "button", ...props }: DropdownItemProps) {
  return (
    <button
      type={type}
      role="option"
      aria-selected={selected}
      className={cn(
        "w-full rounded-xs px-2 py-2 text-left text-sm text-text-primary-alt transition-colors hover:bg-surface-muted",
        selected && "bg-primary/10 font-medium text-primary",
        className,
      )}
      {...props}
    />
  );
}
