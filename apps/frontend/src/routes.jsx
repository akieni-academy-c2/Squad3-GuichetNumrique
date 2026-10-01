import { createBrowserRouter } from "react-router";
import { Login } from "./pages/auth/Login.jsx";

/** @type {import("react-router").RouteObject[]} */
const routes = [
  {
    path: "/auth",
    children: [{ path: "login", Component: Login }],
  },
];

export const router = createBrowserRouter(routes);
