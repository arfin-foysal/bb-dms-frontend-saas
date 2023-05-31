import { useFormik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Select from "react-select";
import preview from "../../../../../assets/images/image_preview.png";
import {
  useAllUserforGroupQuery,
  useSingalGroupQuery,
  useUpdateGroupMutation,
} from "../../../../../services/groupApi";

const EditGroup = ({ handleClose, param }) => {
  const [member, setMember] = useState([]);
  const { data, isFetching, isSuccess, isLoading } = useSingalGroupQuery(
    param?.group?.id
  );

  const allUserRse = useAllUserforGroupQuery();
  const [updateGroup, res] = useUpdateGroupMutation();

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
        formData.append("member", memberArr);
        console.log(memberArr);
      } else {
        data?.data?.user?.map((item) => {
          arr.push(item.id);
        });

        const memberArr = JSON.stringify(arr);
        formData.append("member", memberArr);
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
              {formik.errors.name ? (
                <div className="invalid-feedback">{formik.errors.name}</div>
              ) : null}
            </div>
          </div>

          <div className="form-group row col-12 my-1">
            <label className="col-12 col-form-label">Select User</label>

            {isLoading && <p>Loading...</p>}

            <div className="col-12">
              {isSuccess && (
                <Select
                  isMulti
                  className="basic-multi-select shadow"
                  placeholder="Select Member"
                  classNamePrefix="balance-setup"
                  onChange={(e) => setMember(e)}
                  getOptionValue={(option) => `${option["id"]}`}
                  getOptionLabel={(option) => `${option["username"]}`}
                  options={isSuccess && allUserRse?.data}
                  defaultValue={isSuccess && data?.data?.user}
                  isLoading={isFetching}
                  required
                />
              )}
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
              {formik.errors.description ? (
                <div className="invalid-feedback">
                  {formik.errors.description}
                </div>
              ) : null}
            </div>
          </div>

          <div className="form-group row col-12 my-1">
            <label className="col-12 col-form-label">Photo</label>
            <div className="col-12  ">
              <input
                className="form-control shadow"
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
                  ? preview
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
