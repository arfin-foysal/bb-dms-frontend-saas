import { useFormik } from "formik";
import React, { useState, useRef } from "react";
import { Form, } from "react-bootstrap";
import * as Yup from "yup";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { useAllCategoryQuery } from "../../../../../services/categoryApi";
import PageTopHeader from "../../../common/PageTopHeader";
import {
  useSubCategoryByCategoryIdQuery,
  useThirdCateBySubCateIdQuery,
} from "../../../../../services/ThirdSubCategoryApi";
import { useUploadeDocumentMutation } from "../../../../../services/documentApi";
const UploadDocument = ({ handleClose }) => {
  const [uploadeDocument, res] = useUploadeDocumentMutation();

  const [category, setcategory] = useState(0);
  const [subCategory, setsubCategory] = useState(0);
  const [description, setDescription] = useState();
  const editor = useRef(null);
  const cateRes = useAllCategoryQuery();
  const subCateRes = useSubCategoryByCategoryIdQuery(category);
  const thirdSubCateRes = useThirdCateBySubCateIdQuery(subCategory);


  

  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      catagory_id: Yup.string().required("Required"),
      file: Yup.string().required("Required ! Please Upload Your Document"),
    }),

    initialValues: {
      name: "",
      catagory_id: "",
      sub_catagory_id: "",
      sub_sub_catagory_id: "",
      //   description: "",
      file: "",
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("catagory_id", values.catagory_id);
      formData.append("sub_catagory_id", values.sub_catagory_id);
      formData.append("sub_sub_catagory_id", values.sub_sub_catagory_id);
      formData.append("description", description);
      formData.append("file", values.file);
      resetForm();

      try {
        const result = await uploadeDocument(formData).unwrap();
        toast.success(result.message);
      } catch (error) {
        toast.warn(error.data.message);
      }
    },
  });

  // if (res.isSuccess) {
  //   handleClose()
  // }

  return (
    <div>
      <PageTopHeader title="Document Upload" />
      <div class="card border shadow-lg ">
        <div class="card-header d-flex justify-content-between ">
          <div>Document Upload</div>
        </div>

        <div class="card-body ">
          <form
            className="form-sample"
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
          >
         
            <div className="row">
              <div className="col ">
                <label className="mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
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
              <div className="col">
                <div className="row">
                  <div className="col">

                    <Form.Label>Category</Form.Label>
                    <select
                   
                      name="catagory_id"
                      required
                      onChange={(e) => {
                        formik.handleChange(e);
                        setcategory(e.target.value);
                      }}
                      value={formik.values.catagory_id}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.catagory_id && formik.touched.catagory_id
                          ? "form-control form-select shadow is-invalid"
                          : "form-control form-select shadow"
                      }
                    >
                      <option>--select--</option>
                      {cateRes.data?.map((item, i) => (
                        <option key={i} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {formik.errors.catagory_id && formik.touched.catagory_id ? (
                      <div className="invalid-feedback">
                        {formik.errors.catagory_id}
                      </div>
                    ) : null}

                        
                  </div>

                  {cateRes.data?.length === 0 && (
                    <p className="text-warning">
                      *Please Create Category First !
                    </p>
                    )}
                
                  <div
                    className={
                      formik.values.catagory_id === ""
                        ? "d-none"
                        : "d-block col "
                    }
                  >
                    <Form.Label>Sub Category</Form.Label>
                    <select
                      className="mb-3 form-control form-select shadow "
                      name="sub_catagory_id"
                      required
                      onChange={(e) => {
                        formik.handleChange(e);
                        setsubCategory(e.target.value);
                      }}
                      value={formik.values.sub_catagory_id}
                    >
                      <option>--select--</option>
                      {subCateRes.data?.map((item, i) => (
                        <option key={i} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div
                    className={
                      formik.values.sub_catagory_id === ""
                        ? "d-none"
                        : "d-block col "
                    }
                  >
                    <Form.Label>3rd Category</Form.Label>
                    <Form.Control
                      as="select"
                      className="mb-3 form-select shadow"
                      name="sub_sub_catagory_id"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.sub_sub_catagory_id}
                    >
                      <option>--select--</option>
                      {thirdSubCateRes.data?.map((item, i) => (
                        <option key={i} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Control>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group row col-12 my-1">
              <label className="mb-2">Description</label>
              <JoditEditor
                ref={editor}
                value={description}
                // config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setDescription(newContent)} // preferred to use only this option to update the content for performance reasons
                // onChange={(newContent) => {setDescription(newContent.target.value)}}
              
              />
            </div>

            <div className="form-group row col-12 my-1">
              <label className="col-12 col-form-label">Select Your File</label>
              <div className="col-12">
                <input
                  type="file"
                  name="file"
                  accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.txt,.xlsx,.xls,.csv,"
                  onChange={(e) => {
                    formik.setFieldValue("file", e.currentTarget.files[0]);
                    handelImage(e);
                  }}
                  required
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.file && formik.touched.file
                      ? "form-control form-control-user is-invalid  shadow"
                      : "form-control form-control-user shadow"
                  }
                />
                {formik.errors.file && formik.touched.file ? (
                  <div className="invalid-feedback">{formik.errors.file}</div>
                ) : null}

              </div>
            </div>

            <div className="mx-2">
              <img
                className="py-2"
                src={previewImage}
                width="80px"
                height="80px"
                alt=""
              />
            </div>

            <div className=" d-flex justify-content-end">
              <div className="me-2">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
              <div></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
