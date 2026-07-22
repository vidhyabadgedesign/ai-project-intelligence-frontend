import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { SEVERITY_CONFIG, type Severity } from "@/lib/severity";

const badgeVariants = cva(
  "inline-flex items-center whitespace-nowrap rounded-pill px-2 py-1.5 text-sm font-sans leading-4",
  {
    variants: {
      variant: {
        neutral: "bg-surface-muted text-text-secondary",
        primary: "bg-primary/10 text-primary",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

interface BaseBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  severity?: never;
}

interface SeverityBadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  severity: Severity;
  variant?: never;
}

export type BadgeProps = BaseBadgeProps | SeverityBadgeProps;

export function Badge(props: BadgeProps) {
  if ("severity" in props && props.severity) {
    const { severity, className, ...rest } = props;
    const config = SEVERITY_CONFIG[severity];
    return (
      <span
        className={cn(
          "inline-flex items-center whitespace-nowrap rounded-pill px-2 py-1.5 text-sm font-sans leading-4",
          config.textClassName,
          config.bgClassName,
          className,
        )}
        {...rest}
      >
        {config.label}
      </span>
    );
  }

  const { variant, className, ...rest } = props as BaseBadgeProps;
  return <span className={cn(badgeVariants({ variant }), className)} {...rest} />;
}
