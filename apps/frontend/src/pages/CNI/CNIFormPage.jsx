import { FormStepper } from "@/components/form-stepper.jsx";
import { Progress } from "@/components/ui/progress";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { TYPES_DEMANDE } from "@/lib/cni-config";
import { TOTAL_SUB_STEPS, getSubStep } from "@/lib/cni-steps";
import { useStore } from "@/store/store";

import { StepAside } from "./StepAside";
import { TypeDemandeCard } from "./TypeDemandeCard";
import { STEP_COMPONENTS } from "./step-components";

export function CNIFormPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const step = useStore((state) => state.step);
  const subStep = useStore((state) => state.subStep);
  const typeDemande = useStore((state) => state.typeDemande);
  const setTypeDemande = useStore((state) => state.setTypeDemande);
  const goToStep = useStore((state) => state.goToStep);
  const completed = useStore((state) => state.completed);

  const [stepperHeight, setStepperHeight] = useState(0);
  const stepperRef = useRef(null);

  useEffect(() => {
    if (!TYPES_DEMANDE.some((t) => t.value === type)) {
      navigate("/cni", { replace: true });
      return;
    }

    if (typeDemande === type) {
      return;
    }

    setTypeDemande(type);
    goToStep(1, 1);
  }, [type]);

  useEffect(() => {
    const el = stepperRef.current;
    if (!el) return;

    const measure = () => setStepperHeight(el.getBoundingClientRect().height);

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const CurrentStep = STEP_COMPONENTS[getSubStep(step, subStep).id];
  const termines = Object.values(completed).filter(Boolean).length;
  const pourcentage = Math.round((termines / TOTAL_SUB_STEPS) * 100);

  return (
    <>
      <header className="flex flex-col gap-3 self-start">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Demande de carte nationale d'identité
          </h1>
          <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed">
            Déroulez les quatre étapes du formulaire. Vos saisies sont
            enregistrées automatiquement dans ce navigateur : vous pouvez
            quitter la page et reprendre votre dossier plus tard. Le dépôt
            définitif de la demande n'a lieu qu'à la dernière étape.
          </p>
        </div>

        <div className="flex w-full max-w-md items-center gap-3">
          <Progress value={pourcentage} className="flex-1 gap-0" />
          <span className="text-muted-foreground text-xs tabular-nums">
            Étape {step} sur 4 · {termines}/{TOTAL_SUB_STEPS} sous-étapes
          </span>
        </div>
      </header>

      <TypeDemandeCard />

      <div
        ref={stepperRef}
        className="w-full bg-background sticky top-0 z-10 self-start border-b"
      >
        <FormStepper
          currentStep={step}
          currentSubStep={subStep}
          onStepChange={goToStep}
        />
      </div>

      <div
        style={{ "--stepper-h": `${stepperHeight}px` }}
        className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
      >
        <div className="min-w-0">
          <CurrentStep />
        </div>

        <div className="sticky top-[calc(var(--stepper-h)+1rem)] self-start">
          <StepAside />
        </div>
      </div>
    </>
  );
}
