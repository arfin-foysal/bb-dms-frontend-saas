import { useFormik } from "formik";
import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import PageTopHeader from "../../../common/PageTopHeader";
import * as Yup from "yup";
import { useGroupDocumentUpdateMutation } from "../../../../../services/groupApi";

const EditGroupDocument = ({handleClose, param }) => {
  
  const [groupDocumentUpdate, res] = useGroupDocumentUpdateMutation();

  const [description, setDescription] = useState();
  const editor = useRef(null);
  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  useEffect(() => {
      setDescription(param?.description);
    
  }, [param]);

  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      status: Yup.string().required("Required"),
    }),

    enableReinitialize: true,
    initialValues: {
      name: param?.name,
      status: param?.status,
      file: param?.file,
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("status", values.status);
      formData.append("description", description);
      formData.append("file", values.file);
      resetForm();

      try {
        
        const result = await groupDocumentUpdate({ id:param?.id, data: formData }).unwrap();
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
      <PageTopHeader title="Edit Document" />
      <div class="card border shadow-lg ">
        <div class="card-header d-flex justify-content-between ">
          <div>Edit Document</div>
        </div>

        <div class="card-body ">
          <form
            className="form-sample"
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
          >
            <div className="row">
            <div className="col-6 ">
                <label >Name</label>
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
              <div className="col-6">
              
                  <label>Published</label>
                  <select
                  
                    name="status"
                    onChange={formik.handleChange}
                    value={formik.values.status}
                  required

                  className={
                    formik.errors.status && formik.touched.status
                      ? "form-control form-control-user is-invalid  shadow"
                      : "form-control form-control-user shadow"
                  }
                  >
                    <option>--Select--</option>
                    <option value="Active">Active</option>
                    <option value="Dactive">Dactive</option>
                </select>
                {formik.errors.status && formik.touched.status ? (
                  <div className="invalid-feedback">{formik.errors.status}</div>
                ) : null}

               
              </div>
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

            <div className="mx-2">
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
              <div className="me-2">
                
                  <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
              <div >
              <button onClick={() => handleClose()} className="btn btn-dark">Close</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditGroupDocument;
