/**
 * @author Souveraine Mabelemo
 * @created 2026-10-06
 */
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

/**
 * Route intermédiaire de la documentation.
 *
 * Récupère le slug présent dans l'URL
 * et le transmet à DocumentationPage.
 */

function DocumentationRoute() {
  const { slug } = useParams();
  return <DocumentationPage slug={slug} />;
}

/** @type {import("react-router").RouteObject[]} */
const routes = [
  // Routes liées à la documentation de la CNI.
  {
    path: "/auth",
    children: [
      // Page d'accueil qui liste les différentes rubriques.
      { path: "signin", Component: Signin },
      // Route dynamique : le slug identifie la rubrique à afficher.
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
