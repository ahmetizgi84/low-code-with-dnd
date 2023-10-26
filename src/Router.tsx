import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import { Suspense, lazy } from "react";

const Apps = lazy(() => import("./pages/Apps"));
const Users = lazy(() => import("./pages/Users"));
const Plugins = lazy(() => import("./pages/Plugins"));
const Settings = lazy(() => import("./pages/Settings"));
const Account = lazy(() => import("./pages/Account"));

const Login = lazy(() => import("./pages/Login"));

// import store from "@/store";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

// const { loginData } = store.getState().auth;

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    // loader() {
    //   return { user: loginData?.user.name };
    // },
    Component: AuthLayout,
    children: [
      {
        index: true,
        loader: loginLoader,
        Component: Login,
      },
      {
        path: "register",
        element: <p>Register</p>,
      },
      {
        path: "forgot-password",
        element: <p>Forgot Password</p>,
      },
    ],
  },
  {
    path: "/builder/portal/",
    loader: protectedLoader,
    Component: DashboardLayout,
    children: [
      {
        path: "apps",
        Component: Apps,
      },
      {
        path: "users",
        Component: Users,
      },
      {
        path: "plugins",
        Component: Plugins,
      },
      {
        path: "settings",
        Component: Settings,
      },
      {
        path: "account",
        Component: Account,
      },
    ],
  },
]);

const Router = () => {
  return (
    <Suspense fallback={<Gatherer />}>
      <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
    </Suspense>
  );
};

export default Router;

async function loginLoader() {
  //   const loginData = store.getState().auth.loginData;
  const loginData = { user: "John Doe" };

  if (loginData != null) {
    return redirect("/builder/portal/apps");
  }
  return null;
}

function protectedLoader() {
  //   const loginData = store.getState().auth.loginData;
  const loginData = { user: "John Doe" };

  if (loginData == null) {
    return redirect("/");
  }
  return null;
}

function Gatherer() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>Gathering components</p>
    </div>
  );
}
