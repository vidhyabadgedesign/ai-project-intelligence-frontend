import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { dmSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Choose an account — AI Project Intelligence Platform",
};

const APP_NAME = "Amazatic";

// Google's Material "standard" easing curve — used for the row hover/active
// background transitions, matching the current chooser's motion timing.
const ROW_TRANSITION = "transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]";
const ROW_CLASSES = cn(
  "flex w-full items-center gap-4 px-8 py-4 text-left sm:px-10",
  ROW_TRANSITION,
  "hover:bg-[#f8f9fa] focus-visible:outline-none focus-visible:bg-[#f8f9fa] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1a73e8] active:bg-[#f1f3f4]",
);

interface MockAccount {
  id: string;
  name: string;
  email: string;
  avatar: { type: "photo"; src: string } | { type: "initial"; letter: string; bg: string };
}

// Realistic mock accounts, distinct from any real account — including the
// same "Dev Chen" persona used as the signed-in user elsewhere in the app
// once the flow reaches the Dashboard.
const MOCK_ACCOUNTS: MockAccount[] = [
  {
    id: "dev-chen",
    name: "Dev Chen",
    email: "dev.chen@amazatic.com",
    avatar: { type: "initial", letter: "D", bg: "#1a73e8" },
  },
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    email: "sarahchen35@amazatic.com",
    avatar: { type: "photo", src: "/images/avatar-sarah-chen.png" },
  },
  {
    id: "andre-chou",
    name: "André Chou",
    email: "johndoe12@gmail.com",
    avatar: { type: "initial", letter: "J", bg: "#f4511e" },
  },
];

function AccountRow({ account }: { account: MockAccount }) {
  return (
    <Link href="/dashboard" className={cn(ROW_CLASSES, "border-b border-[#e0e0e0]")}>
      {account.avatar.type === "photo" ? (
        <span className="relative size-10 shrink-0 overflow-hidden rounded-full">
          <Image src={account.avatar.src} alt="" fill sizes="40px" className="object-cover" />
        </span>
      ) : (
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-base font-medium text-white"
          style={{ backgroundColor: account.avatar.bg }}
        >
          {account.avatar.letter}
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col items-start">
        <span className="w-full truncate text-base font-medium leading-6 text-[#202124]">{account.name}</span>
        <span className="w-full truncate text-sm leading-5 text-[#5f6368]">{account.email}</span>
      </span>
    </Link>
  );
}

export default function AccountSelectionPage() {
  return (
    <div
      className={`${dmSans.variable} flex min-h-dvh w-full flex-col items-center gap-4 bg-[#e8eaed] px-4 py-10 sm:py-16`}
      style={{ fontFamily: "var(--font-dm-sans)" }}
    >
      <div className="flex w-full max-w-[1160px] flex-col rounded-[28px] bg-white shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)]">
        {/* Top title bar */}
        <div className="flex w-full items-center gap-3 border-b border-[#e0e0e0] px-8 py-4 sm:px-10">
          <span className="relative size-6 shrink-0">
            <Image src="/icons/google-logo.svg" alt="Google" fill sizes="24px" priority />
          </span>
          <p className="text-base text-[#3c4043]">Sign in with Google</p>
        </div>

        {/* Two-column body */}
        <div className="flex flex-col gap-10 px-8 py-12 sm:px-10 lg:flex-row lg:items-center lg:gap-20 lg:py-16">
          {/* Left column */}
          <div className="flex flex-col items-start gap-4 lg:w-[42%] lg:shrink-0">
            <h1 className="text-[32px] font-normal leading-tight text-[#202124] sm:text-[40px] sm:leading-[48px]">
              Choose an account
            </h1>
            <p className="text-base leading-6 text-[#444746]">
              {`to continue to `}
              <span className="text-[#1a73e8]">{APP_NAME}</span>
            </p>
          </div>

          {/* Right column */}
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="mt-4 flex flex-col border-t border-[#e0e0e0]">
              {MOCK_ACCOUNTS.map((account) => (
                <AccountRow key={account.id} account={account} />
              ))}

              <Link href="/dashboard" className={cn(ROW_CLASSES, "border-b border-[#e0e0e0]")}>
                <span className="relative size-10 shrink-0">
                  <Image src="/icons/account-circle.svg" alt="" fill sizes="40px" />
                </span>
                <span className="min-w-0 flex-1 text-base font-medium leading-6 text-[#202124]">
                  Use another account
                </span>
              </Link>
            </div>

            <p className="px-8 text-sm leading-5 text-[#444746] sm:px-10">
              {`Before using this app, you can review ${APP_NAME}'s `}
              <a
                href="https://www.kittl.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="text-[#1a73e8] hover:underline"
              >
                Privacy Policy
              </a>
              {` and `}
              <a
                href="https://www.kittl.com/terms"
                target="_blank"
                rel="noreferrer"
                className="text-[#1a73e8] hover:underline"
              >
                Terms of Service
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Bottom, outside the dialog */}
      <div className="flex w-full max-w-[1160px] flex-col items-center gap-3 px-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          className={cn(
            "flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-[#444746]",
            ROW_TRANSITION,
            "hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]",
          )}
        >
          English (United States)
          <span className="relative size-5 shrink-0">
            <Image src="/icons/arrow-drop-down.svg" alt="" fill sizes="20px" />
          </span>
        </button>
        <div className="flex items-center gap-1">
          {["Help", "Privacy", "Terms"].map((label) => (
            <button
              key={label}
              type="button"
              className={cn(
                "rounded-md px-3 py-1.5 text-sm text-[#444746]",
                ROW_TRANSITION,
                "hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
