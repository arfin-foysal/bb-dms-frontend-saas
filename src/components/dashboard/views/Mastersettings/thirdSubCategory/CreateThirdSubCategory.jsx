import { useFormik } from "formik";
import React, { useState } from "react";
import {Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { useCreateSubCategoryMutation } from "../../../../../services/subCategoryApi";
import { useAllCategoryQuery } from "../../../../../services/categoryApi";
import { useCreateThirdSubCategoryMutation, useSubCategoryByCategoryIdQuery } from "../../../../../services/ThirdSubCategoryApi";



const CreateThirdSubCategory = ({ handleClose }) => {

  const [categoryId, setcategoryId] = useState(1);


  const [createSubCategory, res] = useCreateThirdSubCategoryMutation();

  const subCategoryRes = useSubCategoryByCategoryIdQuery(categoryId);
  
  



  const categoryRes= useAllCategoryQuery();
  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }




  const formik = useFormik({
    initialValues: {
      name: "",
      catagory_id: "",
      sub_catagory_id: "",
      description: "",
      image: "",
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("catagory_id", values.catagory_id);
      formData.append("sub_catagory_id", values.sub_catagory_id);
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
          <div className="form-group row col-12">
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
          <div className="form-group row col-12 my-1">
            <label className="col-12 col-form-label">Category</label>
            <div className="col-12">

              <select 

                className="form-control"
                name="catagory_id"
                onChange={(e) => { formik.handleChange (e); setcategoryId(e.target.value)}}
                value={formik.values.catagory_id}
                required
              >
                <option value="">Select Category</option>
                {categoryRes?.data?.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>

         
            </div>
          </div>
          <div className="form-group row col-12 my-1">
            <label className="col-12 col-form-label">Sub Category</label>
            <div className="col-12">

              <select 

                className="form-control"
                name="sub_catagory_id"
                onChange={formik.handleChange}
                value={formik.values.sub_catagory_id}
                required
              >
                <option value="">Select Sub Category</option>
                {subCategoryRes?.data?.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>

         
            </div>
          </div>

          <div className="form-group row col-12 my-1">
            <label className="col-12 col-form-label">Description</label>
            <div className="col-12">
              <textarea
                placeholder="Enter description"
                type="text"
                className="form-control"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
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

export default CreateThirdSubCategory;
