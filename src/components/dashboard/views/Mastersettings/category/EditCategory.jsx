import { useFormik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import avater from "../../../../../assets/images/image_preview.png";
import { useUpdateCatagoryMutation } from "../../../../../services/categoryApi";

const EditCategory = ({ handleClose, param }) => {

 

  const [updateCatagory, res] = useUpdateCatagoryMutation();
  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    enableReinitialize: true,

    initialValues: {
      name: param?.name,
      image: param?.image,
      description: param?.description,
      status: param?.status,
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("id", param?.id);
      formData.append("name", values.name);
      formData.append("image", values.image);
      formData.append("description", values.description);
      formData.append("status", values.status);
      resetForm();

      try {
        const result = await updateCatagory({ id: param?.id , data: formData }).unwrap();
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
                onBlur={formik.handleBlur}
                className={
                  formik.errors.name && formik.touched.name
                    ? "form-control form-control-user is-invalid  shadow"
                    : "form-control form-control-user shadow"
                }
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                required
              />
                 {formik.errors.name && formik.touched.name ? (
                <div className="invalid-feedback">{formik.errors.name}</div>
              ) : null}
            </div>
          </div>

    

          <div className="form-group row col-12 my-1">
            <label className="col-12 col-form-label">Description</label>
            <div className="col-12">
              <textarea
                placeholder="Enter description"
                type="text"
                onBlur={formik.handleBlur}
                className={
                  formik.errors.description && formik.touched.description
                    ? "form-control form-control-user is-invalid  shadow"
                    : "form-control form-control-user shadow"
                }
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                required
              />
                      {formik.errors.description && formik.touched.description ? (
                <div className="invalid-feedback">
                  {formik.errors.description}
                </div>
              ) : null}
            </div>
          </div>

          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Photo</label>
            <div className="col-12  ">
              <input
                className="form-control shadow "
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



          <div className="form-group row col-6 my-2">
            <label className="col-6 col-form-label">Status</label>
            <div >
              <select className="form-control shadow" name="status" required
                onChange={formik.handleChange}
                value={formik.values.status}
                
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </select>
         
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

export default EditCategory;
