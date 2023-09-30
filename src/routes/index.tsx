import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "./privateRoutes";
import { PublicRoutes } from "./publicRoutes";

export default function Router() {
  const token = localStorage.getItem("token");

  const router = createBrowserRouter([
    token ? PrivateRoutes() : {},
    ...PublicRoutes(!!token),
  ]);

  return <RouterProvider router={router} />;
}
