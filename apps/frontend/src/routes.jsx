import { Navigate, createBrowserRouter, useParams } from "react-router";
import { ProtectedRoute } from "./components/protected-route.jsx";
import { AppLayout } from "./layouts/app-layout.jsx";
import { Signin } from "./pages/auth/Signin.jsx";
import { Signup } from "./pages/auth/Signup.jsx";
import { CNIFormPage } from "./pages/CNI/CNIFormPage.jsx";
import { DemandeTypePage } from "./pages/CNI/DemandeTypePage.jsx";
import { DocumentationIndex } from "./pages/Documentation/DocumentationIndex.jsx";
import { DocumentationLayout } from "./pages/Documentation/DocumentationLayout.jsx";
import { DocumentationPage } from "./pages/Documentation/DocumentationPage.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";

function DocumentationRoute() {
  const { slug } = useParams();
  return <DocumentationPage slug={slug} />;
}

/** @type {import("react-router").RouteObject[]} */
const routes = [
  {
    path: "/auth",
    children: [
      { path: "signin", Component: Signin },
      { path: "signup", Component: Signup },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: "/dashboard", Component: Dashboard },
          { path: "/ask", element: <Navigate to="/cni" replace /> },
          {
            path: "/cni/documentation",
            Component: DocumentationLayout,
            children: [
              { index: true, Component: DocumentationIndex },
              { path: ":slug", Component: DocumentationRoute },
            ],
          },
          {
            path: "/cni",
            children: [
              // { index: true, Component: DemandeTypePage },
              { index: true, path: "formulaire/:type", Component: CNIFormPage },
            ],
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
