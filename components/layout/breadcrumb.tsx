"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbProps {
  label: string;
  href?: string;
  className?: string;
}

/**
 * Back-chevron + title pattern used on Project Details / Project Settings
 * topbars, as opposed to a traditional multi-level breadcrumb trail.
 */
export function Breadcrumb({ label, href, className }: BreadcrumbProps) {
  const router = useRouter();

  const content = (
    <>
      <ArrowLeft className="size-5 text-text-primary" aria-hidden />
      <span className="font-semibold text-lg text-text-primary">{label}</span>
    </>
  );

  const sharedClassName = cn(
    "flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xs",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={sharedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={() => router.back()} className={sharedClassName}>
      {content}
    </button>
  );
}
