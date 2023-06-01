import { useFormik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { useAllCategoryQuery } from "../../../../../services/categoryApi";

import { useCreateSubCategoryMutation } from "../../../../../services/subCategoryApi";

const CreateSubCategory = ({ handleClose }) => {
  const [createSubCategory, res] = useCreateSubCategoryMutation();
  const categoryRes = useAllCategoryQuery();
  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      catagory_id: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    initialValues: {
      name: "",
      catagory_id: "",
      description: "",
      image: "",
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("catagory_id", values.catagory_id);
      formData.append("description", values.description);
      formData.append("image", values.image);
      resetForm();

      try {
        const result = await createSubCategory(formData).unwrap();
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
                <div className="invalid-feedback">{formik.errors.name}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row col-12 my-1">
            <label className="col-12 col-form-label">Category</label>
            <div className="col-12">
              <select
                name="catagory_id"
                onChange={formik.handleChange}
                value={formik.values.catagory_id}
                required
                onBlur={formik.handleBlur}
                className={
                  formik.errors.catagory_id && formik.touched.catagory_id
                    ? "form-control form-control-user is-invalid  shadow"
                    : "form-control form-control-user shadow"
                }
              >
                <option value="">Select Category</option>
                {categoryRes?.data?.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}

            
              </select>
              {formik.errors.catagory_id && formik.touched.catagory_id ? (
                  <div className="invalid-feedback">
                    {formik.errors.catagory_id}
                  </div>
                ) : null}
            </div>
          </div>

          <div className="form-group row col-12 my-1">
            <label className="col-12 col-form-label">Description</label>
            <div className="col-12">
              <textarea
                placeholder="Enter description"
                type="text"
            
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                required
                onBlur={formik.handleBlur}
                className={
                  formik.errors.description && formik.touched.description
                    ? "form-control form-control-user is-invalid  shadow"
                    : "form-control form-control-user shadow"
                }

              />
              {formik.errors.description && formik.touched.description ? (
                <div className="invalid-feedback">
                  {formik.errors.description}</div>
              ) : null}



            </div>
          </div>

          <div className="form-group row col-12 my-1">
            <label className="col-12 col-form-label">Photo</label>
            <div className="col-12">
              <input
                className="form-control shadow"
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

export default CreateSubCategory;
