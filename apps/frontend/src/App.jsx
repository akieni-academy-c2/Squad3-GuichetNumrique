import { RouterProvider } from "react-router";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/auth-context.jsx";
import "./index.css";
import { router } from "./routes.jsx";

function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;
