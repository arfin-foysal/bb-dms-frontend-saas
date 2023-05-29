
import Contact from '../components/client/Contact';
import Home from "../components/client/Home";

import Login from "../components/pages/login/Login";
import Signup from "../components/pages/signup/Signup";
import { authUser, authUserToken } from "../utils/Auth";
import { Navigate } from "react-router-dom";
import Error from "../components/pages/commonViews/Error";
import NotAccess from "../components/pages/commonViews/NotAccess";
import Layout from "../components/layout/clientLayout/Layout";
import Purchase from '../components/client/Purchase';


export const publicRoute = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/purchase",
        element: <Purchase />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
     
    ],
  },
  {
    path: "/login",
    element:
      authUser !== "" && authUserToken !== "" ? <Navigate to={"/dashboard"} replace /> : <Login />,
  },


  // {
  //   path: "/signup",
  //   element:
  //   authUser !== "" && authUserToken !== "" ? <Navigate to={"/dashboard"} replace /> : <Signup />,
  // },

  {
    path: "/not-access",
    element:<NotAccess />,
  },
  {
    path: "*",
    element: <Error/>,
  },
];
