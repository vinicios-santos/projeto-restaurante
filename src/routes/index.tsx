import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "./privateRoutes";
import { PublicRoutes } from "./publicRoutes";

export default function Router() {
    const auth = false
    const router = createBrowserRouter([
        auth ? PrivateRoutes() : {},
        ...PublicRoutes(auth),
    ]);

    return <RouterProvider router={router} />
}
