import React from "react";
import { Link, useNavigate } from "react-router-dom";
import error from "../../../assets/images/error.png";
const Error = () => {
  const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}
  return (
    <>
      <div className="container-fluid">
        {/* <!-- 404 Error Text --> */}
        <div className="text-center">
          <img width="400px" src={error} alt="" />
        </div>

        <div className="text-center ">
          <button className="btn btn-info btn-sm" onClick={goBack}>&larr; Back to Dashboard</button>
        </div>
      </div>
    </>
  );
};

export default Error;
