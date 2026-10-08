import type { ReactNode } from "react";

type KickerProps = {
  children?: ReactNode;
};

export function Kicker({ children }: KickerProps) {
  return (
    <p className="mb-3 text-sm font-semibold text-kumo-strong">
      {children}
    </p>
  );
}
