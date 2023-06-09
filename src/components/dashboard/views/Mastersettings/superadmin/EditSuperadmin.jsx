import { useFormik } from "formik";
import React, { useState } from "react";
import {  Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import avater from "../../../../../assets/images/image_preview.png";

import { useSuperAdminCreateOrUpdateAndCompanyAssignMutation } from "../../../../../services/userApi";
import { useCompanyListQuery } from "../../../../../services/companyApi";

const EditSuperadmin = ({ handleClose, param }) => {
  const [superAdminCreateOrUpdateAndCompanyAssign, res] = useSuperAdminCreateOrUpdateAndCompanyAssignMutation();
  const companyRes = useCompanyListQuery();


  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: param?.id,
      name: param?.name,
      email: param?.email,
      username: param?.username,
      image: param?.image,
      gender: param?.gender,
      number: param?.number,
      company_id: param?.company_id,
      status: param?.status,
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("id", values.id);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("gender", values.gender);
      formData.append("image", values.image);
      formData.append("number", values.number);
      formData.append("company_id", values.company_id );
      formData.append("status", values.status);
      resetForm();

      try {
        const result = await superAdminCreateOrUpdateAndCompanyAssign(formData).unwrap();
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
    <div className="">
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
                className="form-control"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                required
              />
            </div>
          </div>
          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Username</label>
            <div className="col-12">
              <input
                placeholder="Enter Username"
                type="text"
                className="form-control"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                required
              />
            </div>
          </div>
          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Email</label>
            <div className="col-12">
              <input
                placeholder="Enter Email"
                type="email"
                className="form-control"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                required
              />
            </div>
          </div>
          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Number</label>
            <div className="col-12">
              <input
                placeholder="Enter Number"
                type="number"
                className="form-control"
                name="number"
                onChange={formik.handleChange}
                value={formik.values.number}
                required
              />
            </div>
          </div>
 
          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Gender</label>
            <div className="col-12">
              <select
                className="form-control"
                name="gender"
                onChange={formik.handleChange}
                value={formik.values.gender}
              >
                <option value="">--select--</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Status</label>
            <div className="col-12">
              <select
                className="form-control"
                name="status"
                onChange={formik.handleChange}
                value={formik.values.status}
              >
                <option value="">--select--</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
            
              </select>
            </div>
          </div>
  
          

          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Photo</label>
            <div className="col-12  ">
              <input
                className="form-control"
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

          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label ">
              Company Assign
            </label>
            <div className="col-12">
              <select
                className="form-control"
                name="company_id"
                onChange={formik.handleChange}
                value={formik.values.company_id }
                required
              >
                <option value="">--select--</option>
                {companyRes?.data?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}

              </select>
            </div>
          </div>

     
        </div>

        <div>
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

export default EditSuperadmin;
