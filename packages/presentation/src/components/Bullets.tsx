import clsx from "clsx";
import type { ElementType, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type BulletsProps = {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
};

export function Bullets({ children, className, as: Tag = "ul" }: BulletsProps) {
  return (
    <Tag
      className={twMerge(
        clsx(
          "flex flex-col gap-3 text-left text-xl leading-snug text-kumo-default",
          className,
        ),
      )}
    >
      {children}
    </Tag>
  );
}

type BulletProps = {
  children?: ReactNode;
  className?: string;
};

export function Bullet({ children, className }: BulletProps) {
  return (
    <li
      className={twMerge(
        clsx("flex items-start gap-3", className),
      )}
    >
      <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-kumo-strong" />
      <span>{children}</span>
    </li>
  );
}
