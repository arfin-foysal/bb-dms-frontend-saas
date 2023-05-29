import React from "react";
import {  Outlet } from "react-router-dom";

import { useSelector } from "./../../../store/index";
import Header from "./Header";
import Footer from "./Footer";
import "./Client.css"
function Layout() {
  const authUser = useSelector((state) => state.auth.token);


  return (
    <div >
      <Header/>
      <Outlet />
      <Footer/>
    </div>
  );
}

export default Layout;
