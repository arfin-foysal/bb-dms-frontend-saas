import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
const Home = () => {
  return (
    <div className="text-center mt-5">
      <div>
     
        <h5>Welcome To </h5>
           <img src={logo} className=" w-" alt="" />
        <h4 className="mt-5">Document Management System (DMS)</h4>
        <Link className=" btn btn-sm btn-primary"  to="dashboard">&larr; Go to Dashboard</Link>
      </div>

      <Outlet />
    </div>
  );
};

export default Home;
