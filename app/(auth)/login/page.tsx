import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sign in — AI Project Intelligence Platform",
};

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: "/icons/feature-incident-detection.svg",
    title: "AI Incident Detection",
    description:
      "Automatically identifies engineering incidents, delivery risks, and project anomalies from Slack conversations and Jira activity.",
  },
  {
    icon: "/icons/feature-evidence-collection.svg",
    title: "Evidence Collection",
    description:
      "Collects and organizes supporting Slack messages and Jira issues so every incident is backed by clear evidence.",
  },
];

function FeatureRow({ icon, title, description }: Feature) {
  return (
    <div className="flex w-full items-start gap-3.5">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md border-[0.667px] border-white/10 bg-white/10">
        <div className="relative size-3.5">
          <Image src={icon} alt="" fill sizes="14px" priority />
        </div>
      </div>
      <div className="flex flex-col items-start gap-0.5 pt-0.5">
        <p className="font-medium text-base text-white">{title}</p>
        <p className="text-sm leading-[19.5px] text-[#cfcfcf]">{description}</p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh w-full flex-col lg:flex-row">
      <section
        className="relative flex w-full shrink-0 flex-col justify-center overflow-hidden px-6 py-12 sm:px-10 lg:h-dvh lg:w-[712px] lg:justify-start lg:px-0 lg:py-0"
        style={{ backgroundImage: "var(--gradient-brand-panel)" }}
      >
        <Image
          src="/images/login-brand-bg.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 712px, 100vw"
          className="pointer-events-none object-cover"
        />

        <div className="relative z-10 mb-8 lg:absolute lg:left-[49px] lg:top-[60px] lg:mb-0">
          <Image src="/images/amazatic-logo-full.svg" alt="Amazatic" width={177} height={44} priority />
        </div>

        <div className="relative z-10 flex w-full max-w-[636px] flex-col gap-6 lg:absolute lg:left-[38px] lg:top-1/2 lg:max-w-[636px] lg:-translate-y-[calc(50%+42px)] lg:gap-[33px]">
          <p className="font-semibold text-2xl leading-tight text-white lg:text-[28px] lg:leading-normal">
            Enterprise AI that detects project incidents before they become delivery risks.
          </p>
          <div className="flex w-full flex-col gap-4 lg:gap-2">
            {FEATURES.map((feature) => (
              <FeatureRow key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-1 items-center justify-center px-6 py-16 lg:py-0">
        <div className="flex w-full max-w-[395px] flex-col items-center gap-5">
          <p className="w-full text-lg font-semibold text-[#101828]">
            Sign in with your Amazatic account to continue.
          </p>

          <Link
            href="/account-selection"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-[54px] w-full max-w-[384px] gap-2 rounded-sm text-[15px] tracking-[-0.15px]",
            )}
          >
            <span className="relative size-6 shrink-0">
              <Image src="/icons/google-logo.svg" alt="" fill sizes="24px" priority />
            </span>
            Continue with Google
          </Link>
        </div>
      </section>
    </div>
  );
}
