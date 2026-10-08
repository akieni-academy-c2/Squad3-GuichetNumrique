import clsx from "clsx";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Badge as KumoBadge } from "@cloudflare/kumo/components/badge";

type BadgeProps = {
  children?: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <KumoBadge
      variant="outline"
      className={twMerge(clsx("px-4 py-2 text-sm", className))}
    >
      {children}
    </KumoBadge>
  );
}
