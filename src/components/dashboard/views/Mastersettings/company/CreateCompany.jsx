import { useFormik } from "formik";
import React, { useState } from "react";
import {Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { useCreateOrUpdateCompanyMutation } from "../../../../../services/companyApi";


const CreateCategory = ({ handleClose }) => {
  const [createOrUpdateCompany, res] = useCreateOrUpdateCompanyMutation();
  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }


  const randomstring = Math.random().toString(36).slice(-8);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
      status: "",
      image: "",
      unique_id: randomstring,
      country: "",
      address: "",

      
      
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("number", values.number);
      formData.append("status", values.status);
      formData.append("image", values.image);
      formData.append("unique_id", values.unique_id);
      formData.append("country", values.country);
      formData.append("address", values.address);
      resetForm();

      try {
        const result = await createOrUpdateCompany(formData).unwrap();
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
    <div >
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
            <label className="col-12 col-form-label">Unique Id </label>
            <div className="col-12">
              <input
                placeholder="Enter Unique Id"
                type="text"
                className="form-control"
                name="unique_id"
                onChange={formik.handleChange}
                value={formik.values.unique_id}
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
            <label className="col-12 col-form-label">Country</label>
            <div className="col-12">
              <input
                placeholder="Enter Country"
                type="text"
                className="form-control"
                name="country"
                onChange={formik.handleChange}
                value={formik.values.country}
                required
              />
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
                required
              >
                <option >--Select--</option>
                <option value="Active">Active</option>
                <option value="Pending">Inactive</option>
              </select>
            </div>
          </div>
          <div className="form-group row col-12 my-1">
            <label className="col-12 col-form-label">Address</label>
            <div className="col-12">
              <textarea
                placeholder="Enter Address"
                type="text"
                className="form-control"
                name="address"
                onChange={formik.handleChange}
                value={formik.values.address}
                required
              />
            </div>
          </div>




          <div className="form-group row col-12 ">
            <label className="col-12 col-form-label">Photo</label>
            <div className="col-12">
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


        </div >
        <div  className="px-4">
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
            <div>
              <button className="btn btn-dark" onClick={handleClose}>
                Close
              </button>
            </div>
            <div className="mx-5">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default CreateCategory;
