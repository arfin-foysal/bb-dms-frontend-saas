import Modal from "react-bootstrap/Modal";
import { usePasswordChangeMutation } from "../../../../../services/userApi";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
function ChangePassword({ show, handleClose }) {
  const [passwordChange, res] = usePasswordChangeMutation();

  const formik = useFormik({
    validationSchema: Yup.object({
      old_password: Yup.string().required("Required"),
      new_password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
        confirm_password: Yup.string()
        .oneOf([Yup.ref("new_password"), null], "Passwords must match")
        .required("Password confirmation is required"),
    }),
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
                id="old_password"
                name="old_password"
                onChange={formik.handleChange}
                value={formik.values.old_password}
                required
                onBlur={formik.handleBlur}
                className={
                  formik.errors.old_password && formik.touched.old_password
                    ? "form-control form-control-user is-invalid  shadow"
                    : "form-control form-control-user shadow"
                }
              />

              {formik.errors.old_password && formik.touched.old_password ? (
                <div className="invalid-feedback">
                  {formik.errors.old_password}
                </div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="new_password">New Password</label>
              <input
                type="password"
                id="new_password"
                name="new_password"
                onChange={formik.handleChange}
                value={formik.values.new_password}
                required
                onBlur={formik.handleBlur}
                className={
                  formik.errors.new_password && formik.touched.new_password
                    ? "form-control form-control-user is-invalid  shadow"
                    : "form-control form-control-user shadow"
                }
              />

              {formik.errors.new_password && formik.touched.new_password ? (
                <div className="invalid-feedback">
                  {formik.errors.new_password}
                </div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                onChange={formik.handleChange}
                value={formik.values.confirm_password}
                required
                onAbort={formik.handleReset}
                className={
                  formik.errors.confirm_password &&
                  formik.touched.confirm_password
                    ? "form-control form-control-user is-invalid  shadow"
                    : "form-control form-control-user shadow"
                }
              />

              {formik.errors.confirm_password &&
              formik.touched.confirm_password ? (
                <div className="invalid-feedback">
                  {formik.errors.confirm_password}
                </div>
              ) : null}
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
