import { useFormik } from "formik";
import React, { useState } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";
import * as Yup from "yup";
import avatar from "../../../../../assets/images/profile-picture.png";
import {
  useProfileUpdateMutation,
  useUserProfileQuery,
} from "../../../../../services/userApi";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../common/Loader";
import { Card } from "react-bootstrap";
// import { useSelector } from "react-redux";

const Profile = ({ handleClose, param }) => {
  // const authUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const profileRes = useUserProfileQuery(id);
  const [profileUpdate, res] = useProfileUpdateMutation();
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
      gender: Yup.string().required("Gender is required"),
    }),
    enableReinitialize: true,

    initialValues: {
      name: profileRes?.data?.data?.name,
      email: profileRes?.data?.data?.email,
      username: profileRes?.data?.data?.username,
      image: profileRes?.data?.data?.image,
      gender: profileRes?.data?.data?.gender,
      number: profileRes?.data?.data?.number,
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("gender", values.gender);
      formData.append("image", values.image);
      formData.append("number", values.number);
      resetForm();

      try {
        const result = await profileUpdate(formData).unwrap();
        toast.success(result.message);
      } catch (error) {
        toast.warn(error.data.message);
      }
    },
  });
  // if (res.isSuccess) {
  //   handleClose();
  // }

  return (
    <div>
            <Card>
        <Card.Header>
          <Card.Title as="h5">Profile</Card.Title>
        </Card.Header>
        <Card.Body>
      
      <form
        className="form-sample"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div className="row ">
          <div className="col-md-4 col-12 "></div>

          {profileRes.isFetching && <Loader />}
          {profileRes.isSuccess && (
            <div className="col-md-4 col-12 border border-1 py-1 mb-5">
              <div className="text-end  mt-2">
                <BsFillArrowLeftCircleFill
                  onClick={() => navigate(-1)}
                  className="pointer"
                  color="black"
                  size={20}
                />
              </div>
              <div className=" text-center">
                <img
                  className="img-fluid rounded-circle "
                  style={{ width: "200px", height: "200px" }}
                  src={
                    profileRes?.data?.data?.image
                      ? `${import.meta.env.VITE_FILE_URL}${
                          profileRes?.data?.data?.image
                        }`
                      : avatar
                  }
                  alt=""
                />
              </div>
              <div className="form-group row col-12 my-1">
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
              <div className="form-group row col-12 my-1">
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
                    <small className="text-danger">
                      {formik.errors.username}
                    </small>
                  ) : null}
                </div>
              </div>
              <div className="form-group row col-12 my-1">
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
              <div className="form-group row col-12 my-1">
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

              <div className="form-group row col-12 my-1">
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
                    <div className="invalid-feedback">
                      {formik.errors.gender}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="form-group row col-12 my-1">
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
                        ? avatar
                        : `${import.meta.env.VITE_FILE_URL}${
                            formik.values.image
                          }`
                    }
                    width="80px"
                    height="80px"
                    alt=""
                  />
                )}
                <div className="text-center">
                  <div className="mx-5">
                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-4 col-12"></div>
      </form></Card.Body></Card>
    </div>
  );
};

export default Profile;
