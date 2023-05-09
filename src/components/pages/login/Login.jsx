import React from "react";
import { Link } from "react-router-dom";
import logo from "./../../../assets/logo/logo.png";
import { useLoginMutation } from "../../../services/authApi";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { loginSchema } from "./../../../validation/loginSchema";
import { toast } from "react-toastify";
import { authToken, authUser, userRole } from "../../../features/authSlice";
import { BsArrowRight } from "react-icons/bs";

const Login = () => {
  const [login, res] = useLoginMutation();

  const { data, isLoading, isSuccess } = res;

  const dispatch = useDispatch();
  const formik = useFormik({
    validationSchema: loginSchema,
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const result = await login(values).unwrap();

        toast.success(result.message);
      } catch (error) {
        toast.error(error.data.message);
      }
    },
  });

  if (isSuccess) {
    dispatch(authUser(data?.user));
    dispatch(authToken(data?.token));
    dispatch(userRole(data?.user?.user_type));
    //   // navigate("/dashboard");
    window.location.reload(false);
  }

  return (
    <>

      <div className="container">
        {/* <!-- Outer Row --> */}
        <div className="row justify-content-center my-5">
          <div className="col-12 col-md-4 pt-5">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col">
                    <div className="p-5">
                      <div>
                        {isLoading && (
                          <div className="text-center">
                            <div class="spinner-border" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-center pb-3">
                        <img src={logo} alt="" width={150} />
                      </div>
                      <form className="user" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            className={
                              formik.errors.email && formik.touched.email
                                ? "form-control form-control-user is-invalid  shadow"
                                : "form-control form-control-user  shadow"
                            }
                          />
                          {formik.errors.email && formik.touched.email ? (
                            <div className="invalid-feedback">
                              {formik.errors.email}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group pt-2">
                          <input
                            type="password"
                            name="password"
                            id="exampleInputPassword"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            className={
                              formik.errors.password && formik.touched.password
                                ? "form-control form-control-user is-invalid  shadow"
                                : "form-control form-control-user shadow"
                            }
                          />
                          {formik.errors.password && formik.touched.password ? (
                            <div className="invalid-feedback">
                              {formik.errors.password}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group pt-3 text-center">
                          <button
                            type="submit"
                            className="btn btn-primary btn-user btn-block"
                          >
                            Login
                            <BsArrowRight />
                          </button>
                        </div>
                      </form>
                      <hr />
                      {/* <div className="text-center ">
                        <Link
                          className="small text-dark"
                          to="forgot-password.html"
                        >
                          Forgot Password?
                        </Link>
                      </div> */}
                      <div className="text-center">
                      <Link className="small text-dark" to="/signup">
                        Create an Account!
                      </Link>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
