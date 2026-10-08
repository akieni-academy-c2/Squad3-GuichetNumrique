import { Deck } from "@revealjs/react";
import RevealHighlight from "reveal.js/plugin/highlight";
import { Presentation } from "./slides/presentation.tsx";

export default function App() {
  return (
    <Deck
      plugins={[RevealHighlight]}
      config={{
        hash: true,
        transition: "slide",
        width: 1280,
        height: 800,
        margin: 0.04,
      }}
    >
      <Presentation />
    </Deck>
  );
}
