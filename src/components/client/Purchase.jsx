import React from "react";
import reg from "./../../assets/images/reg.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useAddClientInfoMutation } from "../../services/clientInfoApi";

const Purchase = () => {
  const navigate = useNavigate();
  const [addClientInfo, res] = useAddClientInfoMutation();



  const formik = useFormik({
    initialValues: {
      company_name: "",
      company_address: "",
      company_phone: "",
      company_email: "",
      company_website: "",
      company_logo: "",
      company_country: "",
      company_user_name: "",
      company_user_email: "",
      company_user_phone: "",
      company_user_gender: "",
      company_user_image: "",
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("company_name", values.company_name);
      formData.append("company_address", values.company_address);
      formData.append("company_phone", values.company_phone);
      formData.append("company_email", values.company_email);
      formData.append("company_website", values.company_website);
      formData.append("company_logo", values.company_logo);
      formData.append("company_country", values.company_country);
      formData.append("company_user_name", values.company_user_name);
      formData.append("company_user_email", values.company_user_email);
      formData.append("company_user_phone", values.company_user_phone);
      formData.append("company_user_gender", values.company_user_gender);
      formData.append("company_user_image", values.company_user_image);

      try {
        const result = await addClientInfo(formData).unwrap();
        toast.success(result.message);
        resetForm();
      } catch (error) {
        toast.warn(error.data.message);
      }
    },
  });

  if (res.isSuccess) {
    navigate("/dms/contact");
  }

  return (
    <div className="container mb-5">
      <div className="row pt-5 text-center ">
        <div className=" py-3 bg-info text-white">
          <h3>Please provide your Company and User information</h3>
        </div>

        <div className="col-md-8 co-12 col-12 mt-5 pt-3  shadow-lg border border-1 ">
          <h5>Company Information</h5>
          <form
            className="form-sample"
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
          >
            <div className="row">
              <div className="col-6 mt-2">
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter email"
                    name="company_name"
                    value={formik.values.company_name}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-6 mt-2">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="company_email"
                    value={formik.values.company_email}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-6 mt-2">
                <div className="form-group">
                  <label>Company Website</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Company Website Address"
                    name="company_website"
                    value={formik.values.company_website}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-6 mt-2">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Phone"
                    name="company_phone"
                    value={formik.values.company_phone}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-6 mt-2">
                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Country"
                    name="company_country"
                    value={formik.values.company_country}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-6 mt-2">
                <div className="form-group">
                  <label>Company Logo</label>
                  <input
                    className="form-control"
                    name="company_logo"
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => {
                      formik.setFieldValue(
                        "company_logo",
                        e.currentTarget.files[0]
                      );
                    }}
                  />
                </div>
              </div>
              <div className="col-12 pt-2">
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    name="company_address"
                    value={formik.values.company_address}
                    onChange={formik.handleChange}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="mt-4">
                <h5>User Information</h5>
              </div>

              <div className="col-12">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    name="company_user_name"
                    value={formik.values.company_user_name}
                    onChange={formik.handleChange}
                    required
                  />
                  <small
                    id="emailHelp"
                    className="form-text text-muted"
                  ></small>
                </div>
              </div>
              <div className="col-6 mt-2">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    name="company_user_email"
                    value={formik.values.company_user_email}
                    onChange={formik.handleChange}
                    required
                  />
                  <small
                    id="emailHelp"
                    className="form-text text-muted"
                  ></small>
                </div>
              </div>
              <div className="col-6 mt-2">
                <div className="form-group">
                  <label>Number</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Number"
                    name="company_user_phone"
                    value={formik.values.company_user_phone}
                    onChange={formik.handleChange}
                    required
                  />
                  <small
                    id="emailHelp"
                    className="form-text text-muted"
                  ></small>
                </div>
              </div>
              <div className="col-6 mt-2">
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    className="form-control"
                    name="company_user_gender"
                    value={formik.values.company_user_gender}
                    onChange={formik.handleChange}
                    required
                  >
                    <option>--select--</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="col-6 mt-2">
                <div className="form-group">
                  <label>Photo</label>
                  <input
                    className="form-control"
                    name="company_user_image"
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => {
                      formik.setFieldValue(
                        "company_user_image",
                        e.currentTarget.files[0]
                      );
                    }}
                  />
                </div>
              </div>

              <div className="col-12 my-5">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <br />
                <div className="text-success mt-2">
                  * Submit your information and Contact us to Activation your
                  account !
                  <Link className=" text-primary" to="/dms/contact">
                    Contact us
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="col-md-4 col-12 mt-md-5 pt-md-5">
          <div className="mt-5 pt-5">
            <img src={reg} alt="" className="mt-md-5 w-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
