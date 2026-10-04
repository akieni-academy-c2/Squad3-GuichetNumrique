import { createBrowserRouter } from "react-router";
import { ProtectedRoute } from "./components/protected-route.jsx";
import { AppLayout } from "./layouts/app-layout.jsx";
import { Signin } from "./pages/auth/Signin.jsx";
import { Signup } from "./pages/auth/Signup.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { CNIFormPage } from "./pages/CNI/CNIFormPage.jsx";

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
          {
            path: "/dashboard",
            Component: Dashboard,
          },
          {
            path: "/ask",
            Component: CNIFormPage,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
