import React from "react";
import { InfinitySpin } from "react-loader-spinner";
const Loader = () => {
  return (
    <>
      <div
        className="text-center"
        style={{
          textAlign: "center",
          marginTop: "10%",
          color: "#8500ffa3",
          zIndex: "99999",
          height: "2000px",
          
        }}
      >
        <InfinitySpin width="200" color="#0d6efd" />
      </div>
    </>
  );
};

export default Loader;
