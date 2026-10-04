import { Card, CardContent } from "@/components/ui/card";
import { STEPS } from "@/lib/cni-steps";
import { useStore } from "@/store/store";

export function FormStepper({
  currentStep = 1,
  currentSubStep = 1,
  onStepChange,
}) {
  const completed = useStore((state) => state.completed);
  const active = STEPS.find((s) => s.number === currentStep) ?? STEPS[0];

  return (
    <section className="shrink-0 py-3 w-full">
      <div className="mx-auto w-full space-y-6">
        <div className="flex gap-2 overflow-x-auto pb-1 md:grid md:grid-cols-4 md:gap-1 md:overflow-visible">
          {STEPS.map((step) => {
            const isActive = step.number === currentStep;
            const isDone = step.subSteps.every(
              (subStep) => completed[`${step.number}.${subStep.number}`],
            );

            return (
              <Card
                key={step.number}
                onClick={() => onStepChange?.(step.number, 1)}
                className={[
                  "min-w-[160px] shrink-0 cursor-pointer py-3 transition-colors md:min-w-0 ring-0",
                  isActive
                    ? "border-foreground/20 bg-secondary/70"
                    : "border-border/50 bg-background/30 hover:border-border/80 hover:bg-secondary",
                ].join(" ")}
              >
                <CardContent className="flex items-stretch gap-3 px-3 md:px-4">
                  <span
                    className={[
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold md:h-8 md:w-8 md:text-sm",
                      isActive || isDone
                        ? "border-foreground/20 bg-foreground text-background"
                        : "border-border/70 text-muted-foreground",
                    ].join(" ")}
                  >
                    {isDone ? "✓" : step.number}
                  </span>

                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold tracking-tight">
                      {step.title}
                    </span>
                    <span className="text-muted-foreground mt-0.5 hidden text-xs leading-5 md:block">
                      {step.description}
                    </span>
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Sous-étapes de l'étape active */}
        <div
          role="tablist"
          aria-label={`Sous-étapes de ${active.title}`}
          className="flex gap-2 overflow-x-auto pb-1"
        >
          {active.subSteps.map((subStep) => {
            const n = subStep.number;
            const isActive = n === currentSubStep;
            const isDone = Boolean(completed[`${active.number}.${n}`]);

            return (
              <button
                key={subStep.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onStepChange?.(currentStep, n)}
                className={[
                  "flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors cursor-pointer",
                  isActive
                    ? "border-foreground/20 bg-background font-semibold shadow-sm"
                    : "border-border/50 text-muted-foreground hover:bg-background/70",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-4 w-4 items-center justify-center rounded-full text-[10px]",
                    isActive || isDone
                      ? "bg-foreground text-background"
                      : "border-border/70 border",
                  ].join(" ")}
                >
                  {isDone ? "✓" : n}
                </span>
                {subStep.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
