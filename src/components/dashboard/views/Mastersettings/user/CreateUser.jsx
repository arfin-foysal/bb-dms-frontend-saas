import { useFormik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useCreateUsersMutation } from "../../../../../services/userApi";
import * as Yup from "yup";
const CreateUser = ({ handleClose }) => {
  const [createUsers, res] = useCreateUsersMutation();
  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  const randomstring = Math.random().toString(36).slice(-8);
  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email().required("Email is required"),
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password confirmation is required"),
      number: Yup.string().required("Number is required"),
      user_type: Yup.string().required("User Type is required"),
      gender: Yup.string().required("Gender is required"),
      status: Yup.string().required("Status is required"),
    }),

    initialValues: {
      name: "",
      email: "",
      username: randomstring,
      password: "",
      image: "",
      gender: "",
      number: "",
      user_type: "",
      status: "",
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("gender", values.gender);
      formData.append("description", values.description);
      formData.append("image", values.image);
      formData.append("number", values.number);
      formData.append("user_type", values.user_type);
      formData.append("status", values.status);
      resetForm();

      try {
        const result = await createUsers(formData).unwrap();
        toast.success(result.message);
      } catch (error) {
        toast.warn(error.data.message);
      }
    },
  });
  if (res.isSuccess) {
    handleClose();
  }

  return (
    <div>
      <form
        className="form-sample"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div className="row">
          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Name</label>
            <div className="col-12">
              <input
                placeholder="Enter Name"
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
                required
                className={
                  formik.errors.name && formik.touched.name
                    ? "form-control form-control-user is-invalid  shadow"
                    : "form-control form-control-user shadow"
                }
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="invalid-feedback">{formik.errors.name}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Username</label>
            <div className="col-12">
              <input
                placeholder="Enter Username"
                type="text"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                required
                onBlur={formik.handleBlur}
                className={
                  formik.errors.username && formik.touched.username
                    ? "form-control form-control-user is-invalid  shadow"
                    : "form-control form-control-user shadow"
                }
              />{" "}
              {formik.errors.username && formik.touched.username ? (
                <div className="invalid-feedback">{formik.errors.username}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Email</label>
            <div className="col-12">
              <input
                placeholder="Enter Username"
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                required
                onBlur={formik.handleBlur}
                className={
                  formik.errors.email && formik.touched.email
                    ? "form-control form-control-user is-invalid  shadow"
                    : "form-control form-control-user shadow"
                }
              />{" "}
              {formik.errors.email && formik.touched.email ? (
                <div className="invalid-feedback">{formik.errors.email}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Number</label>
            <div className="col-12">
              <input
                placeholder="Enter Number"
                type="number"
                name="number"
                onChange={formik.handleChange}
                value={formik.values.number}
                required
                onBlur={formik.handleBlur}
                className={
                  formik.errors.number && formik.touched.number
                    ? "form-control form-control-user is-invalid  shadow"
                    : "form-control form-control-user shadow"
                }
              />{" "}
              {formik.errors.number && formik.touched.number ? (
                <div className="invalid-feedback">{formik.errors.number}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Password</label>
            <div className="col-12">
              <input
                placeholder="Enter Password"
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                required
                onBlur={formik.handleBlur}
                className={
                  formik.errors.password && formik.touched.password
                    ? "form-control form-control-user is-invalid  shadow"
                    : "form-control form-control-user shadow"
                }
              />{" "}
              {formik.errors.password && formik.touched.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Confirm Password</label>
            <div className="col-12">
              <input
                placeholder="Enter Confirm Password"
                type="password"
                name="confirm_password"
                onChange={formik.handleChange}
                value={formik.values.confirm_password}
                required
                onBlur={formik.handleBlur}
                className={
                  formik.errors.confirm_password &&
                  formik.touched.confirm_password
                    ? "form-control form-control-user is-invalid  shadow"
                    : "form-control form-control-user shadow"
                }
              />
              {formik.errors.confirm_password &&
              formik.touched.confirm_password ? (
                <div className="invalid-feedback">
                  {formik.errors.confirm_password}
                </div>
              ) : null}
            </div>
          </div>
          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Gender</label>
            <div className="col-12">
              <select
                name="gender"
                onChange={formik.handleChange}
                value={formik.values.gender}
                required
                onBlur={formik.handleBlur}
                className={
                  formik.errors.gender && formik.touched.gender
                    ? "form-control form-control-user is-invalid  shadow"
                    : "form-control form-control-user shadow"
                }
              >
                <option value="">--select--</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {formik.errors.gender && formik.touched.gender ? (
                <div className="invalid-feedback">{formik.errors.gender}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Status</label>
            <div className="col-12">
              <select
                name="status"
                onChange={formik.handleChange}
                value={formik.values.status}
                required
                onBlur={formik.handleBlur}
                className={
                  formik.errors.status && formik.touched.status
                    ? "form-control form-control-user is-invalid  shadow"
                    : "form-control form-control-user shadow"
                }
              >
                <option value="">--select--</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </select>{" "}
              {formik.errors.status && formik.touched.status ? (
                <div className="invalid-feedback">{formik.errors.status}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">User Type</label>
            <div className="col-12">
              <select
                name="user_type"
                onChange={formik.handleChange}
                value={formik.values.user_type}
                required
                onBlur={formik.handleBlur}
                className={
                  formik.errors.user_type && formik.touched.user_type
                    ? "form-control form-control-user is-invalid  shadow"
                    : "form-control form-control-user shadow"
                }
              >
                <option value="">--select--</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>{" "}
              {formik.errors.user_type && formik.touched.user_type ? (
                <div className="invalid-feedback">
                  {formik.errors.user_type}
                </div>
              ) : null}
            </div>
          </div>

          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Photo</label>
            <div className="col-12">
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  formik.setFieldValue("image", e.currentTarget.files[0]);
                  handelImage(e);
                }}
              />
            </div>
          </div>
        </div>
        <div className="mx-4">
          <img
            className="py-2"
            src={previewImage}
            width="80px"
            height="80px"
            alt=""
          />
        </div>
        <Modal.Footer>
          <div className=" d-flex">
            <div className="me-2">
                 <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
            <div >
           <button className="btn btn-dark" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default CreateUser;
