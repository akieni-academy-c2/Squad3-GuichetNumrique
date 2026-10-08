type TreeProps = {
  children?: string;
};

export function Tree({ children }: TreeProps) {
  return (
    <pre className="min-w-0 w-full max-w-full overflow-x-auto rounded-xl bg-kumo-canvas p-4 text-left font-mono text-sm leading-6 whitespace-pre text-kumo-default ring ring-kumo-hairline">
      {children}
    </pre>
  );
}
