import { createBrowserRouter } from "react-router";
import { ProtectedRoute } from "./components/protected-route.jsx";
import { Signin } from "./pages/auth/Signin.jsx";
import { Signup } from "./pages/auth/Signup.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";

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
        path: "/dashboard",
        Component: Dashboard,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
