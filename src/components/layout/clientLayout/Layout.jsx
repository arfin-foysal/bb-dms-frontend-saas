import React from "react";
import { Link, Outlet } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { useSelector } from "./../../../store/index";
import logo from "./../../../assets/logo/logo.png";

function Layout() {
  const authUser = useSelector((state) => state.auth.token);


  return (
    <div >
      <div className="text-center text-primary p-5">
        <div className="py-4">
          <h4 className="py-2">Welcome to 😊</h4>
          <img src={logo} alt="Leave Managemant System" />
        </div>

        
        <h4>Leave Managemant System</h4>

        <div className="d-flex justify-content-center py-4">
          {authUser ? (
            <Link to="dashboard" className="btn btn-dark btn-sm ">
              Dashboard <BsArrowRight />
            </Link>
          ) : (
            <Link to="login" className="btn btn-dark btn-sm ">
              Login <BsArrowRight />
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
