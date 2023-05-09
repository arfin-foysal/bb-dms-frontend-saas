import Error from "../components/client/Error";
import Services from "../components/client/Services";
import Contact from '../components/client/Contact';
import Home from "../components/client/Home";
import NotAccess from "../components/client/NotAccess";
import Login from "../components/pages/login/Login";
import Signup from "../components/pages/signup/Signup";
import { authUser, authUserToken } from "../utils/Auth";
import { Navigate } from "react-router-dom";


export const publicRoute = [
  {
    path: "",
    element: <Home />,
    children: [
      {
        path: "/service",
        element: <Services />,
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
  {
    path: "/signup",
    element:
    authUser !== "" && authUserToken !== "" ? <Navigate to={"/dashboard"} replace /> : <Signup />,
  },

  {
    path: "/not-access",
    element: <NotAccess />,
  },
  {
    path: "*",
    element: <Error />,
  },
];
