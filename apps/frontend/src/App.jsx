import { RouterProvider } from "react-router";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./index.css";
import { router } from "./routes.jsx";

function App() {
  return (
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  );
}

export default App;
