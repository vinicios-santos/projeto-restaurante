import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "./privateRoutes";
import { PublicRoutes } from "./publicRoutes";

export default function Router() {
  const user = localStorage.getItem("user");

  const router = createBrowserRouter([
    user ? PrivateRoutes() : {},
    ...PublicRoutes(!!user),
  ]);

  return <RouterProvider router={router} />;
}
