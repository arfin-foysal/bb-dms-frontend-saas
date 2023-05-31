import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { RiLogoutCircleRFill } from "react-icons/ri";
import "./Dashboard.css";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { navItem } from "../../../Nav/NavItem";
import { user } from "../../../Route/utils";
import avatar from "../../../../src/assets/images/profile-picture.png";
import demo_logo from "../../../../src/assets/logo/demo_logo.png";

import Header from "./Header";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../../features/authSlice";

const Layout = () => {
  const authUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logout Successfully");
    window.location.reload(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  

  return (
    <>
      <div className="main-container">
        <div className="sidebar-wrapper">
          <motion.div


    
            


            animate={{
              width: isOpen ? "230px" : "55px",
              padding: isOpen ? "17px 17px" : "17px 7px",

              height: "100vh",
              overflow: "hidden",

              transition: {
                duration: 0.5,
                type: "spring",
                damping: 10,
              },
            }}
            className={`sidebar `}
          >
            <div className="top_section ">
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    // variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="logo pt-2"
                  >
                    <Link to="/dashboard">
                      {authUser?.company_image ? (
                        <>
                          <img
                            height={isOpen ? "30px" : "30px"}
                            width={isOpen ? "110px" : "40px"}
                            src={`${import.meta.env.VITE_FILE_URL}${
                              authUser?.company_image
                            }`}
                            alt={authUser?.company_name}
                          ></img>
                        </>
                      ) : (
                        <img
                          width={isOpen ? "110px" : "40px"}
                          height={isOpen ? "30px" : "30px"}
                          src={demo_logo}
                          alt={authUser?.company_name}
                        ></img>
                      )}

                      {/* <img src={logo} width={30} alt="" className="me-2" />
                    <img src={w_logo} width={70} alt="" /> */}
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="bars pointer ">
                <FaBars onClick={toggle} />
              </div>
            </div>

            <div className="d-flex shadow-lg  rounded  mt-2">
              <div>
                <img
                  className="rounded-circle"
                  width="35"
                  src={avatar}
                  alt=""
                />
              </div>
              <div className="mt-1 ms-2">
                {isOpen && (
                  <motion.h6
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text mt-1 ms-2 fw-lighter"
                  >
                    <p className="m-0 p-0 text-capitalize">{authUser?.name}</p>
                  </motion.h6>
                )}
              </div>
            </div>

            <div className=" search mt-4 m-0">
              <div className="search_icon mb-2 ml-2">
                <BiHomeAlt />
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.h6
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text mt-1 ms-2 fw-lighter"
                  >
                    <Link to="/dashboard">Dashboard</Link>
                  </motion.h6>
                )}
              </AnimatePresence>
            </div>
            <Scrollbars
              style={{
                width: "100%",
                height: "72%",
                color: "white",
              }}
              autoHide
              renderTrackHorizontal={(props) => (
                <div
                  {...props}
                  className="track-horizontal"
                  style={{ display: "none" }}
                />
              )}
            >
              <section className="routes">
                {navItem.map((route, index) => {
                  return (
                    route.role === user.role &&
                    (route.children ? (
                      <SidebarMenu
                        setIsOpen={setIsOpen}
                        route={route}
                        showAnimation={showAnimation}
                        isOpen={isOpen}
                        key={index}
                      />
                    ) : (
                      <NavLink
                        to={route.link}
                        key={index}
                        className="link"
                        activeClassName="active"
                      >
                        <div className="icon">{route.icon}</div>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              variants={showAnimation}
                              initial="hidden"
                              animate="show"
                              exit="hidden"
                              className="link_text"
                            >
                              {route.title}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </NavLink>
                    ))
                  );
                })}
              </section>
            </Scrollbars>
            <div>
              <div className="d-flex pointer ">
                <div className="mt-1 ms-2">
                  <RiLogoutCircleRFill size={20} />
                </div>
                <div className="mt-1 ms-2  ">
                  {isOpen && (
                    <span onClick={() => handelLogout()}>
                      <motion.h6
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text mt-1 ms-2 fw-lighter"
                      >
                        <p>LogOut</p>
                      </motion.h6>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="contain-wrapper">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
