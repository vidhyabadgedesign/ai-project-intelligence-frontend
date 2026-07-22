"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const ToastProvider = ToastPrimitive.Provider;

export function ToastViewport({ className, ...props }: ToastPrimitive.ToastViewportProps) {
  return (
    <ToastPrimitive.Viewport
      className={cn(
        "fixed bottom-0 right-0 z-50 flex w-full max-w-sm flex-col gap-2 p-6 outline-none",
        className,
      )}
      {...props}
    />
  );
}

const toastVariants = cva(
  "relative flex w-full items-start gap-3 rounded-md border p-4 shadow-card data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom data-[state=closed]:animate-out data-[state=closed]:fade-out",
  {
    variants: {
      variant: {
        default: "border-border bg-surface",
        success: "border-low/20 bg-surface",
        error: "border-critical/20 bg-surface",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface ToastProps
  extends ToastPrimitive.ToastProps,
    VariantProps<typeof toastVariants> {}

export function Toast({ className, variant, ...props }: ToastProps) {
  return <ToastPrimitive.Root className={cn(toastVariants({ variant }), className)} {...props} />;
}

export function ToastTitle({ className, ...props }: ToastPrimitive.ToastTitleProps) {
  return (
    <ToastPrimitive.Title
      className={cn("font-medium text-sm text-text-primary", className)}
      {...props}
    />
  );
}

export function ToastDescription({ className, ...props }: ToastPrimitive.ToastDescriptionProps) {
  return (
    <ToastPrimitive.Description
      className={cn("mt-1 text-sm text-text-secondary", className)}
      {...props}
    />
  );
}

export function ToastClose({ className, ...props }: ToastPrimitive.ToastCloseProps) {
  return (
    <ToastPrimitive.Close
      className={cn("ml-auto shrink-0 text-icon transition-colors hover:text-text-primary", className)}
      aria-label="Dismiss"
      {...props}
    >
      <X className="size-4" aria-hidden />
    </ToastPrimitive.Close>
  );
}
