import clsx from "clsx";
import type { ElementType, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TitleSize = "sm" | "md" | "lg" | "xl" | "2xl";
type TitleVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type TitleProps = {
  children?: ReactNode;
  size?: TitleSize;
  variant?: TitleVariant;
  className?: string;
};

const sizeClassesMapping: Record<TitleSize, string> = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-6xl",
  "2xl": "text-9xl",
};

export function Title({
  size = "xl",
  variant = "h1",
  className,
  children,
}: TitleProps) {
  const Tag: ElementType = variant;
  return (
    <Tag
      className={twMerge(
        clsx("font-semibold", sizeClassesMapping[size], className),
      )}
    >
      {children}
    </Tag>
  );
}
