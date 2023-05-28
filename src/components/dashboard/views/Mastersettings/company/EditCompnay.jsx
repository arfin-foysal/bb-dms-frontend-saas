import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import avater from "../../../../../assets/images/image_preview.png";
import { useCreateOrUpdateCompanyMutation } from "../../../../../services/companyApi";

const EditCompnay = ({ handleClose, param }) => {



  const [createOrUpdateCompany, res] = useCreateOrUpdateCompanyMutation();
  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: param?.id,
      name: param?.name,
      image: param?.image,
      email: param?.email,
      number: param?.number,
      status: param?.status,
      unique_id: param?.unique_id,
      country: param?.country,
      address: param?.address,

    

    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("id", param?.id);
      formData.append("name", values.name);
      formData.append("image", values.image);
      formData.append("email", values.email);
      formData.append("number", values.number);
      formData.append("status", values.status);
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


          <div className="form-group row col-12 my-1">
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
          <div className="row">
        
            <div className="col">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
            <div className="col">
              
              <button type="reset"  className="btn btn-dark" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default EditCompnay;
