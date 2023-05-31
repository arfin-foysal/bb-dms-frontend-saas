import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import avater from "../../../../../assets/images/image_preview.png";
import { useUpdateUserMutation } from "../../../../../services/userApi";

const EditUser = ({ handleClose, param }) => {
  const [updateUser, res] = useUpdateUserMutation();
  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
      number: Yup.string().required("Required"),
      user_type: Yup.string().required("Required"),
      status: Yup.string().required("Required"),
      gender: Yup.string().required("Gender is required"),

    }),
    enableReinitialize: true,

    initialValues: {
      name: param?.name,
      email: param?.email,
      username: param?.username,

      image: param?.image,
      gender: param?.gender,
      number: param?.number,
      user_type: param?.user_type,
      status: param?.status,
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
        const result = await updateUser({
          id: param?.id,
          data: formData,
        }).unwrap();
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
                required
                onBlur={formik.handleBlur}
                className={
                  formik.errors.name && formik.touched.name
                    ? "form-control form-control-user is-invalid  shadow"
                    : "form-control form-control-user shadow"
                }
              />
              {formik.errors.name && formik.touched.name ? (
                <small className="text-danger">{formik.errors.name}</small>
              ) : null}
            </div>
          </div>
          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Username</label>
            <div className="col-12">
              <input
                type="text"
                placeholder="Enter Username"
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
              />
              {formik.errors.username && formik.touched.username ? (
                <small className="text-danger">{formik.errors.username}</small>
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
              />
              {formik.errors.email && formik.touched.email ? (
                <small className="text-danger">{formik.errors.email}</small>
              ) : null}

            </div>
          </div>
          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Number</label>
            <div className="col-12">
              <input
                placeholder="Enter Username"
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

              />
            </div>
          </div>

          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Gender</label>
            <div className="col-12">
              <select
               
                name="gender"
                onChange={formik.handleChange}
                value={formik.values.gender}
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
              </select>
              {formik.errors.status && formik.touched.status ? (
                <div className="invalid-feedback">{formik.errors.status}</div>
              ) : null}

            </div>
          </div>

          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Photo</label>
            <div className="col-12  ">
              <input
           
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  formik.setFieldValue("image", e.currentTarget.files[0]);
                  handelImage(e);
                }}
               className="form-control form-control-user shadow"
       
              />
    

            </div>
          </div>

          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">User Type</label>
            <div className="col-12">
              <select
         
                name="user_type"
                onChange={formik.handleChange}
                value={formik.values.user_type}
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


              </select>

              {formik.errors.user_type && formik.touched.user_type ? (
                <div className="invalid-feedback">
                  {formik.errors.user_type}
                </div>
              ) : null}
                  
                  


            </div>
          </div>
        </div>

        <div className="mx-4">
          {previewImage ? (
            <img
              className="py-2"
              src={previewImage}
              width="80px"
              height="80px"
              alt=""
            />
          ) : (
            <img
              className="py-2"
              src={
                formik.values.image === null
                  ? avater
                  : `${import.meta.env.VITE_FILE_URL}${formik.values.image}`
              }
              width="80px"
              height="80px"
              alt=""
            />
          )}
        </div>
        <Modal.Footer>
          <div className=" d-flex">
            <div className="mx-5">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>

            <div className="mx-5">
              <button
                type="button"
                className="btn btn-dark"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default EditUser;
