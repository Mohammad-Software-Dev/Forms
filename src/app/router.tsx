import { createBrowserRouter } from "react-router";

import { AppLayout } from "@/app/layout";
import { FormikRoute } from "@/routes/formik";
import { HomeRoute } from "@/routes/home";
import { NotFoundRoute } from "@/routes/not-found";
import { ReactHookFormRoute } from "@/routes/react-hook-form";
import { TanStackFormRoute } from "@/routes/tanstack-form";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: HomeRoute,
      },
      {
        path: "tanstack-form",
        Component: TanStackFormRoute,
      },
      {
        path: "react-hook-form",
        Component: ReactHookFormRoute,
      },
      {
        path: "formik",
        Component: FormikRoute,
      },
      {
        path: "*",
        Component: NotFoundRoute,
      },
    ],
  },
]);
