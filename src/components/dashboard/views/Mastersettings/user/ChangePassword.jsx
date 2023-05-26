import Modal from "react-bootstrap/Modal";
import { usePasswordChangeMutation } from "../../../../../services/userApi";
import { toast } from "react-toastify";
import { useFormik } from "formik";

function ChangePassword({ show, handleClose }) {
  const [passwordChange,res] = usePasswordChangeMutation();

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      resetForm();

      try {
        const result = await passwordChange(values).unwrap();
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
    <>
      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header
          closeButton
          className=" text-white"
          style={{ backgroundColor: "#3f4d67" }}
        >
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="old_password">Old Password</label>
              <input
                type="password"
                className="form-control"
                id="old_password"
                name="old_password"
                onChange={formik.handleChange}
                value={formik.values.old_password}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="new_password">New Password</label>
              <input
                type="password"
                className="form-control"
                id="new_password"
                name="new_password"
                onChange={formik.handleChange}
                value={formik.values.new_password}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirm_password"
                name="confirm_password"
                onChange={formik.handleChange}
                value={formik.values.confirm_password}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ChangePassword;
