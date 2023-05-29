import { useFormik } from "formik";
import React, { useState, useRef, useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import PageTopHeader from "../../../common/PageTopHeader";

import {
  useEditDocumentMutation,
  useViewDocumentQuery,
} from "../../../../../services/documentApi";
import { useParams } from "react-router-dom";

const EditDocument = () => {
  const { id } = useParams();
  const [EditDocument, res] = useEditDocumentMutation();
  const docRes = useViewDocumentQuery(id);
  const [description, setDescription] = useState();
  const editor = useRef(null);
  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  useEffect(() => {
    if (docRes.isSuccess) {
      setDescription(docRes?.data?.data?.description);
    }
  }, [id, docRes.isSuccess, docRes]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: docRes?.data?.data?.name,
      status: docRes?.data?.data?.status,
      file: docRes?.data?.data?.file,
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("status", values.status);
      formData.append("description", description);
      formData.append("file", values.file);
      resetForm();

      try {
        
        const result = await EditDocument({ id: id, data: formData }).unwrap();
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
      <PageTopHeader title="Category" />
      <div class="card border shadow-lg ">
        <div class="card-header d-flex justify-content-between ">
          <div> Category List</div>
        </div>

        <div class="card-body ">
          <form
            className="form-sample"
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
          >
            <div className="row">
              <Col md={6}>
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
              <Col md={6}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Publish</Form.Label>
                  <select
                    className="form-control"
                    name="status"
                    onChange={formik.handleChange}
                    value={formik.values.status}
                    required
                  >
                    <option>--Select--</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                  </select>
                </Form.Group>
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
                  // required
                />
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
                      ? "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
                      : `${import.meta.env.VITE_DOC_FILE_URL}${formik.values.file}`
                  }
                  width="80px"
                  height="80px"
                  alt=""
                />
              )}
            </div>


            <div className=" d-flex justify-content-end">
         
              <div className="mx-5">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDocument;
