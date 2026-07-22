"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerClose = DialogPrimitive.Close;

const drawerContentVariants = cva(
  "fixed inset-y-0 right-0 z-50 flex h-full w-full flex-col overflow-y-auto border-l border-border-modal bg-surface p-6 shadow-card focus:outline-none",
  {
    variants: {
      size: {
        md: "max-w-md",
        lg: "max-w-2xl",
        xl: "max-w-[900px]",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
);

export interface DrawerContentProps
  extends DialogPrimitive.DialogContentProps,
    VariantProps<typeof drawerContentVariants> {
  showCloseButton?: boolean;
}

export function DrawerContent({
  className,
  children,
  size,
  showCloseButton = true,
  ...props
}: DrawerContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in" />
      <DialogPrimitive.Content
        className={cn(
          drawerContentVariants({ size }),
          "data-[state=open]:animate-in data-[state=open]:slide-in-from-right",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            className="absolute right-4 top-4 rounded-xs text-icon transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Close"
          >
            <X className="size-[18px]" aria-hidden />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DrawerTitle({ className, ...props }: DialogPrimitive.DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      className={cn("font-semibold text-lg text-text-primary", className)}
      {...props}
    />
  );
}

export function DrawerDescription({ className, ...props }: DialogPrimitive.DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      className={cn("mt-1 text-sm text-text-secondary", className)}
      {...props}
    />
  );
}
