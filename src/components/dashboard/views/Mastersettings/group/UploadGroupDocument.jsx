import { useFormik } from "formik";
import React, { useState, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import PageTopHeader from "../../../common/PageTopHeader";
import {} from "../../../../../services/ThirdSubCategoryApi";

import * as Yup from "yup";

import { useAddGroupDocumentMutation } from "../../../../../services/groupApi";

const UploadGroupDocument = ({ handleClose, param }) => {
  const [addGroupDocument, res] = useAddGroupDocumentMutation();
  const [description, setDescription] = useState();
  const editor = useRef(null);

  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      file: Yup.string().required("Required ! Please Upload Your Document"),
    }),
    initialValues: {
      name: "",
      group_id: "",
      file: "",
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("group_id", param);
      formData.append("description", description);
      formData.append("file", values.file);
      resetForm();

      try {
        console.log(values);
        const result = await addGroupDocument(formData).unwrap();
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
              <div className="col-12 ">
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
              <Col md={8}>
                <Row></Row>
              </Col>
            </div>

            <div className="form-group row col-12 my-3">
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

            <div className="mx-3 m">
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
              <div>
                <button className="btn btn-dark" onClick={() => handleClose()}>
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadGroupDocument;
