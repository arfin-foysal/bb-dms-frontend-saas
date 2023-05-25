import { useFormik } from "formik";
import React, { useState ,useRef} from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import JoditEditor from 'jodit-react';
import {
  useAllCategoryQuery,

} from "../../../../../services/categoryApi";
import PageTopHeader from "../../../common/PageTopHeader";
import {
  useSubCategoryByCategoryIdQuery,
  useThirdCateBySubCateIdQuery,
} from "../../../../../services/ThirdSubCategoryApi";

import { useNavigate } from "react-router-dom";
import { useAddGroupDocumentMutation, useGroupDocumentUpdateMutation } from "../../../../../services/groupApi";

const UploadGroupDocument = ({ handleClose,param }) => {
  const navigate=useNavigate()
  const [addGroupDocument, res] = useAddGroupDocumentMutation();
    const [description, setDescription] = useState();
    const editor = useRef(null);



  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      group_id: "",
      file: "",
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("group_id", param);
      formData.append("description",description);
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
    navigate(-1);
    
    }

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
              <Col md={12}>
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
              <Col md={8}>
                <Row>
                </Row>
              </Col>
            </div>


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
                <button  className="btn btn-dark" onClick={()=>navigate(-1)}>Close</button>
              </div>
          
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadGroupDocument;
