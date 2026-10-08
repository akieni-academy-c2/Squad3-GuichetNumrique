import clsx from "clsx";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type FrameProps = {
  children?: ReactNode;
  className?: string;
  center?: boolean;
};

export function Frame({ children, className, center }: FrameProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "flex h-full w-full flex-col px-16 py-10 text-left text-kumo-default",
          center ? "items-center justify-center text-center" : "justify-center",
          className,
        ),
      )}
    >
      {children}
    </div>
  );
}
