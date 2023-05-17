import { useFormik } from "formik";
import React, { useState, useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { useAllCategoryQuery } from "../../../../../services/categoryApi";
import PageTopHeader from "../../../common/PageTopHeader";
import {
  useSubCategoryByCategoryIdQuery,
  useThirdCateBySubCateIdQuery,
} from "../../../../../services/ThirdSubCategoryApi";
import { useUploadeDocumentMutation } from "../../../../../services/documentApi";
import { useNavigate } from "react-router-dom";

const UploadDocument = ({ handleClose }) => {
  const navigate = useNavigate();

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
        console.log(values);
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
      <PageTopHeader title="Document Uploade" />
      <div class="card border shadow-lg ">
        <div class="card-header d-flex justify-content-between ">
          <div>Document Uploade</div>
        </div>

        <div class="card-body ">
          <form
            className="form-sample"
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
          >
            <div className="row">
              <Col >
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    required
                  />
                </Form.Group>
              </Col>
              <Col >
                <Row>
                  <Col>
                    <Form.Label>Category</Form.Label>
                    <select
                      className=" form-control form-select mb-3"
                      name="catagory_id"
                      required
                      onChange={(e) => {
                        formik.handleChange(e);
                        setcategory(e.target.value);
                      }}
                      value={formik.values.catagory_id}
                    >
                      <option>--Selact--</option>
                      {cateRes.data?.map((item,i) => (
                        <option key={i} value={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </Col>
                  <Col
                    className={
                      formik.values.catagory_id === "" ? "d-none" : "d-block"
                    }
                  >
                    <Form.Label>Sub Category</Form.Label>
                    <select
                      className="mb-3 form-control form-select"
                      name="sub_catagory_id"
                      required
                      onChange={(e) => {
                        formik.handleChange(e);
                        setsubCategory(e.target.value);
                      }}
                      value={formik.values.sub_catagory_id}
                    >
                      <option>--Selact--</option>
                      {subCateRes.data?.map((item,i) => (
                        <option key={i} value={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </Col>
                  <Col
                    className={
                      formik.values.sub_catagory_id === ""
                        ? "d-none"
                        : "d-block"
                    }
                  >
                    <Form.Label>3rd Category</Form.Label>
                    <Form.Control
                      as="select"
                      className="mb-3 form-select"
                      name="sub_sub_catagory_id"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.sub_sub_catagory_id}
                    >
                      <option>--Selact--</option>
                      {thirdSubCateRes.data?.map((item,i) => (
                        <option key={i} value={item.id}>{item.name}</option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </Col>
            </div>
            {/* <div className="form-group row col-12 my-1">
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
            </div> */}

            <Form.Label>Description</Form.Label>
            <JoditEditor
              ref={editor}
              value={description}
              // config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setDescription(newContent)} // preferred to use only this option to update the content for performance reasons
              // onChange={(newContent) => {setDescription(newContent.target.value)}}
            />

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
                />
              </div>
            </div>

            <div>
              <img
                className="py-2"
                src={previewImage}
                width="80px"
                height="80px"
                alt=""
              />
            </div>
            <div className=" d-flex justify-content-end">
              <div className="mx-5">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
              <div>
          
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
