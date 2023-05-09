import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";
import avater from "../../../../../assets/images/image_preview.png";
import { useUpdateCatagoryMutation } from "../../../../../services/categoryApi";
import { useAllUserforGroupQuery, useSingalGroupQuery, useUpdateGroupMutation } from "../../../../../services/groupApi";
import axios from "axios";
import { headers } from "../../../../../utils/ApiHeaders";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const EditGroup = ({ handleClose, param }) => {


  const [user, setUser] = useState([]);
  const [member, setMember] = useState([]);
  const [defaultMember, setDefaultMember] = useState([]);

  const { data, isFetching, isSuccess, isLoading } = useSingalGroupQuery(
    param?.group?.id
  );

  const allUserRse=useAllUserforGroupQuery()



  const [updateGroup, res] = useUpdateGroupMutation()
   

  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  const addUserMember = (e) => {
    axios({
      url: `${import.meta.env.VITE_API_URL}all_user_for_group`,
      method: "GET",
      headers,
    }).then((res) => {
      setUser(res.data);
    });
  };

  // console.log(defaultMember);

  useEffect(() => {
    // addUserMember();
    if (isSuccess) {
      setDefaultMember(data?.data?.user);
    }
  }, [isSuccess]);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: param?.group?.name,
      image: param?.group?.image,
      description: param?.group?.description,

    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", values.image);
      formData.append("description", values.description);
      // resetForm();

      const arr = [];
      if (member.length > 0) {
        member.map((item) => {
          arr.push(item.id);
        });
        
        const memberArr = JSON.stringify(arr);
        formData.append('member', memberArr);
        console.log(memberArr)
      } else {
        allUserRse?.data.map((item) => {
          arr.push(item.id);

        })

        const memberArr = JSON.stringify(arr);
        formData.append('member', memberArr);
            // console.log(memberArr)
      }

  
  

      try {

        
        const result = await updateGroup({
          id: param?.group?.id,
          data: formData,
        }).unwrap();
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
                className="form-control"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                required
              />
            </div>
          </div>

          <div className="form-group row col-12 my-1">
            <label className="col-12 col-form-label">Select User</label>

            {isLoading && <p>Loading...</p>}
       
            <div className="col-12">

              {isSuccess && (
                  <Select
                isMulti
                placeholder="Select Member"
                classNamePrefix="balance-setup"
                onChange={(e) => setMember(e)}
                getOptionValue={(option) => `${option["id"]}`}
                getOptionLabel={(option) => `${option["username"]}`}
                options={isSuccess && allUserRse?.data}
                defaultValue={isSuccess && data?.data?.user}
               
              />
              )
              }
              
            
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

          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Photo</label>
            <div className="col-12  ">
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
            <div className="mx-5">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>

            <div className="mx-5">
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

export default EditGroup;
