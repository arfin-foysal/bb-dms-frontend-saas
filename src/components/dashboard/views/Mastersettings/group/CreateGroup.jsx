import { useFormik } from "formik";
import React, { useState } from "react";
import {Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Select from "react-select";
import axios from "axios";
import { headers } from "../../../../../utils/ApiHeaders";
import { useEffect } from "react";
import { useCreateGroupMutation } from "../../../../../services/groupApi";
import preview from "../../../../../assets/images/image_preview.png";
const CreateGroup = ({ handleClose }) => {
  const [createGroup, res] = useCreateGroupMutation();
  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  const [user,setUser]=useState([]);
  const [member, setMember] = useState([]);

  

  const addUserMember = (e) => {
    axios({
      url: `${import.meta.env.VITE_API_URL}all_user_for_group`,
      method: 'GET',
      headers
    }).then((res) => {
      setUser(res.data);
    });
  };

    useEffect(() => {
    addUserMember();
  }, []);



  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),

    }),
    initialValues: {
      name: "",
      description: "",
      image: "",
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("image", values.image);
      if (member.length <= 0) {
        toast.error('Please select member');
      }
  
      if (member.length > 0) {
        const arr = [];
        member.map((item) => {
          arr.push(item.id);
        });
        const memberArr = JSON.stringify(arr);
        console.log(memberArr)
        
        formData.append('member', memberArr);
      }
      resetForm();

      try {
        const result = await createGroup(formData).unwrap();
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
            <label className="col-12 col-form-label">Select User</label>
            <div className="col-12">
              <Select
                isMulti
                placeholder="Select Member"
                className="basic-multi-select shadow"
                    classNamePrefix="balance-setup"
                    onChange={(e) => setMember(e)}
                    getOptionValue={(option) => `${option["id"]}`}
                    getOptionLabel={(option) => `${option["username"]}`}
                options={user && user}
                required={true}
                
                  />
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
                  {formik.errors.description}
                </div>
              ) : null}

            </div>
          </div>

          <div className="form-group row col-12 my-1">
            <label className="col-12 col-form-label">Photo</label>
            <div className="col-12">
              <input
                className="form-control form-control-user shadow"
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
            src={previewImage?previewImage:preview}
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

export default CreateGroup;
