import { lazy } from "react";

// project imports
import Loadable from "ui-component/Loadable";
import MinimalLayout from "layout/MinimalLayout";
import Signup from "register/Signup";
import Login from "register/Login";
import Landing from "landing/Landing";

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import("views/pages/authentication/authentication3/Login3")));
const AuthRegister3 = Loadable(lazy(() => import("views/pages/authentication/authentication3/Register3")));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/pages/login/login3",
      element: <AuthLogin3 />,
    },
    {
      path: "/pages/register/register3",
      element: <AuthRegister3 />,
    },
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
    // {
    //     path: '/',
    //     element: <HomeLadningPage />
    // },

    // {
    //     path: '/signup',
    //     element: <Signup />
    // },

    // {
    //     path: '/login',
    //     element: <Login />
    // },
  ],
};

export default AuthenticationRoutes;
