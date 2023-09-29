import Login from "@pages/login";
import { Navigate } from "react-router-dom";

export const PublicRoutes = (user: boolean) => {
  return [
    {
      path: "/",
      element: user ? <Navigate to="/dashboard" replace /> : <Login />,
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ];
};
