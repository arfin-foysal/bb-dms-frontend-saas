import React from "react";
import { Dna } from "react-loader-spinner";
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
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
      
    </>
  );
};

export default Loader;
