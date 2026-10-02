import { createBrowserRouter } from "react-router";
import { Login } from "./pages/auth/Login.jsx";
import { Signup } from "./pages/auth/Signup.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";

/** @type {import("react-router").RouteObject[]} */
const routes = [
  {
    path: "/auth",
    children: [
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
    ],
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
];

export const router = createBrowserRouter(routes);
