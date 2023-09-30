import { Layout } from "@components/base/layout";
import Analytics from "@pages/analytics";
import Home from "@pages/home";
import Student from "@pages/student";
import Subject from "@pages/subject";
import Teacher from "@pages/teacher";

export const PrivateRoutes = () => {
  return {
    element: <Layout />,
    children: [
      { path: "/dashboard", element: <Home /> },
      { path: "/subjects", element: <Subject /> },
      { path: "/teachers", element: <Teacher /> },
      { path: "/students", element: <Student /> },
      { path: "/analytics", element: <Analytics /> },
    ],
  };
};
