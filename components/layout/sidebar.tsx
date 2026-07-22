"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Primary"
      className="flex h-full w-sidebar shrink-0 flex-col bg-secondary"
    >
      <div className="flex h-16 items-center pl-4">
        <Image src="/images/amazatic-logo.svg" alt="Amazatic" width={122} height={30} priority />
      </div>

      <nav className="flex flex-col gap-1 px-3 pt-5">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex h-10 items-center gap-3 rounded-nav pl-3 text-sm font-medium text-white transition-colors",
                isActive ? "rounded-sm bg-primary" : "hover:bg-white/5",
              )}
            >
              <span className="relative size-5 shrink-0">
                <Image src={item.icon} alt="" fill sizes="20px" />
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
