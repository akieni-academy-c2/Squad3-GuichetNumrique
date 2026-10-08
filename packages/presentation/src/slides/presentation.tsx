import { BackendSlides } from "./backend.tsx";
import { FrontendSlides } from "./frontend.tsx";
import { MonorepoSlides } from "./monorepo.tsx";
import { OverviewSlides } from "./overview.tsx";

export function Presentation() {
  return (
    <>
      <OverviewSlides />
      <MonorepoSlides />
      <BackendSlides />
      <FrontendSlides />
    </>
  );
}
